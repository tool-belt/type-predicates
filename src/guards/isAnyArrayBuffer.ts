import { isArrayBuffer } from './isArrayBuffer';
import { isSharedArrayBuffer } from './isSharedArrayBuffer';
import { isUnion } from '../utils';

/** @category Type Guard */
export const isAnyArrayBuffer = isUnion<ArrayBuffer | SharedArrayBuffer>(
    isArrayBuffer,
    isSharedArrayBuffer,
);
