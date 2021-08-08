export type TypeValidator = (input: unknown, ...args: any[]) => boolean;
export type KeyValidator = { keyValidator: TypeValidator };
export type ValueValidator = { valueValidator: TypeValidator };
export type TypeGuardOptions =
    | undefined
    | Partial<ValueValidator & KeyValidator>;
export type TypeGuard<T = any, O extends TypeGuardOptions = undefined> = (
    input: unknown,
    options?: O,
    ...args: any[]
) => input is T;
export type TypeAssertion<T = any, O extends TypeGuardOptions = undefined> = (
    input: unknown,
    options?: O,
    ...args: any[]
) => asserts input is T;
