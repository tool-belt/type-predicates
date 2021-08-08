import { createTypeAssertion } from '../utils';
import { isDataView } from '../guards/isDataView';

/**
 * Asserts that input is DataView object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as DataView
 * assertIsDataView(new DateView(new ArrayBuffer(8));
 *
 * // throws
 * assertIsDataView('abc');
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsDataView = createTypeAssertion<DataView>(isDataView);
