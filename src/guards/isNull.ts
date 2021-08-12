import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isNull = createTypeGuard<null>((value) => value === null);
