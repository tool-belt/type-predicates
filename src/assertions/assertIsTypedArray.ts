import {
    TypedArray,
    isBigInt64Array,
    isBigUint64Array,
    isFloat32Array,
    isFloat64Array,
    isInt16Array,
    isInt32Array,
    isInt8Array,
    isTypedArray,
    isUint16Array,
    isUint32Array,
    isUint8Array,
    isUint8ClampedArray,
} from '../guards/isTypedArray';
import { createTypeAssertion } from '../utils';
/**
 * Asserts that input inherits from TypedArray
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as TypeArray
 * isTypedArray(new Int8Array());
 *
 * // false
 * isTypedArray([]);
 * ```
 *
 * @param input - Value to be tested
 * @throws TypeError
 */
export const assertIsTypedArray = createTypeAssertion<TypedArray>(isTypedArray);

/**
 * Asserts that input is Int8Array object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsInt8Array(new Int8Array());
 *
 * // throws
 * assertIsInt8Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @throws TypeError
 */
export const assertIsInt8Array = createTypeAssertion<Int8Array>(isInt8Array);
/**
 * Asserts that input is Uint8Array object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsUint8Array(new Uint8Array());
 *
 * // throws
 * assertIsUint8Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @throws TypeError
 */
export const assertIsUint8Array = createTypeAssertion<Uint8Array>(isUint8Array);
/**
 * Asserts that input is Uint8ClampedArray object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsUint8ClampedArray(new Uint8ClampedArray());
 *
 * // throws
 * assertIsUint8ClampedArray([]);
 * ```
 *
 * @param input - Value to be tested
 * @throws TypeError
 */
export const assertIsUint8ClampedArray =
    createTypeAssertion<Uint8ClampedArray>(isUint8ClampedArray);
/**
 * Asserts that input is Int16Array object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsInt16Array(new Int16Array());
 *
 * // throws
 * assertIsInt16Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @throws TypeError
 */
export const assertIsInt16Array = createTypeAssertion<Int16Array>(isInt16Array);
/**
 * Asserts that input is Uint16Array object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsUint16Array(new Uint16Array());
 *
 * // throws
 * assertIsUint16Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @throws TypeError
 */
export const assertIsUint16Array =
    createTypeAssertion<Uint16Array>(isUint16Array);
/**
 * Asserts that input is Int32Array object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsInt32Array(new Int32Array());
 *
 * // throws
 * assertIsInt32Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @throws TypeError
 */
export const assertIsInt32Array = createTypeAssertion<Int32Array>(isInt32Array);
/**
 * Asserts that input is Uint32Array object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsUint32Array(new Uint32Array());
 *
 * // throws
 * assertIsUint32Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @throws TypeError
 */
export const assertIsUint32Array =
    createTypeAssertion<Uint32Array>(isUint32Array);
/**
 * Asserts that input is Float32Array object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsFloat32Array(new Float32Array());
 *
 * // throws
 * assertIsFloat32Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @throws TypeError
 */
export const assertIsFloat32Array =
    createTypeAssertion<Float32Array>(isFloat32Array);
/**
 * Asserts that input is Float64Array object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsFloat64Array(new Float64Array());
 *
 * // throws
 * assertIsFloat64Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @throws TypeError
 */
export const assertIsFloat64Array =
    createTypeAssertion<Float64Array>(isFloat64Array);
/**
 * Asserts that input is BigInt64Array object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsBigInt64Array(new BigInt64Array());
 *
 * // throws
 * assertIsBigInt64Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @throws TypeError
 */
export const assertIsBigInt64Array =
    createTypeAssertion<BigInt64Array>(isBigInt64Array);
/**
 * Asserts that input is BigUint64Array object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsBigUint64Array(new BigUint64Array());
 *
 * // throws
 * assertIsBigUint64Array([]);
 * ```
 *
 * @param input - Value to be tested
 * @throws TypeError
 */
export const assertIsBigUint64Array =
    createTypeAssertion<BigUint64Array>(isBigUint64Array);
