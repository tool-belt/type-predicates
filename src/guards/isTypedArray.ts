export type TypedArray =
    | Uint8Array
    | Uint8ClampedArray
    | Uint16Array
    | Uint32Array
    | Int8Array
    | Int16Array
    | Int32Array
    | BigUint64Array
    | BigInt64Array
    | Float32Array
    | Float64Array;
import { createTypeGuard } from '../utils';
/**
 * Checks that input inherits from TypedArray
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, value is typed as TypedArray
 * isTypedArray(new Int8Array());
 *
 * // false
 * isTypedArray([]);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isTypedArray = createTypeGuard<TypedArray>(
    (value) =>
        value instanceof Object.getPrototypeOf(Int8Array) ||
        value instanceof Object.getPrototypeOf(Uint8Array),
);

/**
 * Checks that input is Int8Array object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isInt8Array(new Int8Array());
 *
 * // false
 * isInt8Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isInt8Array = (input: unknown): input is Int8Array =>
    createTypeGuard<Int8Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Int8Array',
    )(input);
/**
 * Checks that input is Uint8Array object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isUint8Array(new Uint8Array());
 *
 * // false
 * isUint8Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isUint8Array = (input: unknown): input is Uint8Array =>
    createTypeGuard<Uint8Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Uint8Array',
    )(input);
/**
 * Checks that input is Uint8ClampedArray object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isUint8ClampedArray(new Uint8ClampedArray());
 *
 * // false
 * isUint8ClampedArray([]);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isUint8ClampedArray = (
    input: unknown,
): input is Uint8ClampedArray =>
    createTypeGuard<Uint8ClampedArray>(
        (value) =>
            isTypedArray(value) &&
            value[Symbol.toStringTag] === 'Uint8ClampedArray',
    )(input);
/**
 * Checks that input is Int16Array object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isInt16Array(new Int16Array());
 *
 * // false
 * isInt16Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isInt16Array = (input: unknown): input is Int16Array =>
    createTypeGuard<Int16Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Int16Array',
    )(input);
/**
 * Checks that input is Uint16Array object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isUint16Array(new Uint16Array());
 *
 * // false
 * isUint16Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isUint16Array = (input: unknown): input is Uint16Array =>
    createTypeGuard<Uint16Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Uint16Array',
    )(input);
/**
 * Checks that input is Int32Array object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isInt32Array(new Int32Array());
 *
 * // false
 * isInt32Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isInt32Array = (input: unknown): input is Int32Array =>
    createTypeGuard<Int32Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Int32Array',
    )(input);
/**
 * Checks that input is Uint32Array object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isUint32Array(new Uint32Array());
 *
 * // false
 * isUint32Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isUint32Array = (input: unknown): input is Uint32Array =>
    createTypeGuard<Uint32Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Uint32Array',
    )(input);
/**
 * Checks that input is Float32Array object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isFloat32Array(new Float32Array());
 *
 * // false
 * isFloat32Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isFloat32Array = (input: unknown): input is Float32Array =>
    createTypeGuard<Float32Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Float32Array',
    )(input);
/**
 * Checks that input is Float64Array object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isFloat64Array(new Float64Array());
 *
 * // false
 * isFloat64Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isFloat64Array = (input: unknown): input is Float64Array =>
    createTypeGuard<Float64Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Float64Array',
    )(input);
/**
 * Checks that input is BigInt64Array object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isBigInt64Array(new BigInt64Array());
 *
 * // false
 * isBigInt64Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isBigInt64Array = (input: unknown): input is BigInt64Array =>
    createTypeGuard<BigInt64Array>(
        (value) =>
            isTypedArray(value) &&
            value[Symbol.toStringTag] === 'BigInt64Array',
    )(input);
/**
 * Checks that input is BigUint64Array object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isBigUint64Array(new BigUint64Array());
 *
 * // false
 * isBigUint64Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isBigUint64Array = (input: unknown): input is BigUint64Array =>
    createTypeGuard<BigUint64Array>(
        (value) =>
            isTypedArray(value) &&
            value[Symbol.toStringTag] === 'BigUint64Array',
    )(input);
