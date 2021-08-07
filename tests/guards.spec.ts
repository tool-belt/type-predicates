import {
    TypeGuard,
    isArray,
    isArrayBuffer,
    isAsyncFunction,
    isAsyncGenerator,
    isAsyncGeneratorFunction,
    isAsyncIterable,
    isBigInt64Array,
    isBigUint64Array,
    isBoolean,
    isBuffer,
    isDataView,
    isDate,
    isError,
    isFloat32Array,
    isFloat64Array,
    isFunction,
    isGenerator,
    isGeneratorFunction,
    isInt16Array,
    isInt32Array,
    isInt8Array,
    isIterable,
    isIterator,
    isMap,
    isNull,
    isNullOrUndefined,
    isNumber,
    isObject,
    isPromise,
    isRecord,
    isRegExp,
    isSet,
    isString,
    isSymbol,
    isTypedArray,
    isUint16Array,
    isUint32Array,
    isUint8Array,
    isUint8ClampedArray,
    isUndefined,
    isUnion,
} from '../src';
import { expectTypeOf } from 'expect-type';

const asyncFunction = async () => Promise.resolve(null);
const regularFunction = () => null;
const generatorFunction = function* () {
    yield true;
};
const asyncGeneratorFunction = async function* () {
    yield await asyncFunction();
};
const generator = generatorFunction();
const asyncGenerator = asyncGeneratorFunction();
const stringArray = ['xyz', 'abc', '123'];
const numberArray = [1, 2, 3];
const symbolArray = [Symbol(), Symbol(), Symbol()];
const recordArray = [{ name: 1 }, { name: 2 }, { name: 3 }];
const stringMap = new Map([['xzy', 'abc']]);
const numberMap = new Map([[100, 100]]);
const symbolMap = new Map([[Symbol('x'), Symbol('y')]]);
const booleanMap = new Map([[false, true]]);
const recordMap = new Map([[{ key: 1 }, { value: 1 }]]);
class CustomClass {}
const stringRecord = { name: 'xyz' };
const numberRecord = { 1: 100 };
const symbolRecord = { [Symbol('a')]: Symbol('b') };
const promise = new Promise((resolve) => resolve(null));
const primitiveValues = [true, false, 0, 1, '', undefined, Symbol()];
const iterableObjects = [new Map(), new Set(), new String(), []];
const buffers = [new ArrayBuffer(8), new Buffer(8)];
const errors = [
    new Error(),
    new TypeError(),
    new RangeError(),
    new SyntaxError(),
    new URIError(),
    new ReferenceError(),
    new EvalError(),
];
const typedArrays = [
    new Int8Array(),
    new Uint8Array(),
    new Uint8ClampedArray(),
    new Int16Array(),
    new Uint16Array(),
    new Int32Array(),
    new Uint32Array(),
    new Float32Array(),
    new Float64Array(),
    new BigInt64Array(),
    new BigUint64Array(),
];
const objectValues = [
    {},
    new Number(),
    new Boolean(),
    new WeakMap(),
    new WeakSet(),
    ...iterableObjects,
    ...errors,
    ...buffers,
    ...typedArrays,
];
const functionValues = [
    regularFunction,
    asyncFunction,
    asyncGeneratorFunction,
    generatorFunction,
];

describe('isArray', () => {
    it('returns true for positively tested array values', () => {
        expect(
            isArray<string>(stringArray, { valueGuard: isString }),
        ).toBeTruthy();
        expect(
            isArray<number>(numberArray, { valueGuard: isNumber }),
        ).toBeTruthy();
        expect(
            isArray<symbol>(symbolArray, { valueGuard: isSymbol }),
        ).toBeTruthy();
        expect(
            isArray<object>(recordArray, { valueGuard: isObject }),
        ).toBeTruthy();
        expect(
            isArray<string | number>([...stringArray, ...numberArray], {
                valueGuard: isUnion<string | number>(isString, isNumber),
            }),
        ).toBeTruthy();
    });
    it('returns false for negatively tested array values', () => {
        expect(
            isArray<string>(stringArray, { valueGuard: isNumber }),
        ).toBeFalsy();
        expect(
            isArray<number>(numberArray, { valueGuard: isString }),
        ).toBeFalsy();
        expect(
            isArray<symbol>(symbolArray, { valueGuard: isObject }),
        ).toBeFalsy();
        expect(
            isArray<object>(recordArray, { valueGuard: isSymbol }),
        ).toBeFalsy();
        expect(
            isArray<string | number>([...symbolArray, ...recordArray], {
                valueGuard: isUnion<string | number>(isString, isNumber),
            }),
        ).toBeFalsy();
    });
    it('returns false for non-array values', () => {
        expect(isArray<string>('', { valueGuard: isString })).toBeFalsy();
        expect(isArray<string>(null, { valueGuard: isString })).toBeFalsy();
        expect(isArray<string>(123, { valueGuard: isString })).toBeFalsy();
        expect(isArray<string>(Symbol(), { valueGuard: isString })).toBeFalsy();
        expect(isArray<string>({}, { valueGuard: isString })).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() =>
            isArray<string>('', { throwError: true, valueGuard: isString }),
        ).toThrow();
        expect(() =>
            isArray<string>(null, { throwError: true, valueGuard: isString }),
        ).toThrow();
        expect(() =>
            isArray<string>(123, { throwError: true, valueGuard: isString }),
        ).toThrow();
    });
    it('guards type correctly', () => {
        const unknownArray: unknown = [...stringArray];
        if (isArray<string>(unknownArray, { valueGuard: isString })) {
            expectTypeOf(unknownArray).toMatchTypeOf(stringArray);
        }
        if (isArray(unknownArray)) {
            expectTypeOf(unknownArray).not.toMatchTypeOf(stringArray);
        }
    });
});

describe('isSet', () => {
    it('returns true for positively tested set values', () => {
        expect(isSet(new Set(stringArray))).toBeTruthy();
        expect(
            isSet<string>(new Set(stringArray), { valueGuard: isString }),
        ).toBeTruthy();
        expect(
            isSet<number>(new Set(numberArray), { valueGuard: isNumber }),
        ).toBeTruthy();
        expect(
            isSet<symbol>(new Set(symbolArray), { valueGuard: isSymbol }),
        ).toBeTruthy();
        expect(
            isSet<object>(new Set(recordArray), { valueGuard: isObject }),
        ).toBeTruthy();
        expect(
            isSet<string | number>(new Set([...stringArray, ...numberArray]), {
                valueGuard: isUnion<string | number>(isString, isNumber),
            }),
        ).toBeTruthy();
    });
    it('returns false for negatively tested set values', () => {
        expect(
            isSet<string>(new Set(stringArray), { valueGuard: isNumber }),
        ).toBeFalsy();
        expect(
            isSet<number>(new Set(numberArray), { valueGuard: isString }),
        ).toBeFalsy();
        expect(
            isSet<symbol>(new Set(symbolArray), { valueGuard: isObject }),
        ).toBeFalsy();
        expect(
            isSet<object>(new Set(recordArray), { valueGuard: isSymbol }),
        ).toBeFalsy();
        expect(
            isSet<string | number>(new Set([...symbolArray, ...recordArray]), {
                valueGuard: isUnion<string | number>(isString, isNumber),
            }),
        ).toBeFalsy();
    });
    it('returns false for non-set values', () => {
        expect(isSet<string>('', { valueGuard: isString })).toBeFalsy();
        expect(isSet<string>(null, { valueGuard: isString })).toBeFalsy();
        expect(isSet<string>(123, { valueGuard: isString })).toBeFalsy();
        expect(isSet<string>(Symbol(), { valueGuard: isString })).toBeFalsy();
        expect(isSet<string>({}, { valueGuard: isString })).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() =>
            isSet<string>('', { throwError: true, valueGuard: isString }),
        ).toThrow();
        expect(() =>
            isSet<string>(null, { throwError: true, valueGuard: isString }),
        ).toThrow();
        expect(() =>
            isSet<string>(123, { throwError: true, valueGuard: isString }),
        ).toThrow();
    });
    it('guards type correctly', () => {
        const unknownSet: unknown = new Set([...stringArray]);
        if (isSet(unknownSet)) {
            expectTypeOf(unknownSet).toMatchTypeOf(
                new Set<unknown>([...stringArray]),
            );
        }
        if (isSet<string>(unknownSet, { valueGuard: isString })) {
            expectTypeOf(unknownSet).toMatchTypeOf(
                new Set<string>([...stringArray]),
            );
        }
    });
});

describe('isMap', () => {
    it('returns true for positively tested map values', () => {
        expect(
            isMap<string, string>(stringMap, {
                valueGuard: isString,
                keyGuard: isString,
            }),
        ).toBeTruthy();
        expect(
            isMap<number, number>(numberMap, {
                valueGuard: isNumber,
                keyGuard: isNumber,
            }),
        ).toBeTruthy();
        expect(
            isMap<symbol, symbol>(symbolMap, {
                valueGuard: isSymbol,
                keyGuard: isSymbol,
            }),
        ).toBeTruthy();
        expect(
            isMap<string | number | symbol, string | number | symbol>(
                new Map<string | number | symbol, string | number | symbol>([
                    ...stringMap,
                    ...numberMap,
                    ...symbolMap,
                ]),
                {
                    valueGuard: isUnion<string | number | symbol>(
                        isString,
                        isNumber,
                        isSymbol,
                    ),
                    keyGuard: isUnion<string | number | symbol>(
                        isString,
                        isNumber,
                        isSymbol,
                    ),
                },
            ),
        ).toBeTruthy();
        expect(
            isMap<object | boolean, object | boolean>(
                new Map<object | boolean, object | boolean>([
                    ...recordMap,
                    ...booleanMap,
                ]),
                {
                    valueGuard: isUnion<object | boolean>(isObject, isBoolean),
                    keyGuard: isUnion<object | boolean>(isObject, isBoolean),
                },
            ),
        ).toBeTruthy();
    });
    it('returns false for negatively tested map values', () => {
        expect(
            isMap(stringMap, {
                valueGuard: isNumber,
                keyGuard: isNumber,
            }),
        ).toBeFalsy();
        expect(
            isMap(numberMap, {
                valueGuard: isString,
                keyGuard: isString,
            }),
        ).toBeFalsy();
    });
    it('returns false for non-map values', () => {
        expect(isMap('')).toBeFalsy();
        expect(isMap(true)).toBeFalsy();
        expect(isMap(new Set())).toBeFalsy();
        expect(isMap([])).toBeFalsy();
        expect(isMap(new WeakMap())).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isMap('', { throwError: true })).toThrow();
        expect(() => isMap(null, { throwError: true })).toThrow();
        expect(() => isMap(new WeakMap(), { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        const unknownMap: unknown = new Map<unknown, unknown>([
            ...recordMap,
            ...stringMap,
        ]);
        if (
            isMap<object | string, object | string>(unknownMap, {
                keyGuard: isUnion(isObject, isString),
                valueGuard: isUnion(isObject, isString),
            })
        ) {
            expectTypeOf(unknownMap).toMatchTypeOf<
                Map<object | string, object | string>
            >(new Map<object | string, object | string>());
        }
    });
});

describe('isRecord', () => {
    it('returns true for positively tested record values', () => {
        expect(
            isRecord<string, string>(stringRecord, {
                valueGuard: isString,
                keyGuard: isString,
            }),
        ).toBeTruthy();
        expect(
            isRecord<string, number>(numberRecord, {
                valueGuard: isNumber,
                keyGuard: isString,
            }),
        ).toBeTruthy();
        expect(
            isRecord<symbol, symbol>(symbolRecord, {
                valueGuard: isSymbol,
                keyGuard: isSymbol,
            }),
        ).toBeTruthy();
        expect(
            isRecord<string | symbol, string | symbol>(
                {
                    ...stringRecord,
                    ...numberRecord,
                    ...symbolRecord,
                },
                {
                    valueGuard: isUnion<string | number | symbol>(
                        isString,
                        isNumber,
                        isSymbol,
                    ),
                    keyGuard: isUnion<string | number | symbol>(
                        isString,
                        isNumber,
                        isSymbol,
                    ),
                },
            ),
        ).toBeTruthy();
    });
    it('returns false for negatively tested record values', () => {
        expect(
            isRecord(stringRecord, {
                valueGuard: isNumber,
                keyGuard: isNumber,
            }),
        ).toBeFalsy();
        expect(
            isRecord(numberRecord, {
                valueGuard: isString,
                keyGuard: isString,
            }),
        ).toBeFalsy();
    });
    it('returns false for non-record values', () => {
        expect(isRecord(CustomClass)).toBeFalsy();
        expect(isRecord(new Map())).toBeFalsy();
        expect(isRecord(new Set())).toBeFalsy();
        expect(isRecord([])).toBeFalsy();
        expect(isRecord(new WeakMap())).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isRecord('', { throwError: true })).toThrow();
        expect(() => isRecord(null, { throwError: true })).toThrow();
        expect(() => isRecord(new WeakMap(), { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        const unknownRecord: unknown = {
            ...numberRecord,
            ...stringRecord,
        };
        if (
            isRecord<string, number | string>(unknownRecord, {
                keyGuard: isUnion(isNumber, isString),
                valueGuard: isUnion(isNumber, isString),
            })
        ) {
            expectTypeOf(unknownRecord).toMatchTypeOf<
                Record<string, number | string>
            >({
                ...numberRecord,
                ...stringRecord,
            });
        }
    });
});

describe.each([
    [
        'Union',
        isUnion<string | symbol | number>(isString, isNumber, isSymbol),
        ['abc', 1, Symbol()],
        [undefined, true, ...objectValues, ...functionValues],
    ],
    [
        'string',
        isString,
        ['abc'],
        [1, true, null, ...objectValues, ...functionValues],
    ],
    [
        'number',
        isNumber,
        [0, 1],
        ['abc', true, null, ...objectValues, ...functionValues],
    ],
    [
        'boolean',
        isBoolean,
        [true, false],
        ['', 0, null, ...objectValues, ...functionValues],
    ],
    [
        'symbol',
        isSymbol,
        [Symbol()],
        ['', 0, null, true, ...objectValues, ...functionValues],
    ],
    [
        'undefined',
        isUndefined,
        [undefined],
        ['', 0, null, false, ...objectValues, ...functionValues],
    ],
    [
        'object',
        isObject,
        objectValues,
        [null, ...primitiveValues, ...functionValues],
    ],
    [
        'null',
        isNull,
        [null],
        ['', 0, undefined, false, ...objectValues, ...functionValues],
    ],
    [
        'nil',
        isNullOrUndefined,
        [null, undefined],
        ['', 0, false, ...objectValues, ...functionValues],
    ],
    [
        'Error',
        isError,
        errors,
        [
            ...primitiveValues,
            ...objectValues.filter((v) => !(v instanceof Error)),
            ...functionValues,
        ],
    ],
    [
        'Buffer',
        isBuffer,
        [new Buffer(8), new Buffer(16)],
        [
            ...primitiveValues,
            ...objectValues.filter((v) => !(v instanceof Buffer)),
            ...functionValues,
        ],
    ],
    [
        'ArrayBuffer',
        isArrayBuffer,
        [new ArrayBuffer(8), new ArrayBuffer(16)],
        [
            ...primitiveValues,
            ...objectValues.filter((v) => !(v instanceof ArrayBuffer)),
            ...functionValues,
        ],
    ],
    [
        'RegExp',
        isRegExp,
        [new RegExp('test'), /'test'/],
        [...primitiveValues, ...objectValues, ...functionValues],
    ],
    [
        'Date',
        isDate,
        [new Date()],
        [...primitiveValues, ...objectValues, ...functionValues],
    ],
    [
        'Promise',
        isPromise,
        [promise],
        [...objectValues, ...functionValues, ...primitiveValues],
    ],
    [
        'Function',
        isFunction,
        [regularFunction],
        [
            asyncFunction,
            generatorFunction,
            asyncGeneratorFunction,
            ...primitiveValues,
            ...objectValues,
        ],
    ],
    [
        'AsyncFunction',
        isAsyncFunction,
        [asyncFunction],
        [
            regularFunction,
            generatorFunction,
            asyncGeneratorFunction,
            ...primitiveValues,
            ...objectValues,
        ],
    ],
    [
        'GeneratorFunction',
        isGeneratorFunction,
        [generatorFunction],
        [
            regularFunction,
            asyncFunction,
            asyncGeneratorFunction,
            ...primitiveValues,
            ...objectValues,
        ],
    ],
    [
        'AsyncGeneratorFunction',
        isAsyncGeneratorFunction,
        [asyncGeneratorFunction],
        [
            regularFunction,
            asyncFunction,
            generatorFunction,
            ...objectValues,
            ...primitiveValues,
        ],
    ],
    [
        'Generator',
        isGenerator,
        [generator],
        [
            asyncGenerator,
            ...objectValues,
            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'AsyncGenerator',
        isAsyncGenerator,
        [asyncGenerator],
        [generator, ...objectValues, ...functionValues, ...primitiveValues],
    ],
    [
        'Iterable',
        isIterable,
        [...iterableObjects, generator, '', ...typedArrays],
        [
            ...errors,
            {},
            ...functionValues,
            ...primitiveValues.filter((v) => typeof v !== 'string'),
        ],
    ],
    [
        'AsyncIterable',
        isAsyncIterable,
        [asyncGenerator],
        [...errors, ...typedArrays, {}, ...functionValues, ...primitiveValues],
    ],
    [
        'Iterator',
        isIterator,
        [asyncGenerator, generator, new Map().values(), new Set().values()],
        [
            ...errors,
            {},
            ...objectValues,
            ...typedArrays,
            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'TypedArray',
        isTypedArray,
        typedArrays,
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),
            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Int8Array',
        isInt8Array,
        [new Int8Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Uint8Array',
        isUint8Array,
        [new Uint8Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Uint8ClampedArray',
        isUint8ClampedArray,
        [new Uint8ClampedArray()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Int16Array',
        isInt16Array,
        [new Int16Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Uint16Array',
        isUint16Array,
        [new Uint16Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Int32Array',
        isInt32Array,
        [new Int32Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Uint32Array',
        isUint32Array,
        [new Uint32Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Float32Array',
        isFloat32Array,
        [new Float32Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Float64Array',
        isFloat64Array,
        [new Float64Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'BigInt64Array',
        isBigInt64Array,
        [new BigInt64Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'BigUint64Array',
        isBigUint64Array,
        [new BigUint64Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'DataView',
        isDataView,
        [new DataView(new ArrayBuffer(8))],
        [...objectValues, ...primitiveValues, ...functionValues],
    ],
])(
    '%s',
    (_: string, guard: TypeGuard, expected: unknown[], failed: unknown[]) => {
        it.each(expected)(`returns true for expected values`, (value) => {
            expect(guard(value)).toBeTruthy();
        });
        it.each(failed)(`returns false for non-expected values`, (value) => {
            expect(guard(value)).toBeFalsy();
        });
        it.each(failed)('throws error when throwError = true', (value) => {
            expect(() => guard(value, { throwError: true })).toThrow();
        });
    },
);
