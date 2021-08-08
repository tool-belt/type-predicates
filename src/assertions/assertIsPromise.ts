import { createTypeAssertion } from '../utils';
import { isPromise } from '../guards/isPromise';

/**
 * Asserts that input is Promise object
 *
 * @remarks
 * - Works with custom promises as well, e.g. AxiosPromise or Bluebird
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Promise<unknown>
 * assertIsPromise(new Promise(resolve => resolve(true));
 *
 * // does not throw, value is typed as Promise<boolean>
 * assertIsPromise<boolean>(new Promise(resolve => resolve(true));
 *
 * // throws
 * assertIsPromise({});
 * ```
 *
 * @typeParam T - Type of promise value, defaults to unknown
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export function assertIsPromise<T = unknown>(
    input: unknown,
): asserts input is Promise<T> {
    return createTypeAssertion<Promise<T>>(isPromise)(input);
}
