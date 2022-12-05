/* eslint-disable */

import { AllTypesProps, ReturnTypes, Ops } from './const.js';


export const HOST="Specify host"


export const HEADERS = {}
export const apiSubscription = (options: chainOptions) => (query: string) => {
  try {
    const queryString = options[0] + '?query=' + encodeURIComponent(query);
    const wsString = queryString.replace('http', 'ws');
    const host = (options.length > 1 && options[1]?.websocket?.[0]) || wsString;
    const webSocketOptions = options[1]?.websocket || [host];
    const ws = new WebSocket(...webSocketOptions);
    return {
      ws,
      on: (e: (args: any) => void) => {
        ws.onmessage = (event: any) => {
          if (event.data) {
            const parsed = JSON.parse(event.data);
            const data = parsed.data;
            return e(data);
          }
        };
      },
      off: (e: (args: any) => void) => {
        ws.onclose = e;
      },
      error: (e: (args: any) => void) => {
        ws.onerror = e;
      },
      open: (e: () => void) => {
        ws.onopen = e;
      },
    };
  } catch {
    throw new Error('No websockets implemented');
  }
};
const handleFetchResponse = (response: Response): Promise<GraphQLResponse> => {
  if (!response.ok) {
    return new Promise((_, reject) => {
      response
        .text()
        .then((text) => {
          try {
            reject(JSON.parse(text));
          } catch (err) {
            reject(text);
          }
        })
        .catch(reject);
    });
  }
  return response.json();
};

export const apiFetch =
  (options: fetchOptions) =>
  (query: string, variables: Record<string, unknown> = {}) => {
    const fetchOptions = options[1] || {};
    if (fetchOptions.method && fetchOptions.method === 'GET') {
      return fetch(`${options[0]}?query=${encodeURIComponent(query)}`, fetchOptions)
        .then(handleFetchResponse)
        .then((response: GraphQLResponse) => {
          if (response.errors) {
            throw new GraphQLError(response);
          }
          return response.data;
        });
    }
    return fetch(`${options[0]}`, {
      body: JSON.stringify({ query, variables }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...fetchOptions,
    })
      .then(handleFetchResponse)
      .then((response: GraphQLResponse) => {
        if (response.errors) {
          throw new GraphQLError(response);
        }
        return response.data;
      });
  };

export const InternalsBuildQuery = ({
  ops,
  props,
  returns,
  options,
  scalars,
}: {
  props: AllTypesPropsType;
  returns: ReturnTypesType;
  ops: Operations;
  options?: OperationOptions;
  scalars?: ScalarDefinition;
}) => {
  const ibb = (
    k: string,
    o: InputValueType | VType,
    p = '',
    root = true,
    vars: Array<{ name: string; graphQLType: string }> = [],
  ): string => {
    const keyForPath = purifyGraphQLKey(k);
    const newPath = [p, keyForPath].join(SEPARATOR);
    if (!o) {
      return '';
    }
    if (typeof o === 'boolean' || typeof o === 'number') {
      return k;
    }
    if (typeof o === 'string') {
      return `${k} ${o}`;
    }
    if (Array.isArray(o)) {
      const args = InternalArgsBuilt({
        props,
        returns,
        ops,
        scalars,
        vars,
      })(o[0], newPath);
      return `${ibb(args ? `${k}(${args})` : k, o[1], p, false, vars)}`;
    }
    if (k === '__alias') {
      return Object.entries(o)
        .map(([alias, objectUnderAlias]) => {
          if (typeof objectUnderAlias !== 'object' || Array.isArray(objectUnderAlias)) {
            throw new Error(
              'Invalid alias it should be __alias:{ YOUR_ALIAS_NAME: { OPERATION_NAME: { ...selectors }}}',
            );
          }
          const operationName = Object.keys(objectUnderAlias)[0];
          const operation = objectUnderAlias[operationName];
          return ibb(`${alias}:${operationName}`, operation, p, false, vars);
        })
        .join('\n');
    }
    const hasOperationName = root && options?.operationName ? ' ' + options.operationName : '';
    const keyForDirectives = o.__directives ?? '';
    const query = `{${Object.entries(o)
      .filter(([k]) => k !== '__directives')
      .map((e) => ibb(...e, [p, `field<>${keyForPath}`].join(SEPARATOR), false, vars))
      .join('\n')}}`;
    if (!root) {
      return `${k} ${keyForDirectives}${hasOperationName} ${query}`;
    }
    const varsString = vars.map((v) => `${v.name}: ${v.graphQLType}`).join(', ');
    return `${k} ${keyForDirectives}${hasOperationName}${varsString ? `(${varsString})` : ''} ${query}`;
  };
  return ibb;
};

export const Thunder =
  (fn: FetchFunction) =>
  <O extends keyof typeof Ops, SCLR extends ScalarDefinition, R extends keyof ValueTypes = GenericOperation<O>>(
    operation: O,
    graphqlOptions?: ThunderGraphQLOptions<SCLR>,
  ) =>
  <Z extends ValueTypes[R]>(o: Z | ValueTypes[R], ops?: OperationOptions & { variables?: Record<string, unknown> }) =>
    fn(
      Zeus(operation, o, {
        operationOptions: ops,
        scalars: graphqlOptions?.scalars,
      }),
      ops?.variables,
    ).then((data) => {
      if (graphqlOptions?.scalars) {
        return decodeScalarsInResponse({
          response: data,
          initialOp: operation,
          initialZeusQuery: o as VType,
          returns: ReturnTypes,
          scalars: graphqlOptions.scalars,
          ops: Ops,
        });
      }
      return data;
    }) as Promise<InputType<GraphQLTypes[R], Z, SCLR>>;

export const Chain = (...options: chainOptions) => Thunder(apiFetch(options));

export const SubscriptionThunder =
  (fn: SubscriptionFunction) =>
  <O extends keyof typeof Ops, SCLR extends ScalarDefinition, R extends keyof ValueTypes = GenericOperation<O>>(
    operation: O,
    graphqlOptions?: ThunderGraphQLOptions<SCLR>,
  ) =>
  <Z extends ValueTypes[R]>(o: Z | ValueTypes[R], ops?: OperationOptions & { variables?: ExtractVariables<Z> }) => {
    const returnedFunction = fn(
      Zeus(operation, o, {
        operationOptions: ops,
        scalars: graphqlOptions?.scalars,
      }),
    ) as SubscriptionToGraphQL<Z, GraphQLTypes[R], SCLR>;
    if (returnedFunction?.on && graphqlOptions?.scalars) {
      const wrapped = returnedFunction.on;
      returnedFunction.on = (fnToCall: (args: InputType<GraphQLTypes[R], Z, SCLR>) => void) =>
        wrapped((data: InputType<GraphQLTypes[R], Z, SCLR>) => {
          if (graphqlOptions?.scalars) {
            return fnToCall(
              decodeScalarsInResponse({
                response: data,
                initialOp: operation,
                initialZeusQuery: o as VType,
                returns: ReturnTypes,
                scalars: graphqlOptions.scalars,
                ops: Ops,
              }),
            );
          }
          return fnToCall(data);
        });
    }
    return returnedFunction;
  };

export const Subscription = (...options: chainOptions) => SubscriptionThunder(apiSubscription(options));
export const Zeus = <
  Z extends ValueTypes[R],
  O extends keyof typeof Ops,
  R extends keyof ValueTypes = GenericOperation<O>,
>(
  operation: O,
  o: Z | ValueTypes[R],
  ops?: {
    operationOptions?: OperationOptions;
    scalars?: ScalarDefinition;
  },
) =>
  InternalsBuildQuery({
    props: AllTypesProps,
    returns: ReturnTypes,
    ops: Ops,
    options: ops?.operationOptions,
    scalars: ops?.scalars,
  })(operation, o as VType);

export const ZeusSelect = <T>() => ((t: unknown) => t) as SelectionFunction<T>;

export const Selector = <T extends keyof ValueTypes>(key: T) => key && ZeusSelect<ValueTypes[T]>();

export const TypeFromSelector = <T extends keyof ValueTypes>(key: T) => key && ZeusSelect<ValueTypes[T]>();
export const Gql = Chain(HOST, {
  headers: {
    'Content-Type': 'application/json',
    ...HEADERS,
  },
});

export const ZeusScalars = ZeusSelect<ScalarCoders>();

export const decodeScalarsInResponse = <O extends Operations>({
  response,
  scalars,
  returns,
  ops,
  initialZeusQuery,
  initialOp,
}: {
  ops: O;
  response: any;
  returns: ReturnTypesType;
  scalars?: Record<string, ScalarResolver | undefined>;
  initialOp: keyof O;
  initialZeusQuery: InputValueType | VType;
}) => {
  if (!scalars) {
    return response;
  }
  const builder = PrepareScalarPaths({
    ops,
    returns,
  });

  const scalarPaths = builder(initialOp as string, ops[initialOp], initialZeusQuery);
  if (scalarPaths) {
    const r = traverseResponse({ scalarPaths, resolvers: scalars })(initialOp as string, response, [ops[initialOp]]);
    return r;
  }
  return response;
};

export const traverseResponse = ({
  resolvers,
  scalarPaths,
}: {
  scalarPaths: { [x: string]: `scalar.${string}` };
  resolvers: {
    [x: string]: ScalarResolver | undefined;
  };
}) => {
  const ibb = (k: string, o: InputValueType | VType, p: string[] = []): unknown => {
    if (Array.isArray(o)) {
      return o.map((eachO) => ibb(k, eachO, p));
    }
    if (o == null) {
      return o;
    }
    const scalarPathString = p.join(SEPARATOR);
    const currentScalarString = scalarPaths[scalarPathString];
    if (currentScalarString) {
      const currentDecoder = resolvers[currentScalarString.split('.')[1]]?.decode;
      if (currentDecoder) {
        return currentDecoder(o);
      }
    }
    if (typeof o === 'boolean' || typeof o === 'number' || typeof o === 'string' || !o) {
      return o;
    }
    return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, ibb(k, v, [...p, purifyGraphQLKey(k)])]));
  };
  return ibb;
};

export type AllTypesPropsType = {
  [x: string]:
    | undefined
    | `scalar.${string}`
    | 'enum'
    | {
        [x: string]:
          | undefined
          | string
          | {
              [x: string]: string | undefined;
            };
      };
};

export type ReturnTypesType = {
  [x: string]:
    | {
        [x: string]: string | undefined;
      }
    | `scalar.${string}`
    | undefined;
};
export type InputValueType = {
  [x: string]: undefined | boolean | string | number | [any, undefined | boolean | InputValueType] | InputValueType;
};
export type VType =
  | undefined
  | boolean
  | string
  | number
  | [any, undefined | boolean | InputValueType]
  | InputValueType;

export type PlainType = boolean | number | string | null | undefined;
export type ZeusArgsType =
  | PlainType
  | {
      [x: string]: ZeusArgsType;
    }
  | Array<ZeusArgsType>;

export type Operations = Record<string, string>;

export type VariableDefinition = {
  [x: string]: unknown;
};

export const SEPARATOR = '|';

export type fetchOptions = Parameters<typeof fetch>;
type websocketOptions = typeof WebSocket extends new (...args: infer R) => WebSocket ? R : never;
export type chainOptions = [fetchOptions[0], fetchOptions[1] & { websocket?: websocketOptions }] | [fetchOptions[0]];
export type FetchFunction = (query: string, variables?: Record<string, unknown>) => Promise<any>;
export type SubscriptionFunction = (query: string) => any;
type NotUndefined<T> = T extends undefined ? never : T;
export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;

export type OperationOptions = {
  operationName?: string;
};

export type ScalarCoder = Record<string, (s: unknown) => string>;

export interface GraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{
    message: string;
  }>;
}
export class GraphQLError extends Error {
  constructor(public response: GraphQLResponse) {
    super('');
    console.error(response);
  }
  toString() {
    return 'GraphQL Response Error';
  }
}
export type GenericOperation<O> = O extends keyof typeof Ops ? typeof Ops[O] : never;
export type ThunderGraphQLOptions<SCLR extends ScalarDefinition> = {
  scalars?: SCLR | ScalarCoders;
};

const ExtractScalar = (mappedParts: string[], returns: ReturnTypesType): `scalar.${string}` | undefined => {
  if (mappedParts.length === 0) {
    return;
  }
  const oKey = mappedParts[0];
  const returnP1 = returns[oKey];
  if (typeof returnP1 === 'object') {
    const returnP2 = returnP1[mappedParts[1]];
    if (returnP2) {
      return ExtractScalar([returnP2, ...mappedParts.slice(2)], returns);
    }
    return undefined;
  }
  return returnP1 as `scalar.${string}` | undefined;
};

export const PrepareScalarPaths = ({ ops, returns }: { returns: ReturnTypesType; ops: Operations }) => {
  const ibb = (
    k: string,
    originalKey: string,
    o: InputValueType | VType,
    p: string[] = [],
    pOriginals: string[] = [],
    root = true,
  ): { [x: string]: `scalar.${string}` } | undefined => {
    if (!o) {
      return;
    }
    if (typeof o === 'boolean' || typeof o === 'number' || typeof o === 'string') {
      const extractionArray = [...pOriginals, originalKey];
      const isScalar = ExtractScalar(extractionArray, returns);
      if (isScalar?.startsWith('scalar')) {
        const partOfTree = {
          [[...p, k].join(SEPARATOR)]: isScalar,
        };
        return partOfTree;
      }
      return {};
    }
    if (Array.isArray(o)) {
      return ibb(k, k, o[1], p, pOriginals, false);
    }
    if (k === '__alias') {
      return Object.entries(o)
        .map(([alias, objectUnderAlias]) => {
          if (typeof objectUnderAlias !== 'object' || Array.isArray(objectUnderAlias)) {
            throw new Error(
              'Invalid alias it should be __alias:{ YOUR_ALIAS_NAME: { OPERATION_NAME: { ...selectors }}}',
            );
          }
          const operationName = Object.keys(objectUnderAlias)[0];
          const operation = objectUnderAlias[operationName];
          return ibb(alias, operationName, operation, p, pOriginals, false);
        })
        .reduce((a, b) => ({
          ...a,
          ...b,
        }));
    }
    const keyName = root ? ops[k] : k;
    return Object.entries(o)
      .filter(([k]) => k !== '__directives')
      .map(([k, v]) => {
        // Inline fragments shouldn't be added to the path as they aren't a field
        const isInlineFragment = originalKey.match(/^...\s*on/) != null;
        return ibb(
          k,
          k,
          v,
          isInlineFragment ? p : [...p, purifyGraphQLKey(keyName || k)],
          isInlineFragment ? pOriginals : [...pOriginals, purifyGraphQLKey(originalKey)],
          false,
        );
      })
      .reduce((a, b) => ({
        ...a,
        ...b,
      }));
  };
  return ibb;
};

export const purifyGraphQLKey = (k: string) => k.replace(/\([^)]*\)/g, '').replace(/^[^:]*\:/g, '');

const mapPart = (p: string) => {
  const [isArg, isField] = p.split('<>');
  if (isField) {
    return {
      v: isField,
      __type: 'field',
    } as const;
  }
  return {
    v: isArg,
    __type: 'arg',
  } as const;
};

type Part = ReturnType<typeof mapPart>;

export const ResolveFromPath = (props: AllTypesPropsType, returns: ReturnTypesType, ops: Operations) => {
  const ResolvePropsType = (mappedParts: Part[]) => {
    const oKey = ops[mappedParts[0].v];
    const propsP1 = oKey ? props[oKey] : props[mappedParts[0].v];
    if (propsP1 === 'enum' && mappedParts.length === 1) {
      return 'enum';
    }
    if (typeof propsP1 === 'string' && propsP1.startsWith('scalar.') && mappedParts.length === 1) {
      return propsP1;
    }
    if (typeof propsP1 === 'object') {
      if (mappedParts.length < 2) {
        return 'not';
      }
      const propsP2 = propsP1[mappedParts[1].v];
      if (typeof propsP2 === 'string') {
        return rpp(
          `${propsP2}${SEPARATOR}${mappedParts
            .slice(2)
            .map((mp) => mp.v)
            .join(SEPARATOR)}`,
        );
      }
      if (typeof propsP2 === 'object') {
        if (mappedParts.length < 3) {
          return 'not';
        }
        const propsP3 = propsP2[mappedParts[2].v];
        if (propsP3 && mappedParts[2].__type === 'arg') {
          return rpp(
            `${propsP3}${SEPARATOR}${mappedParts
              .slice(3)
              .map((mp) => mp.v)
              .join(SEPARATOR)}`,
          );
        }
      }
    }
  };
  const ResolveReturnType = (mappedParts: Part[]) => {
    if (mappedParts.length === 0) {
      return 'not';
    }
    const oKey = ops[mappedParts[0].v];
    const returnP1 = oKey ? returns[oKey] : returns[mappedParts[0].v];
    if (typeof returnP1 === 'object') {
      if (mappedParts.length < 2) return 'not';
      const returnP2 = returnP1[mappedParts[1].v];
      if (returnP2) {
        return rpp(
          `${returnP2}${SEPARATOR}${mappedParts
            .slice(2)
            .map((mp) => mp.v)
            .join(SEPARATOR)}`,
        );
      }
    }
  };
  const rpp = (path: string): 'enum' | 'not' | `scalar.${string}` => {
    const parts = path.split(SEPARATOR).filter((l) => l.length > 0);
    const mappedParts = parts.map(mapPart);
    const propsP1 = ResolvePropsType(mappedParts);
    if (propsP1) {
      return propsP1;
    }
    const returnP1 = ResolveReturnType(mappedParts);
    if (returnP1) {
      return returnP1;
    }
    return 'not';
  };
  return rpp;
};

export const InternalArgsBuilt = ({
  props,
  ops,
  returns,
  scalars,
  vars,
}: {
  props: AllTypesPropsType;
  returns: ReturnTypesType;
  ops: Operations;
  scalars?: ScalarDefinition;
  vars: Array<{ name: string; graphQLType: string }>;
}) => {
  const arb = (a: ZeusArgsType, p = '', root = true): string => {
    if (typeof a === 'string') {
      if (a.startsWith(START_VAR_NAME)) {
        const [varName, graphQLType] = a.replace(START_VAR_NAME, '$').split(GRAPHQL_TYPE_SEPARATOR);
        const v = vars.find((v) => v.name === varName);
        if (!v) {
          vars.push({
            name: varName,
            graphQLType,
          });
        } else {
          if (v.graphQLType !== graphQLType) {
            throw new Error(
              `Invalid variable exists with two different GraphQL Types, "${v.graphQLType}" and ${graphQLType}`,
            );
          }
        }
        return varName;
      }
    }
    const checkType = ResolveFromPath(props, returns, ops)(p);
    if (checkType.startsWith('scalar.')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...splittedScalar] = checkType.split('.');
      const scalarKey = splittedScalar.join('.');
      return (scalars?.[scalarKey]?.encode?.(a) as string) || JSON.stringify(a);
    }
    if (Array.isArray(a)) {
      return `[${a.map((arr) => arb(arr, p, false)).join(', ')}]`;
    }
    if (typeof a === 'string') {
      if (checkType === 'enum') {
        return a;
      }
      return `${JSON.stringify(a)}`;
    }
    if (typeof a === 'object') {
      if (a === null) {
        return `null`;
      }
      const returnedObjectString = Object.entries(a)
        .filter(([, v]) => typeof v !== 'undefined')
        .map(([k, v]) => `${k}: ${arb(v, [p, k].join(SEPARATOR), false)}`)
        .join(',\n');
      if (!root) {
        return `{${returnedObjectString}}`;
      }
      return returnedObjectString;
    }
    return `${a}`;
  };
  return arb;
};

export const resolverFor = <X, T extends keyof ResolverInputTypes, Z extends keyof ResolverInputTypes[T]>(
  type: T,
  field: Z,
  fn: (
    args: Required<ResolverInputTypes[T]>[Z] extends [infer Input, any] ? Input : any,
    source: any,
  ) => Z extends keyof ModelTypes[T] ? ModelTypes[T][Z] | Promise<ModelTypes[T][Z]> | X : any,
) => fn as (args?: any, source?: any) => any;

export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
export type ZeusState<T extends (...args: any[]) => Promise<any>> = NonNullable<UnwrapPromise<ReturnType<T>>>;
export type ZeusHook<
  T extends (...args: any[]) => Record<string, (...args: any[]) => Promise<any>>,
  N extends keyof ReturnType<T>,
> = ZeusState<ReturnType<T>[N]>;

export type WithTypeNameValue<T> = T & {
  __typename?: boolean;
  __directives?: string;
};
export type AliasType<T> = WithTypeNameValue<T> & {
  __alias?: Record<string, WithTypeNameValue<T>>;
};
type DeepAnify<T> = {
  [P in keyof T]?: any;
};
type IsPayLoad<T> = T extends [any, infer PayLoad] ? PayLoad : T;
export type ScalarDefinition = Record<string, ScalarResolver>;

type IsScalar<S, SCLR extends ScalarDefinition> = S extends 'scalar' & { name: infer T }
  ? T extends keyof SCLR
    ? SCLR[T]['decode'] extends (s: unknown) => unknown
      ? ReturnType<SCLR[T]['decode']>
      : unknown
    : unknown
  : S;
type IsArray<T, U, SCLR extends ScalarDefinition> = T extends Array<infer R>
  ? InputType<R, U, SCLR>[]
  : InputType<T, U, SCLR>;
type FlattenArray<T> = T extends Array<infer R> ? R : T;
type BaseZeusResolver = boolean | 1 | string | Variable<any, string>;

type IsInterfaced<SRC extends DeepAnify<DST>, DST, SCLR extends ScalarDefinition> = FlattenArray<SRC> extends
  | ZEUS_INTERFACES
  | ZEUS_UNIONS
  ? {
      [P in keyof SRC]: SRC[P] extends '__union' & infer R
        ? P extends keyof DST
          ? IsArray<R, '__typename' extends keyof DST ? DST[P] & { __typename: true } : DST[P], SCLR>
          : Record<string, unknown>
        : never;
    }[keyof DST] & {
      [P in keyof Omit<
        Pick<
          SRC,
          {
            [P in keyof DST]: SRC[P] extends '__union' & infer R ? never : P;
          }[keyof DST]
        >,
        '__typename'
      >]: IsPayLoad<DST[P]> extends BaseZeusResolver ? IsScalar<SRC[P], SCLR> : IsArray<SRC[P], DST[P], SCLR>;
    }
  : {
      [P in keyof Pick<SRC, keyof DST>]: IsPayLoad<DST[P]> extends BaseZeusResolver
        ? IsScalar<SRC[P], SCLR>
        : IsArray<SRC[P], DST[P], SCLR>;
    };

export type MapType<SRC, DST, SCLR extends ScalarDefinition> = SRC extends DeepAnify<DST>
  ? IsInterfaced<SRC, DST, SCLR>
  : never;
// eslint-disable-next-line @typescript-eslint/ban-types
export type InputType<SRC, DST, SCLR extends ScalarDefinition = {}> = IsPayLoad<DST> extends { __alias: infer R }
  ? {
      [P in keyof R]: MapType<SRC, R[P], SCLR>[keyof MapType<SRC, R[P], SCLR>];
    } & MapType<SRC, Omit<IsPayLoad<DST>, '__alias'>, SCLR>
  : MapType<SRC, IsPayLoad<DST>, SCLR>;
export type SubscriptionToGraphQL<Z, T, SCLR extends ScalarDefinition> = {
  ws: WebSocket;
  on: (fn: (args: InputType<T, Z, SCLR>) => void) => void;
  off: (fn: (e: { data?: InputType<T, Z, SCLR>; code?: number; reason?: string; message?: string }) => void) => void;
  error: (fn: (e: { data?: InputType<T, Z, SCLR>; errors?: string[] }) => void) => void;
  open: () => void;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type FromSelector<SELECTOR, NAME extends keyof GraphQLTypes, SCLR extends ScalarDefinition = {}> = InputType<
  GraphQLTypes[NAME],
  SELECTOR,
  SCLR
>;

export type ScalarResolver = {
  encode?: (s: unknown) => string;
  decode?: (s: unknown) => unknown;
};

export type SelectionFunction<V> = <T>(t: T | V) => T;

type BuiltInVariableTypes = {
  ['String']: string;
  ['Int']: number;
  ['Float']: number;
  ['ID']: unknown;
  ['Boolean']: boolean;
};
type AllVariableTypes = keyof BuiltInVariableTypes | keyof ZEUS_VARIABLES;
type VariableRequired<T extends string> = `${T}!` | T | `[${T}]` | `[${T}]!` | `[${T}!]` | `[${T}!]!`;
type VR<T extends string> = VariableRequired<VariableRequired<T>>;

export type GraphQLVariableType = VR<AllVariableTypes>;

type ExtractVariableTypeString<T extends string> = T extends VR<infer R1>
  ? R1 extends VR<infer R2>
    ? R2 extends VR<infer R3>
      ? R3 extends VR<infer R4>
        ? R4 extends VR<infer R5>
          ? R5
          : R4
        : R3
      : R2
    : R1
  : T;

type DecomposeType<T, Type> = T extends `[${infer R}]`
  ? Array<DecomposeType<R, Type>> | undefined
  : T extends `${infer R}!`
  ? NonNullable<DecomposeType<R, Type>>
  : Type | undefined;

type ExtractTypeFromGraphQLType<T extends string> = T extends keyof ZEUS_VARIABLES
  ? ZEUS_VARIABLES[T]
  : T extends keyof BuiltInVariableTypes
  ? BuiltInVariableTypes[T]
  : any;

export type GetVariableType<T extends string> = DecomposeType<
  T,
  ExtractTypeFromGraphQLType<ExtractVariableTypeString<T>>
>;

type UndefinedKeys<T> = {
  [K in keyof T]-?: T[K] extends NonNullable<T[K]> ? never : K;
}[keyof T];

type WithNullableKeys<T> = Pick<T, UndefinedKeys<T>>;
type WithNonNullableKeys<T> = Omit<T, UndefinedKeys<T>>;

type OptionalKeys<T> = {
  [P in keyof T]?: T[P];
};

export type WithOptionalNullables<T> = OptionalKeys<WithNullableKeys<T>> & WithNonNullableKeys<T>;

export type Variable<T extends GraphQLVariableType, Name extends string> = {
  ' __zeus_name': Name;
  ' __zeus_type': T;
};

export type ExtractVariables<Query> = Query extends Variable<infer VType, infer VName>
  ? { [key in VName]: GetVariableType<VType> }
  : Query extends [infer Inputs, infer Outputs]
  ? ExtractVariables<Inputs> & ExtractVariables<Outputs>
  : Query extends string | number | boolean
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  : UnionToIntersection<{ [K in keyof Query]: WithOptionalNullables<ExtractVariables<Query[K]>> }[keyof Query]>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export const START_VAR_NAME = `$ZEUS_VAR`;
export const GRAPHQL_TYPE_SEPARATOR = `__$GRAPHQL__`;

export const $ = <Type extends GraphQLVariableType, Name extends string>(name: Name, graphqlType: Type) => {
  return (START_VAR_NAME + name + GRAPHQL_TYPE_SEPARATOR + graphqlType) as unknown as Variable<Type, Name>;
};
type ZEUS_INTERFACES = GraphQLTypes["UserBaseError"]
export type ScalarCoders = {
	DateTime?: ScalarResolver;
	UUID?: ScalarResolver;
	UuidSurrealdb?: ScalarResolver;
}
type ZEUS_UNIONS = GraphQLTypes["PostsConnectionResult"] | GraphQLTypes["SessionResult"] | GraphQLTypes["UserCreateResult"] | GraphQLTypes["UserGetResult"] | GraphQLTypes["UserSignInResult"] | GraphQLTypes["UserSignOutResult"]

export type ValueTypes = {
    ["AccountOauth"]: AliasType<{
	/** unique identifier for the oauth provider. Don't use name of user because that could be changed */
	id?:boolean | `@${string}`,
	displayName?:boolean | `@${string}`,
	email?:boolean | `@${string}`,
	emailVerified?:boolean | `@${string}`,
	provider?:boolean | `@${string}`,
	providerAccountId?:boolean | `@${string}`,
	accessToken?:boolean | `@${string}`,
	refreshToken?:boolean | `@${string}`,
	/** access token expiration timestamp, represented as the number of seconds since the epoch (January 1, 1970 00:00:00 UTC). */
	expiresAt?:boolean | `@${string}`,
	tokenType?:boolean | `@${string}`,
	scopes?:boolean | `@${string}`,
	idToken?:boolean | `@${string}`,
	oauthToken?:boolean | `@${string}`,
	oauthTokenSecret?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["Address"]: {
	street: string | Variable<any, string>,
	houseNumber: string | Variable<any, string>,
	city: string | Variable<any, string>,
	zip: string | Variable<any, string>
};
	/** Implement the DateTime<Utc> scalar

The input/output is a string in RFC3339 format. */
["DateTime"]:unknown;
	["Mutation"]: AliasType<{
createUser?: [{	userInput: ValueTypes["UserInput"] | Variable<any, string>},ValueTypes["User"]],
signIn?: [{	signInCredentials: ValueTypes["SignInCredentials"] | Variable<any, string>},ValueTypes["UserSignInResult"]],
	signOut?:ValueTypes["UserSignOutResult"],
signUp?: [{	user: ValueTypes["UserInput"] | Variable<any, string>},ValueTypes["UserCreateResult"]],
createPost?: [{	post: ValueTypes["PostInput"] | Variable<any, string>},ValueTypes["Post"]],
		__typename?: boolean | `@${string}`
}>;
	["OauthProvider"]:OauthProvider;
	/** Information about pagination in a connection */
["PageInfo"]: AliasType<{
	/** When paginating backwards, are there more items? */
	hasPreviousPage?:boolean | `@${string}`,
	/** When paginating forwards, are there more items? */
	hasNextPage?:boolean | `@${string}`,
	/** When paginating backwards, the cursor to continue. */
	startCursor?:boolean | `@${string}`,
	/** When paginating forwards, the cursor to continue. */
	endCursor?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["Post"]: AliasType<{
	id?:boolean | `@${string}`,
	posterId?:boolean | `@${string}`,
	title?:boolean | `@${string}`,
	content?:boolean | `@${string}`,
	poster?:ValueTypes["User"],
		__typename?: boolean | `@${string}`
}>;
	["PostConnection"]: AliasType<{
	/** Information to aid in pagination. */
	pageInfo?:ValueTypes["PageInfo"],
	/** A list of edges. */
	edges?:ValueTypes["PostEdge"],
	/** A list of nodes. */
	nodes?:ValueTypes["Post"],
		__typename?: boolean | `@${string}`
}>;
	/** An edge in a connection. */
["PostEdge"]: AliasType<{
	/** A cursor for use in pagination */
	cursor?:boolean | `@${string}`,
	/** The item at the end of the edge */
	node?:ValueTypes["Post"],
	lowo?:boolean | `@${string}`,
	happy?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["PostInput"]: {
	title: string | Variable<any, string>,
	content: string | Variable<any, string>
};
	["PostsConnectionResult"]: AliasType<{		["...on PostConnection"] : ValueTypes["PostConnection"],
		["...on UserNotFoundError"] : ValueTypes["UserNotFoundError"]
		__typename?: boolean | `@${string}`
}>;
	["Query"]: AliasType<{
	me?:ValueTypes["UserGetResult"],
user?: [{	id: ValueTypes["UUID"] | Variable<any, string>},ValueTypes["UserGetResult"]],
getUser?: [{	userBy: ValueTypes["UserBy"] | Variable<any, string>},ValueTypes["UserGetResult"]],
	users?:ValueTypes["User"],
	session?:ValueTypes["SessionResult"],
post?: [{	id: ValueTypes["UUID"] | Variable<any, string>},ValueTypes["Post"]],
	posts?:ValueTypes["Post"],
		__typename?: boolean | `@${string}`
}>;
	["Role"]:Role;
	["ServerError"]: AliasType<{
	message?:boolean | `@${string}`,
	solution?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["Session"]: AliasType<{
	userId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["SessionResult"]: AliasType<{		["...on Session"] : ValueTypes["Session"],
		["...on UserSessionExpiredError"] : ValueTypes["UserSessionExpiredError"],
		["...on ServerError"] : ValueTypes["ServerError"]
		__typename?: boolean | `@${string}`
}>;
	["SignInCredentials"]: {
	username: string | Variable<any, string>,
	password: string | Variable<any, string>
};
	["SignOutMessage"]: AliasType<{
	message?:boolean | `@${string}`,
	userId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["Subscription"]: AliasType<{
	values?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["TokenType"]:TokenType;
	/** A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as
Strings within GraphQL. UUIDs are used to assign unique identifiers to
entities without requiring a central allocating authority.

# References

* [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
* [RFC4122: A Universally Unique IDentifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122) */
["UUID"]:unknown;
	["User"]: AliasType<{
	id?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	username?:boolean | `@${string}`,
	firstName?:boolean | `@${string}`,
	lastName?:boolean | `@${string}`,
	city?:boolean | `@${string}`,
	email?:boolean | `@${string}`,
	emailVerified?:boolean | `@${string}`,
	age?:boolean | `@${string}`,
	socialMedia?:boolean | `@${string}`,
	roles?:boolean | `@${string}`,
	accounts?:ValueTypes["AccountOauth"],
postsConnection2?: [{	after?: string | undefined | null | Variable<any, string>,	before?: string | undefined | null | Variable<any, string>,	first?: number | undefined | null | Variable<any, string>,	last?: number | undefined | null | Variable<any, string>},ValueTypes["PostsConnectionResult"]],
postsConnection?: [{	after?: string | undefined | null | Variable<any, string>,	before?: string | undefined | null | Variable<any, string>,	first?: number | undefined | null | Variable<any, string>,	last?: number | undefined | null | Variable<any, string>},ValueTypes["PostConnection"]],
	postCount?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserBaseError"]:AliasType<{
		message?:boolean | `@${string}`,
	solution?:boolean | `@${string}`;
		['...on ServerError']?: Omit<ValueTypes["ServerError"],keyof ValueTypes["UserBaseError"]>;
		['...on UserGenericError']?: Omit<ValueTypes["UserGenericError"],keyof ValueTypes["UserBaseError"]>;
		['...on UserHaveNoAccessError']?: Omit<ValueTypes["UserHaveNoAccessError"],keyof ValueTypes["UserBaseError"]>;
		['...on UserNotFoundError']?: Omit<ValueTypes["UserNotFoundError"],keyof ValueTypes["UserBaseError"]>;
		['...on UserSessionExpiredError']?: Omit<ValueTypes["UserSessionExpiredError"],keyof ValueTypes["UserBaseError"]>;
		__typename?: boolean | `@${string}`
}>;
	["UserBy"]: {
	userId?: ValueTypes["UUID"] | undefined | null | Variable<any, string>,
	username?: string | undefined | null | Variable<any, string>,
	address?: ValueTypes["Address"] | undefined | null | Variable<any, string>,
	email?: string | undefined | null | Variable<any, string>
};
	["UserCreateResult"]: AliasType<{		["...on User"] : ValueTypes["User"],
		["...on UserRegisterInvalidInputError"] : ValueTypes["UserRegisterInvalidInputError"],
		["...on UserNotFoundError"] : ValueTypes["UserNotFoundError"],
		["...on ServerError"] : ValueTypes["ServerError"]
		__typename?: boolean | `@${string}`
}>;
	["UserGenericError"]: AliasType<{
	message?:boolean | `@${string}`,
	solution?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserGetResult"]: AliasType<{		["...on User"] : ValueTypes["User"],
		["...on UserNotFoundError"] : ValueTypes["UserNotFoundError"],
		["...on ServerError"] : ValueTypes["ServerError"],
		["...on UserSessionExpiredError"] : ValueTypes["UserSessionExpiredError"]
		__typename?: boolean | `@${string}`
}>;
	["UserHaveNoAccessError"]: AliasType<{
	message?:boolean | `@${string}`,
	solution?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserInput"]: {
	username: string | Variable<any, string>,
	password?: string | undefined | null | Variable<any, string>,
	firstName?: string | undefined | null | Variable<any, string>,
	lastName?: string | undefined | null | Variable<any, string>,
	city?: string | undefined | null | Variable<any, string>,
	email?: string | undefined | null | Variable<any, string>,
	age?: number | undefined | null | Variable<any, string>,
	socialMedia: Array<string> | Variable<any, string>
};
	["UserNotFoundError"]: AliasType<{
	message?:boolean | `@${string}`,
	solution?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserRegisterInvalidInputError"]: AliasType<{
	usernameErrorMessage?:boolean | `@${string}`,
	emailErrorMessage?:boolean | `@${string}`,
	dateOfBirthErrorMessage?:boolean | `@${string}`,
	passwordErrorMessage?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserSessionExpiredError"]: AliasType<{
	message?:boolean | `@${string}`,
	solution?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserSignInInvalidInputError"]: AliasType<{
	usernameErrorMessage?:boolean | `@${string}`,
	loginErrorMessage?:boolean | `@${string}`,
	emailErrorMessage?:boolean | `@${string}`,
	passwordErrorMessage?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserSignInResult"]: AliasType<{		["...on User"] : ValueTypes["User"],
		["...on UserSignInInvalidInputError"] : ValueTypes["UserSignInInvalidInputError"],
		["...on UserNotFoundError"] : ValueTypes["UserNotFoundError"],
		["...on ServerError"] : ValueTypes["ServerError"]
		__typename?: boolean | `@${string}`
}>;
	["UserSignOutResult"]: AliasType<{		["...on SignOutMessage"] : ValueTypes["SignOutMessage"],
		["...on UserSessionExpiredError"] : ValueTypes["UserSessionExpiredError"],
		["...on ServerError"] : ValueTypes["ServerError"]
		__typename?: boolean | `@${string}`
}>;
	/** A UUID type provided by the SurrealDB database */
["UuidSurrealdb"]:unknown
  }

export type ResolverInputTypes = {
    ["AccountOauth"]: AliasType<{
	/** unique identifier for the oauth provider. Don't use name of user because that could be changed */
	id?:boolean | `@${string}`,
	displayName?:boolean | `@${string}`,
	email?:boolean | `@${string}`,
	emailVerified?:boolean | `@${string}`,
	provider?:boolean | `@${string}`,
	providerAccountId?:boolean | `@${string}`,
	accessToken?:boolean | `@${string}`,
	refreshToken?:boolean | `@${string}`,
	/** access token expiration timestamp, represented as the number of seconds since the epoch (January 1, 1970 00:00:00 UTC). */
	expiresAt?:boolean | `@${string}`,
	tokenType?:boolean | `@${string}`,
	scopes?:boolean | `@${string}`,
	idToken?:boolean | `@${string}`,
	oauthToken?:boolean | `@${string}`,
	oauthTokenSecret?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["Address"]: {
	street: string,
	houseNumber: string,
	city: string,
	zip: string
};
	/** Implement the DateTime<Utc> scalar

The input/output is a string in RFC3339 format. */
["DateTime"]:unknown;
	["Mutation"]: AliasType<{
createUser?: [{	userInput: ResolverInputTypes["UserInput"]},ResolverInputTypes["User"]],
signIn?: [{	signInCredentials: ResolverInputTypes["SignInCredentials"]},ResolverInputTypes["UserSignInResult"]],
	signOut?:ResolverInputTypes["UserSignOutResult"],
signUp?: [{	user: ResolverInputTypes["UserInput"]},ResolverInputTypes["UserCreateResult"]],
createPost?: [{	post: ResolverInputTypes["PostInput"]},ResolverInputTypes["Post"]],
		__typename?: boolean | `@${string}`
}>;
	["OauthProvider"]:OauthProvider;
	/** Information about pagination in a connection */
["PageInfo"]: AliasType<{
	/** When paginating backwards, are there more items? */
	hasPreviousPage?:boolean | `@${string}`,
	/** When paginating forwards, are there more items? */
	hasNextPage?:boolean | `@${string}`,
	/** When paginating backwards, the cursor to continue. */
	startCursor?:boolean | `@${string}`,
	/** When paginating forwards, the cursor to continue. */
	endCursor?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["Post"]: AliasType<{
	id?:boolean | `@${string}`,
	posterId?:boolean | `@${string}`,
	title?:boolean | `@${string}`,
	content?:boolean | `@${string}`,
	poster?:ResolverInputTypes["User"],
		__typename?: boolean | `@${string}`
}>;
	["PostConnection"]: AliasType<{
	/** Information to aid in pagination. */
	pageInfo?:ResolverInputTypes["PageInfo"],
	/** A list of edges. */
	edges?:ResolverInputTypes["PostEdge"],
	/** A list of nodes. */
	nodes?:ResolverInputTypes["Post"],
		__typename?: boolean | `@${string}`
}>;
	/** An edge in a connection. */
["PostEdge"]: AliasType<{
	/** A cursor for use in pagination */
	cursor?:boolean | `@${string}`,
	/** The item at the end of the edge */
	node?:ResolverInputTypes["Post"],
	lowo?:boolean | `@${string}`,
	happy?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["PostInput"]: {
	title: string,
	content: string
};
	["PostsConnectionResult"]: AliasType<{
	PostConnection?:ResolverInputTypes["PostConnection"],
	UserNotFoundError?:ResolverInputTypes["UserNotFoundError"],
		__typename?: boolean | `@${string}`
}>;
	["Query"]: AliasType<{
	me?:ResolverInputTypes["UserGetResult"],
user?: [{	id: ResolverInputTypes["UUID"]},ResolverInputTypes["UserGetResult"]],
getUser?: [{	userBy: ResolverInputTypes["UserBy"]},ResolverInputTypes["UserGetResult"]],
	users?:ResolverInputTypes["User"],
	session?:ResolverInputTypes["SessionResult"],
post?: [{	id: ResolverInputTypes["UUID"]},ResolverInputTypes["Post"]],
	posts?:ResolverInputTypes["Post"],
		__typename?: boolean | `@${string}`
}>;
	["Role"]:Role;
	["ServerError"]: AliasType<{
	message?:boolean | `@${string}`,
	solution?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["Session"]: AliasType<{
	userId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["SessionResult"]: AliasType<{
	Session?:ResolverInputTypes["Session"],
	UserSessionExpiredError?:ResolverInputTypes["UserSessionExpiredError"],
	ServerError?:ResolverInputTypes["ServerError"],
		__typename?: boolean | `@${string}`
}>;
	["SignInCredentials"]: {
	username: string,
	password: string
};
	["SignOutMessage"]: AliasType<{
	message?:boolean | `@${string}`,
	userId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["Subscription"]: AliasType<{
	values?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["TokenType"]:TokenType;
	/** A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as
Strings within GraphQL. UUIDs are used to assign unique identifiers to
entities without requiring a central allocating authority.

# References

* [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
* [RFC4122: A Universally Unique IDentifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122) */
["UUID"]:unknown;
	["User"]: AliasType<{
	id?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	username?:boolean | `@${string}`,
	firstName?:boolean | `@${string}`,
	lastName?:boolean | `@${string}`,
	city?:boolean | `@${string}`,
	email?:boolean | `@${string}`,
	emailVerified?:boolean | `@${string}`,
	age?:boolean | `@${string}`,
	socialMedia?:boolean | `@${string}`,
	roles?:boolean | `@${string}`,
	accounts?:ResolverInputTypes["AccountOauth"],
postsConnection2?: [{	after?: string | undefined | null,	before?: string | undefined | null,	first?: number | undefined | null,	last?: number | undefined | null},ResolverInputTypes["PostsConnectionResult"]],
postsConnection?: [{	after?: string | undefined | null,	before?: string | undefined | null,	first?: number | undefined | null,	last?: number | undefined | null},ResolverInputTypes["PostConnection"]],
	postCount?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserBaseError"]:AliasType<{
		message?:boolean | `@${string}`,
	solution?:boolean | `@${string}`;
		['...on ServerError']?: Omit<ResolverInputTypes["ServerError"],keyof ResolverInputTypes["UserBaseError"]>;
		['...on UserGenericError']?: Omit<ResolverInputTypes["UserGenericError"],keyof ResolverInputTypes["UserBaseError"]>;
		['...on UserHaveNoAccessError']?: Omit<ResolverInputTypes["UserHaveNoAccessError"],keyof ResolverInputTypes["UserBaseError"]>;
		['...on UserNotFoundError']?: Omit<ResolverInputTypes["UserNotFoundError"],keyof ResolverInputTypes["UserBaseError"]>;
		['...on UserSessionExpiredError']?: Omit<ResolverInputTypes["UserSessionExpiredError"],keyof ResolverInputTypes["UserBaseError"]>;
		__typename?: boolean | `@${string}`
}>;
	["UserBy"]: {
	userId?: ResolverInputTypes["UUID"] | undefined | null,
	username?: string | undefined | null,
	address?: ResolverInputTypes["Address"] | undefined | null,
	email?: string | undefined | null
};
	["UserCreateResult"]: AliasType<{
	User?:ResolverInputTypes["User"],
	UserRegisterInvalidInputError?:ResolverInputTypes["UserRegisterInvalidInputError"],
	UserNotFoundError?:ResolverInputTypes["UserNotFoundError"],
	ServerError?:ResolverInputTypes["ServerError"],
		__typename?: boolean | `@${string}`
}>;
	["UserGenericError"]: AliasType<{
	message?:boolean | `@${string}`,
	solution?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserGetResult"]: AliasType<{
	User?:ResolverInputTypes["User"],
	UserNotFoundError?:ResolverInputTypes["UserNotFoundError"],
	ServerError?:ResolverInputTypes["ServerError"],
	UserSessionExpiredError?:ResolverInputTypes["UserSessionExpiredError"],
		__typename?: boolean | `@${string}`
}>;
	["UserHaveNoAccessError"]: AliasType<{
	message?:boolean | `@${string}`,
	solution?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserInput"]: {
	username: string,
	password?: string | undefined | null,
	firstName?: string | undefined | null,
	lastName?: string | undefined | null,
	city?: string | undefined | null,
	email?: string | undefined | null,
	age?: number | undefined | null,
	socialMedia: Array<string>
};
	["UserNotFoundError"]: AliasType<{
	message?:boolean | `@${string}`,
	solution?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserRegisterInvalidInputError"]: AliasType<{
	usernameErrorMessage?:boolean | `@${string}`,
	emailErrorMessage?:boolean | `@${string}`,
	dateOfBirthErrorMessage?:boolean | `@${string}`,
	passwordErrorMessage?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserSessionExpiredError"]: AliasType<{
	message?:boolean | `@${string}`,
	solution?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserSignInInvalidInputError"]: AliasType<{
	usernameErrorMessage?:boolean | `@${string}`,
	loginErrorMessage?:boolean | `@${string}`,
	emailErrorMessage?:boolean | `@${string}`,
	passwordErrorMessage?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UserSignInResult"]: AliasType<{
	User?:ResolverInputTypes["User"],
	UserSignInInvalidInputError?:ResolverInputTypes["UserSignInInvalidInputError"],
	UserNotFoundError?:ResolverInputTypes["UserNotFoundError"],
	ServerError?:ResolverInputTypes["ServerError"],
		__typename?: boolean | `@${string}`
}>;
	["UserSignOutResult"]: AliasType<{
	SignOutMessage?:ResolverInputTypes["SignOutMessage"],
	UserSessionExpiredError?:ResolverInputTypes["UserSessionExpiredError"],
	ServerError?:ResolverInputTypes["ServerError"],
		__typename?: boolean | `@${string}`
}>;
	/** A UUID type provided by the SurrealDB database */
["UuidSurrealdb"]:unknown
  }

export type ModelTypes = {
    ["AccountOauth"]: {
		/** unique identifier for the oauth provider. Don't use name of user because that could be changed */
	id: string,
	displayName?: string | undefined,
	email?: string | undefined,
	emailVerified: boolean,
	provider: ModelTypes["OauthProvider"],
	providerAccountId: ModelTypes["OauthProvider"],
	accessToken: string,
	refreshToken?: string | undefined,
	/** access token expiration timestamp, represented as the number of seconds since the epoch (January 1, 1970 00:00:00 UTC). */
	expiresAt?: ModelTypes["DateTime"] | undefined,
	tokenType?: ModelTypes["TokenType"] | undefined,
	scopes: Array<string>,
	idToken?: string | undefined,
	oauthToken?: string | undefined,
	oauthTokenSecret?: string | undefined
};
	["Address"]: {
	street: string,
	houseNumber: string,
	city: string,
	zip: string
};
	/** Implement the DateTime<Utc> scalar

The input/output is a string in RFC3339 format. */
["DateTime"]:any;
	["Mutation"]: {
		createUser: ModelTypes["User"],
	signIn: ModelTypes["UserSignInResult"],
	signOut: ModelTypes["UserSignOutResult"],
	/** Creates a new user but doesn't log in the user
Currently like this because of future developments */
	signUp: ModelTypes["UserCreateResult"],
	createPost: ModelTypes["Post"]
};
	["OauthProvider"]:OauthProvider;
	/** Information about pagination in a connection */
["PageInfo"]: {
		/** When paginating backwards, are there more items? */
	hasPreviousPage: boolean,
	/** When paginating forwards, are there more items? */
	hasNextPage: boolean,
	/** When paginating backwards, the cursor to continue. */
	startCursor?: string | undefined,
	/** When paginating forwards, the cursor to continue. */
	endCursor?: string | undefined
};
	["Post"]: {
		id?: ModelTypes["UUID"] | undefined,
	posterId: ModelTypes["UUID"],
	title: string,
	content: string,
	poster: ModelTypes["User"]
};
	["PostConnection"]: {
		/** Information to aid in pagination. */
	pageInfo: ModelTypes["PageInfo"],
	/** A list of edges. */
	edges: Array<ModelTypes["PostEdge"]>,
	/** A list of nodes. */
	nodes: Array<ModelTypes["Post"]>
};
	/** An edge in a connection. */
["PostEdge"]: {
		/** A cursor for use in pagination */
	cursor: string,
	/** The item at the end of the edge */
	node: ModelTypes["Post"],
	lowo: boolean,
	happy: boolean
};
	["PostInput"]: {
	title: string,
	content: string
};
	["PostsConnectionResult"]:ModelTypes["PostConnection"] | ModelTypes["UserNotFoundError"];
	["Query"]: {
		me: ModelTypes["UserGetResult"],
	user: ModelTypes["UserGetResult"],
	getUser: ModelTypes["UserGetResult"],
	users: Array<ModelTypes["User"]>,
	session: ModelTypes["SessionResult"],
	post: ModelTypes["Post"],
	posts: Array<ModelTypes["Post"]>
};
	["Role"]:Role;
	["ServerError"]: {
		message: string,
	solution: string
};
	["Session"]: {
		userId: ModelTypes["UuidSurrealdb"]
};
	["SessionResult"]:ModelTypes["Session"] | ModelTypes["UserSessionExpiredError"] | ModelTypes["ServerError"];
	["SignInCredentials"]: {
	username: string,
	password: string
};
	["SignOutMessage"]: {
		message: string,
	userId: ModelTypes["UUID"]
};
	["Subscription"]: {
		values: number
};
	["TokenType"]:TokenType;
	/** A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as
Strings within GraphQL. UUIDs are used to assign unique identifiers to
entities without requiring a central allocating authority.

# References

* [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
* [RFC4122: A Universally Unique IDentifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122) */
["UUID"]:any;
	["User"]: {
		id: ModelTypes["UuidSurrealdb"],
	createdAt?: ModelTypes["DateTime"] | undefined,
	username: string,
	firstName?: string | undefined,
	lastName?: string | undefined,
	city?: string | undefined,
	email?: string | undefined,
	emailVerified: boolean,
	age?: number | undefined,
	socialMedia: Array<string>,
	roles: Array<ModelTypes["Role"]>,
	accounts: Array<ModelTypes["AccountOauth"]>,
	postsConnection2: ModelTypes["PostsConnectionResult"],
	postsConnection: ModelTypes["PostConnection"],
	postCount: number
};
	["UserBaseError"]: ModelTypes["ServerError"] | ModelTypes["UserGenericError"] | ModelTypes["UserHaveNoAccessError"] | ModelTypes["UserNotFoundError"] | ModelTypes["UserSessionExpiredError"];
	["UserBy"]: {
	userId?: ModelTypes["UUID"] | undefined,
	username?: string | undefined,
	address?: ModelTypes["Address"] | undefined,
	email?: string | undefined
};
	["UserCreateResult"]:ModelTypes["User"] | ModelTypes["UserRegisterInvalidInputError"] | ModelTypes["UserNotFoundError"] | ModelTypes["ServerError"];
	["UserGenericError"]: {
		message: string,
	solution: string
};
	["UserGetResult"]:ModelTypes["User"] | ModelTypes["UserNotFoundError"] | ModelTypes["ServerError"] | ModelTypes["UserSessionExpiredError"];
	["UserHaveNoAccessError"]: {
		message: string,
	solution: string
};
	["UserInput"]: {
	username: string,
	password?: string | undefined,
	firstName?: string | undefined,
	lastName?: string | undefined,
	city?: string | undefined,
	email?: string | undefined,
	age?: number | undefined,
	socialMedia: Array<string>
};
	["UserNotFoundError"]: {
		message: string,
	solution: string
};
	["UserRegisterInvalidInputError"]: {
		usernameErrorMessage: string,
	emailErrorMessage: string,
	dateOfBirthErrorMessage: string,
	passwordErrorMessage: string
};
	["UserSessionExpiredError"]: {
		message: string,
	solution: string
};
	["UserSignInInvalidInputError"]: {
		usernameErrorMessage: string,
	loginErrorMessage: string,
	emailErrorMessage: string,
	passwordErrorMessage: string
};
	["UserSignInResult"]:ModelTypes["User"] | ModelTypes["UserSignInInvalidInputError"] | ModelTypes["UserNotFoundError"] | ModelTypes["ServerError"];
	["UserSignOutResult"]:ModelTypes["SignOutMessage"] | ModelTypes["UserSessionExpiredError"] | ModelTypes["ServerError"];
	/** A UUID type provided by the SurrealDB database */
["UuidSurrealdb"]:any
    }

export type GraphQLTypes = {
    ["AccountOauth"]: {
	__typename: "AccountOauth",
	/** unique identifier for the oauth provider. Don't use name of user because that could be changed */
	id: string,
	displayName?: string | undefined,
	email?: string | undefined,
	emailVerified: boolean,
	provider: GraphQLTypes["OauthProvider"],
	providerAccountId: GraphQLTypes["OauthProvider"],
	accessToken: string,
	refreshToken?: string | undefined,
	/** access token expiration timestamp, represented as the number of seconds since the epoch (January 1, 1970 00:00:00 UTC). */
	expiresAt?: GraphQLTypes["DateTime"] | undefined,
	tokenType?: GraphQLTypes["TokenType"] | undefined,
	scopes: Array<string>,
	idToken?: string | undefined,
	oauthToken?: string | undefined,
	oauthTokenSecret?: string | undefined
};
	["Address"]: {
		street: string,
	houseNumber: string,
	city: string,
	zip: string
};
	/** Implement the DateTime<Utc> scalar

The input/output is a string in RFC3339 format. */
["DateTime"]: "scalar" & { name: "DateTime" };
	["Mutation"]: {
	__typename: "Mutation",
	createUser: GraphQLTypes["User"],
	signIn: GraphQLTypes["UserSignInResult"],
	signOut: GraphQLTypes["UserSignOutResult"],
	/** Creates a new user but doesn't log in the user
Currently like this because of future developments */
	signUp: GraphQLTypes["UserCreateResult"],
	createPost: GraphQLTypes["Post"]
};
	["OauthProvider"]: OauthProvider;
	/** Information about pagination in a connection */
["PageInfo"]: {
	__typename: "PageInfo",
	/** When paginating backwards, are there more items? */
	hasPreviousPage: boolean,
	/** When paginating forwards, are there more items? */
	hasNextPage: boolean,
	/** When paginating backwards, the cursor to continue. */
	startCursor?: string | undefined,
	/** When paginating forwards, the cursor to continue. */
	endCursor?: string | undefined
};
	["Post"]: {
	__typename: "Post",
	id?: GraphQLTypes["UUID"] | undefined,
	posterId: GraphQLTypes["UUID"],
	title: string,
	content: string,
	poster: GraphQLTypes["User"]
};
	["PostConnection"]: {
	__typename: "PostConnection",
	/** Information to aid in pagination. */
	pageInfo: GraphQLTypes["PageInfo"],
	/** A list of edges. */
	edges: Array<GraphQLTypes["PostEdge"]>,
	/** A list of nodes. */
	nodes: Array<GraphQLTypes["Post"]>
};
	/** An edge in a connection. */
["PostEdge"]: {
	__typename: "PostEdge",
	/** A cursor for use in pagination */
	cursor: string,
	/** The item at the end of the edge */
	node: GraphQLTypes["Post"],
	lowo: boolean,
	happy: boolean
};
	["PostInput"]: {
		title: string,
	content: string
};
	["PostsConnectionResult"]:{
        	__typename:"PostConnection" | "UserNotFoundError"
        	['...on PostConnection']: '__union' & GraphQLTypes["PostConnection"];
	['...on UserNotFoundError']: '__union' & GraphQLTypes["UserNotFoundError"];
};
	["Query"]: {
	__typename: "Query",
	me: GraphQLTypes["UserGetResult"],
	user: GraphQLTypes["UserGetResult"],
	getUser: GraphQLTypes["UserGetResult"],
	users: Array<GraphQLTypes["User"]>,
	session: GraphQLTypes["SessionResult"],
	post: GraphQLTypes["Post"],
	posts: Array<GraphQLTypes["Post"]>
};
	["Role"]: Role;
	["ServerError"]: {
	__typename: "ServerError",
	message: string,
	solution: string
};
	["Session"]: {
	__typename: "Session",
	userId: GraphQLTypes["UuidSurrealdb"]
};
	["SessionResult"]:{
        	__typename:"Session" | "UserSessionExpiredError" | "ServerError"
        	['...on Session']: '__union' & GraphQLTypes["Session"];
	['...on UserSessionExpiredError']: '__union' & GraphQLTypes["UserSessionExpiredError"];
	['...on ServerError']: '__union' & GraphQLTypes["ServerError"];
};
	["SignInCredentials"]: {
		username: string,
	password: string
};
	["SignOutMessage"]: {
	__typename: "SignOutMessage",
	message: string,
	userId: GraphQLTypes["UUID"]
};
	["Subscription"]: {
	__typename: "Subscription",
	values: number
};
	["TokenType"]: TokenType;
	/** A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as
Strings within GraphQL. UUIDs are used to assign unique identifiers to
entities without requiring a central allocating authority.

# References

* [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
* [RFC4122: A Universally Unique IDentifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122) */
["UUID"]: "scalar" & { name: "UUID" };
	["User"]: {
	__typename: "User",
	id: GraphQLTypes["UuidSurrealdb"],
	createdAt?: GraphQLTypes["DateTime"] | undefined,
	username: string,
	firstName?: string | undefined,
	lastName?: string | undefined,
	city?: string | undefined,
	email?: string | undefined,
	emailVerified: boolean,
	age?: number | undefined,
	socialMedia: Array<string>,
	roles: Array<GraphQLTypes["Role"]>,
	accounts: Array<GraphQLTypes["AccountOauth"]>,
	postsConnection2: GraphQLTypes["PostsConnectionResult"],
	postsConnection: GraphQLTypes["PostConnection"],
	postCount: number
};
	["UserBaseError"]: {
	__typename:"ServerError" | "UserGenericError" | "UserHaveNoAccessError" | "UserNotFoundError" | "UserSessionExpiredError",
	message: string,
	solution: string
	['...on ServerError']: '__union' & GraphQLTypes["ServerError"];
	['...on UserGenericError']: '__union' & GraphQLTypes["UserGenericError"];
	['...on UserHaveNoAccessError']: '__union' & GraphQLTypes["UserHaveNoAccessError"];
	['...on UserNotFoundError']: '__union' & GraphQLTypes["UserNotFoundError"];
	['...on UserSessionExpiredError']: '__union' & GraphQLTypes["UserSessionExpiredError"];
};
	["UserBy"]: {
		userId?: GraphQLTypes["UUID"] | undefined,
	username?: string | undefined,
	address?: GraphQLTypes["Address"] | undefined,
	email?: string | undefined
};
	["UserCreateResult"]:{
        	__typename:"User" | "UserRegisterInvalidInputError" | "UserNotFoundError" | "ServerError"
        	['...on User']: '__union' & GraphQLTypes["User"];
	['...on UserRegisterInvalidInputError']: '__union' & GraphQLTypes["UserRegisterInvalidInputError"];
	['...on UserNotFoundError']: '__union' & GraphQLTypes["UserNotFoundError"];
	['...on ServerError']: '__union' & GraphQLTypes["ServerError"];
};
	["UserGenericError"]: {
	__typename: "UserGenericError",
	message: string,
	solution: string
};
	["UserGetResult"]:{
        	__typename:"User" | "UserNotFoundError" | "ServerError" | "UserSessionExpiredError"
        	['...on User']: '__union' & GraphQLTypes["User"];
	['...on UserNotFoundError']: '__union' & GraphQLTypes["UserNotFoundError"];
	['...on ServerError']: '__union' & GraphQLTypes["ServerError"];
	['...on UserSessionExpiredError']: '__union' & GraphQLTypes["UserSessionExpiredError"];
};
	["UserHaveNoAccessError"]: {
	__typename: "UserHaveNoAccessError",
	message: string,
	solution: string
};
	["UserInput"]: {
		username: string,
	password?: string | undefined,
	firstName?: string | undefined,
	lastName?: string | undefined,
	city?: string | undefined,
	email?: string | undefined,
	age?: number | undefined,
	socialMedia: Array<string>
};
	["UserNotFoundError"]: {
	__typename: "UserNotFoundError",
	message: string,
	solution: string
};
	["UserRegisterInvalidInputError"]: {
	__typename: "UserRegisterInvalidInputError",
	usernameErrorMessage: string,
	emailErrorMessage: string,
	dateOfBirthErrorMessage: string,
	passwordErrorMessage: string
};
	["UserSessionExpiredError"]: {
	__typename: "UserSessionExpiredError",
	message: string,
	solution: string
};
	["UserSignInInvalidInputError"]: {
	__typename: "UserSignInInvalidInputError",
	usernameErrorMessage: string,
	loginErrorMessage: string,
	emailErrorMessage: string,
	passwordErrorMessage: string
};
	["UserSignInResult"]:{
        	__typename:"User" | "UserSignInInvalidInputError" | "UserNotFoundError" | "ServerError"
        	['...on User']: '__union' & GraphQLTypes["User"];
	['...on UserSignInInvalidInputError']: '__union' & GraphQLTypes["UserSignInInvalidInputError"];
	['...on UserNotFoundError']: '__union' & GraphQLTypes["UserNotFoundError"];
	['...on ServerError']: '__union' & GraphQLTypes["ServerError"];
};
	["UserSignOutResult"]:{
        	__typename:"SignOutMessage" | "UserSessionExpiredError" | "ServerError"
        	['...on SignOutMessage']: '__union' & GraphQLTypes["SignOutMessage"];
	['...on UserSessionExpiredError']: '__union' & GraphQLTypes["UserSessionExpiredError"];
	['...on ServerError']: '__union' & GraphQLTypes["ServerError"];
};
	/** A UUID type provided by the SurrealDB database */
["UuidSurrealdb"]: "scalar" & { name: "UuidSurrealdb" }
    }
export const enum OauthProvider {
	GITHUB = "GITHUB",
	GOOGLE = "GOOGLE"
}
export const enum Role {
	ADMIN = "ADMIN",
	USER = "USER"
}
export const enum TokenType {
	BEARER = "BEARER"
}

type ZEUS_VARIABLES = {
	["Address"]: ValueTypes["Address"];
	["DateTime"]: ValueTypes["DateTime"];
	["OauthProvider"]: ValueTypes["OauthProvider"];
	["PostInput"]: ValueTypes["PostInput"];
	["Role"]: ValueTypes["Role"];
	["SignInCredentials"]: ValueTypes["SignInCredentials"];
	["TokenType"]: ValueTypes["TokenType"];
	["UUID"]: ValueTypes["UUID"];
	["UserBy"]: ValueTypes["UserBy"];
	["UserInput"]: ValueTypes["UserInput"];
	["UuidSurrealdb"]: ValueTypes["UuidSurrealdb"];
}