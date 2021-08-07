export type TypeGuardBaseOptions = {
    throwError?: boolean;
};

export type TypeGuard<T = any> = (
    input: unknown,
    options?: TypeGuardBaseOptions,
) => input is T;

export type TypeAssertion<T = any> = (input: unknown) => asserts input is T;

export type TypeValidator = (input: unknown) => boolean;

export type TypedArray =
    | Uint8Array
    | Uint8ClampedArray
    | Uint16Array
    | Uint32Array
    | Int8Array
    | Int16Array
    | Int32Array
    | BigUint64Array
    | BigInt64Array
    | Float32Array
    | Float64Array;
