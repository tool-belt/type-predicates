import { createTypeAssertion } from '../utils';
import { isDataView } from '../guards/isDataView';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsDataView = createTypeAssertion<DataView>(isDataView);
