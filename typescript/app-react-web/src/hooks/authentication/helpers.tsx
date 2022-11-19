import z from "zod";

const GraphqlErrorResponseSchema = z.object({
  response: z.object({
    data: z.null(),
    errors: z.array(
      z.object({
        message: z.string(),
        locations: z.array(z.object({ line: z.number(), column: z.number() })),
        path: z.array(z.string()),
        extensions: z.object({
          code: z.number(),
          details: z.string(),
        }),
      }),
    ),
  }),
});

export type GraphqlErrorResponse = z.infer<typeof GraphqlErrorResponseSchema>;

export class GraphqlIoError {
  constructor(private errorResponse: GraphqlErrorResponse | null) {
    // this.errorResponse = GraphqlErrorResponseSchema.parse(errorResponse);
    this.errorResponse = errorResponse;
  }

  getTitle = () => {
    const firstError = this.errorResponse?.response.errors?.[0];
    return firstError?.extensions?.details ?? firstError?.message;
  };

  getDetails = () => {
    const firstError = this.errorResponse?.response.errors?.[0];
    return firstError?.extensions?.details ?? firstError?.message;
  };
}

type ServerTypeProps<TData, TError> = {
  status: "loading" | "error" | "success" | "idle";
  data: TData;
  error: TError;
};

export function mapReactQueryResultToImpossibleStates<TData, TError>({
  status,
  data,
  error,
}: ServerTypeProps<TData, TError>): ServerData<TData, TError> {
  switch (status) {
    case "loading":
      return {
        status: "loading",
      };
    case "error":
      return {
        status: "error",
        error,
      };
    case "success":
      return {
        status: "success",
        data,
      };

    default:
      return {
        status: "idle",
      };
  }
}

type ServerData<TData, TError> =
  | {
    status: "error";
    error: TError;
  }
  | {
    status: "loading";
  }
  | {
    status: "idle";
  }
  | {
    status: "success";
    data: TData;
  };
