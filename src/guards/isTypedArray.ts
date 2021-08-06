import { BaseTypeGuardOptions, TypedArray } from '../types';
import { createTypeGuard } from './createTypeGuard';
/**
 * Checks that input is TypedArray object
 *
 * @example
 *
 * ```typescript
 * // true, typed as TypeArray
 * isTypedArray(new Int8Array());
 *
 * // true, typed as Int8Array
 * isTypedArray<Int8Array>(new Int8Array());
 *
 * // true, typed as Uint8Array
 * isTypedArray<Uint8Array>(new Uint8Array());
 *
 * // true, typed as Uint8ClampedArray
 * isTypedArray<Uint8ClampedArray>(new Uint8ClampedArray());
 *
 * // true, typed as Int16Array
 * isTypedArray<Int16Array>(new Int16Array());
 *
 * // true, typed as Uint16Array
 * isTypedArray<Uint16Array>(new Uint16Array());
 *
 * // true, typed as Int32Array
 * isTypedArray<Int32Array>(new Int32Array());
 *
 * // true, typed as Uint32Array
 * isTypedArray<Uint32Array>(new Uint32Array());
 *
 * // true, typed as Float32Array
 * isTypedArray<Float32Array>(new Float32Array());
 *
 * // true, typed as Float64Array
 * isTypedArray<Float64Array>(new Float64Array());
 *
 * // true, typed as BigInt64Array
 * isTypedArray<BigInt64Array>(new BigInt64Array());
 *
 * // true, typed as BigUint64Array
 * isTypedArray<BigUint64Array>(new BigUint64Array());
 *
 * // false
 * isTypedArray([]);
 *
 * // throws TypeError
 * isTypedArray([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isTypedArray<T extends TypedArray = TypedArray>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
): input is T {
    return createTypeGuard<T>(
        (value) =>
            value instanceof Object.getPrototypeOf(Int8Array) ||
            value instanceof Object.getPrototypeOf(Uint8Array),
        'TypedArray',
    )(input, { throwError });
}

/**
 * Checks that input is Int8Array object
 *
 * @example
 *
 * ```typescript
 * // true
 * isInt8Array(new Int8Array());
 *
 * // false
 * isInt8Array([]);
 *
 * // throws TypeError
 * isInt8Array([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isInt8Array = (
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is Int8Array =>
    createTypeGuard<Int8Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Int8Array',
    )(input, { throwError });
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
 *
 * // throws TypeError
 * isUint8Array([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isUint8Array = (
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is Uint8Array =>
    createTypeGuard<Uint8Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Uint8Array',
    )(input, { throwError });
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
 *
 * // throws TypeError
 * isUint8ClampedArray([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isUint8ClampedArray = (
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is Uint8ClampedArray =>
    createTypeGuard<Uint8ClampedArray>(
        (value) =>
            isTypedArray(value) &&
            value[Symbol.toStringTag] === 'Uint8ClampedArray',
    )(input, { throwError });
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
 *
 * // throws TypeError
 * isInt16Array([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isInt16Array = (
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is Int16Array =>
    createTypeGuard<Int16Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Int16Array',
    )(input, { throwError });
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
 *
 * // throws TypeError
 * isUint16Array([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isUint16Array = (
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is Uint16Array =>
    createTypeGuard<Uint16Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Uint16Array',
    )(input, { throwError });
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
 *
 * // throws TypeError
 * isInt32Array([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isInt32Array = (
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is Int32Array =>
    createTypeGuard<Int32Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Int32Array',
    )(input, { throwError });
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
 *
 * // throws TypeError
 * isUint32Array([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isUint32Array = (
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is Uint32Array =>
    createTypeGuard<Uint32Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Uint32Array',
    )(input, { throwError });
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
 *
 * // throws TypeError
 * isFloat32Array([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isFloat32Array = (
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is Float32Array =>
    createTypeGuard<Float32Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Float32Array',
    )(input, { throwError });
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
 *
 * // throws TypeError
 * isFloat64Array([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isFloat64Array = (
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is Float64Array =>
    createTypeGuard<Float64Array>(
        (value) =>
            isTypedArray(value) && value[Symbol.toStringTag] === 'Float64Array',
    )(input, { throwError });
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
 *
 * // throws TypeError
 * isBigInt64Array([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isBigInt64Array = (
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is BigInt64Array =>
    createTypeGuard<BigInt64Array>(
        (value) =>
            isTypedArray(value) &&
            value[Symbol.toStringTag] === 'BigInt64Array',
    )(input, { throwError });
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
 *
 * // throws TypeError
 * isBigUint64Array([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isBigUint64Array = (
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is BigUint64Array =>
    createTypeGuard<BigUint64Array>(
        (value) =>
            isTypedArray(value) &&
            value[Symbol.toStringTag] === 'BigUint64Array',
    )(input, { throwError });
