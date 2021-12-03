import { isUnion } from '../utils';
import { isNull } from './isNull';
import { isUndefined } from './isUndefined';

/**
 * @remarks
 * Tests true for undefined and null, false for all other falsy values
 * @category Type Guard
 */
export const isNullish = isUnion<null | undefined>(isNull, isUndefined);
