export type BaseTypeGuardOptions = {
    throwError?: boolean;
};

export type TypeGuard<T = any> = (
    input: unknown,
    options?: BaseTypeGuardOptions,
) => input is T;

export type TypeValidator = (input: unknown) => boolean;
