import { createTypeAssertion } from '../utils';
import { isNullOrUndefined } from '../guards/isNullOrUndefined';

/**
 * Asserts that input is null or undefined
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as null | undefined
 * assertIsNullOrUndefined(null);
 *
 * // does not throw, value is typed as null | undefined
 * assertIsNullOrUndefined(undefined);
 *
 * // throws
 * assertIsNullOrUndefined('');
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsNullOrUndefined = createTypeAssertion<null | undefined>(
    isNullOrUndefined,
);
