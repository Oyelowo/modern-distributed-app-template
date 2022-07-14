export type OmitFirst<F> = F extends [x: unknown, ...args: infer P] ? [...args: P] : never;

export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
