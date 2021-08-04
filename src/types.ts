/* eslint-disable @typescript-eslint/ban-types,eslint-comments/disable-enable-pair */
export type BaseTypeGuard<T = any> = (
    input: unknown,
    options: { throwError: boolean },
) => input is T;
export type TypeValidator = (input: unknown) => boolean;
export type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;
export type TypedGeneratorFunction<Y, R, N> = (
    ...args: any[]
) => Generator<Y, R, N>;
export type TypedAsyncGeneratorFunction<Y, R, N> = (
    ...args: any[]
) => AsyncGenerator<Y, R, N>;
