import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isSymbol = createTypeGuard<symbol>(
    (value) => typeof value === 'symbol',
);
