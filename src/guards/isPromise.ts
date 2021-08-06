import { BaseTypeGuardOptions } from '../types';
import { createTypeGuard } from './createTypeGuard';
import { isFunction } from './isFunction';
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
 * // true
 * isPromise<string>(Promise.resolve('hi'));
 *
 * // false
 * isPromise<string>({});
 *
 * // throws type error
 * isPromise<string>([], { throwError: true });
 * ```
 *
 * @typeParam T - Type of promise value, defaults to "any"
 * @param input - Value to be tested
 * @param throwError - Throw error if check fails
 * @returns Boolean
 * @throws TypeError
 */
export function isPromise<T = any>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
): input is Promise<T> {
    return createTypeGuard<Promise<T>>(
        (value) =>
            value instanceof Promise ||
            (isObject(value) && isFunction(Reflect.get(value, 'then'))),
        'promise',
    )(input, { throwError });
}
