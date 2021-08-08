import { createTypeGuard } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is Promise object
 *
 * @remarks
 * - Works with custom promises as well, e.g. AxiosPromise or Bluebird
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, typed as Promise<unknown>
 * isPromise(Promise.resolve('abc'));
 *
 * // true, typed as Promise<string>
 * isPromise<string>(Promise.resolve('abc'));
 *
 * // false
 * isPromise<string>({});
 * ```
 *
 * @typeParam T - Type of promise value, defaults to unknown
 * @param input - Value to be tested
 * @returns Boolean
 */
export function isPromise<T = unknown>(input: unknown): input is Promise<T> {
    return createTypeGuard<Promise<T>>(
        (value) =>
            value instanceof Promise ||
            (isObject(value) &&
                typeof Reflect.get(value, 'then') === 'function'),
    )(input);
}
