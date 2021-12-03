import { isUnion } from '../utils';
import { isArrayBuffer } from './isArrayBuffer';
import { isSharedArrayBuffer } from './isSharedArrayBuffer';

/** @category Type Guard */
export const isAnyArrayBuffer = isUnion<ArrayBuffer | SharedArrayBuffer>(
    isArrayBuffer,
    isSharedArrayBuffer,
);
