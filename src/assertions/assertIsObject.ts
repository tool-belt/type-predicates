import { createTypeAssertion } from '../utils';
import { isObject } from '../guards/isObject';

/**
 * @remarks
 * Tests true for all objects that have a typeof 'object' excluding null
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as object
 * assertIsObject({});
 *
 * // does not throw, value is typed as object
 * assertIsObject([]);
 *
 * // throws
 * assertIsObject(null);
 * ```
 *
 * @throws TypeError
 */
export const assertIsObject = createTypeAssertion<object>(isObject);
