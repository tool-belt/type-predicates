import {
    isBigInt64Array,
    isBigUint64Array,
    isFloat32Array,
    isFloat64Array,
    isInt8Array,
    isInt16Array,
    isInt32Array,
    isTypedArray,
    isUint8Array,
    isUint8ClampedArray,
    isUint16Array,
    isUint32Array,
} from '../guards/isTypedArray';
import { TypedArray } from '../types';
import { createTypeAssertion } from '../utils';
/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsTypedArray = createTypeAssertion<TypedArray>(isTypedArray);

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsInt8Array = createTypeAssertion<Int8Array>(isInt8Array);

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsUint8Array = createTypeAssertion<Uint8Array>(isUint8Array);

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsUint8ClampedArray =
    createTypeAssertion<Uint8ClampedArray>(isUint8ClampedArray);

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsInt16Array = createTypeAssertion<Int16Array>(isInt16Array);

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsUint16Array =
    createTypeAssertion<Uint16Array>(isUint16Array);

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsInt32Array = createTypeAssertion<Int32Array>(isInt32Array);

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsUint32Array =
    createTypeAssertion<Uint32Array>(isUint32Array);

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsFloat32Array =
    createTypeAssertion<Float32Array>(isFloat32Array);

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsFloat64Array =
    createTypeAssertion<Float64Array>(isFloat64Array);

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsBigInt64Array =
    createTypeAssertion<BigInt64Array>(isBigInt64Array);

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsBigUint64Array =
    createTypeAssertion<BigUint64Array>(isBigUint64Array);
