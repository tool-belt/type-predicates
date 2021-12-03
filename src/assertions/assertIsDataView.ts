import { isDataView } from '../guards/isDataView';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsDataView = createTypeAssertion<DataView>(isDataView);
