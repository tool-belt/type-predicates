export interface BaseTypeGuardOptions {
    throwError?: boolean;
}
export type RecordKeyTypes = string | symbol;
export type TypeGuard<T = any> = (
    input: unknown,
    options?: BaseTypeGuardOptions,
) => input is T;
export type TypeValidator = (input: unknown) => boolean;
export type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;
export type TypedGeneratorFunction<Y, R, N> = (
    ...args: any[]
) => Generator<Y, R, N>;
export type TypedAsyncGeneratorFunction<Y, R, N> = (
    ...args: any[]
) => AsyncGenerator<Y, R, N>;
