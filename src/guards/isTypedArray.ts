import { TypedArray } from '../types';
import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isTypedArray = createTypeGuard<TypedArray>(
    (value) =>
        value instanceof Object.getPrototypeOf(Int8Array) ||
        value instanceof Object.getPrototypeOf(Uint8Array),
);

/** @category Type Guard */
export const isInt8Array = (input: unknown): input is Int8Array =>
    createTypeGuard<Int8Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Int8Array',
    )(input);

/** @category Type Guard */
export const isUint8Array = (input: unknown): input is Uint8Array =>
    createTypeGuard<Uint8Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Uint8Array',
    )(input);

/** @category Type Guard */
export const isUint8ClampedArray = (
    input: unknown,
): input is Uint8ClampedArray =>
    createTypeGuard<Uint8ClampedArray>(
        (value) =>
            isTypedArray(value) &&
            value[Symbol.toStringTag] === 'Uint8ClampedArray',
    )(input);

/** @category Type Guard */
export const isInt16Array = (input: unknown): input is Int16Array =>
    createTypeGuard<Int16Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Int16Array',
    )(input);

/** @category Type Guard */
export const isUint16Array = (input: unknown): input is Uint16Array =>
    createTypeGuard<Uint16Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Uint16Array',
    )(input);

/** @category Type Guard */
export const isInt32Array = (input: unknown): input is Int32Array =>
    createTypeGuard<Int32Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Int32Array',
    )(input);

/** @category Type Guard */
export const isUint32Array = (input: unknown): input is Uint32Array =>
    createTypeGuard<Uint32Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Uint32Array',
    )(input);

/** @category Type Guard */
export const isFloat32Array = (input: unknown): input is Float32Array =>
    createTypeGuard<Float32Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Float32Array',
    )(input);

/** @category Type Guard */
export const isFloat64Array = (input: unknown): input is Float64Array =>
    createTypeGuard<Float64Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Float64Array',
    )(input);

/** @category Type Guard */
export const isBigInt64Array = (input: unknown): input is BigInt64Array =>
    createTypeGuard<BigInt64Array>(
        (value) =>
            isTypedArray(value) &&
            value[Symbol.toStringTag] === 'BigInt64Array',
    )(input);

/** @category Type Guard */
export const isBigUint64Array = (input: unknown): input is BigUint64Array =>
    createTypeGuard<BigUint64Array>(
        (value) =>
            isTypedArray(value) &&
            value[Symbol.toStringTag] === 'BigUint64Array',
    )(input);
