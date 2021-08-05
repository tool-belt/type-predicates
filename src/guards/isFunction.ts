import { BaseTypeGuardOptions } from '../types';
import { createTypeGuard } from './createTypeGuard';
import { toObjectString } from '../utils';

/**
 * Checks that input is function
 *
 * @remarks
 * - This function excludes class declarations
 *
 * @category Type Guards
 * @example
 *
 * ```typescript
 * // true
 * isFunction(() => null);
 *
 * // false
 * isFunction(async () => Promise.resolve(null));
 *
 * // false
 * isFunction(function* () {});
 *
 * // false
 * isFunction(async function* () {});
 *
 * // false
 * isFunction(MyClass);
 *
 * // throws TypeError
 * isFunction([], { throwError: true });
 * ```
 *
 * @typeParam T - Function type, defaults to "Function"
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isFunction<T extends Function = Function>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
): input is T {
    return createTypeGuard<T>(
        (value) =>
            typeof value === 'function' &&
            toObjectString(value) === '[object Function]',
        'function',
    )(input, { throwError });
}
