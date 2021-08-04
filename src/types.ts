/* eslint-disable @typescript-eslint/ban-types,eslint-comments/disable-enable-pair */
export interface BaseTypeGuardOptions {
    throwError?: boolean;
}
export type RecordKeyTypes = string | number | symbol;
export type BaseTypeGuard<T = any> = (
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
