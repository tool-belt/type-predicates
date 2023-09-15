import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isUndefined = createTypeGuard<undefined>(
    (value) => value === undefined,
);
