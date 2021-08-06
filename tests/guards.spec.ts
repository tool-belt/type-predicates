import {
    AsyncFunction,
    TypeGuard,
    TypedAsyncGeneratorFunction,
    TypedGeneratorFunction,
    createTypeGuard,
    isArray,
    isAsyncFunction,
    isAsyncGenerator,
    isAsyncGeneratorFunction,
    isAsyncIterable,
    isBigInt64Array,
    isBigUint64Array,
    isBoolean,
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
    isNumber,
    isObject,
    isPromise,
    isRecord,
    isRegExp,
    isSet,
    isString,
    isSymbol,
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

describe('createTypeGuard', () => {
    it('creates a type-guard with the correct label', () => {
        const customTypeGuard = createTypeGuard(
            (value) => value instanceof CustomClass,
            CustomClass.name,
        );
        expect(customTypeGuard(new CustomClass())).toBeTruthy();
        expect(() => customTypeGuard([], { throwError: true })).toThrow(
            `expected input to be ${CustomClass.name}`,
        );
    });
    it('creates a type-guard without error message when no label is supplied', () => {
        const customTypeGuard = createTypeGuard(
            (value) => value instanceof CustomClass,
        );
        expect(() => customTypeGuard([], { throwError: true })).toThrow('');
    });
});

describe('isUnion', () => {
    const unionGuard = isUnion<string | symbol | number>(
        isString,
        isNumber,
        isSymbol,
    );
    it('returns true for union values', () => {
        expect(unionGuard('')).toBeTruthy();
        expect(unionGuard(1)).toBeTruthy();
        expect(unionGuard(Symbol())).toBeTruthy();
    });
    it('returns false for non-union values', () => {
        expect(unionGuard(undefined)).toBeFalsy();
        expect(unionGuard(true)).toBeFalsy();
        expect(unionGuard([])).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => unionGuard(null, { throwError: true })).toThrow();
        expect(() => unionGuard(true, { throwError: true })).toThrow();
        expect(() => unionGuard([], { throwError: true })).toThrow();
    });
});

describe('isString', () => {
    it('returns true for string values', () => {
        expect(isString('')).toBeTruthy();
        expect(isString(' ')).toBeTruthy();
        expect(isString('123')).toBeTruthy();
    });
    it('returns false for non-string values', () => {
        expect(isString(1)).toBeFalsy();
        expect(isString(true)).toBeFalsy();
        expect(isString([])).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isString(1, { throwError: true })).toThrow();
        expect(() => isString(true, { throwError: true })).toThrow();
        expect(() => isString([], { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isString).guards.toBeString();
    });
});

describe('isNumber', () => {
    it('returns true for number values', () => {
        expect(isNumber(1)).toBeTruthy();
        expect(isNumber(0)).toBeTruthy();
        expect(isNumber(NaN)).toBeTruthy();
    });
    it('returns false for non-number values', () => {
        expect(isNumber('xyz')).toBeFalsy();
        expect(isNumber(true)).toBeFalsy();
        expect(isNumber([])).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isNumber('xyz', { throwError: true })).toThrow();
        expect(() => isNumber(true, { throwError: true })).toThrow();
        expect(() => isNumber([], { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isNumber).guards.toBeNumber();
    });
});

describe('isBoolean', () => {
    it('returns true for number values', () => {
        expect(isBoolean(true)).toBeTruthy();
        expect(isBoolean(false)).toBeTruthy();
    });
    it('returns false for non-number values', () => {
        expect(isBoolean(null)).toBeFalsy();
        expect(isBoolean(1)).toBeFalsy();
        expect(isBoolean([])).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isBoolean(null, { throwError: true })).toThrow();
        expect(() => isBoolean(undefined, { throwError: true })).toThrow();
        expect(() => isBoolean([], { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isBoolean).guards.toBeBoolean();
    });
});

describe('isSymbol', () => {
    it('returns true for symbol values', () => {
        expect(isSymbol(Symbol())).toBeTruthy();
    });
    it('returns false for non-symbol values', () => {
        expect(isSymbol('xyz')).toBeFalsy();
        expect(isSymbol(true)).toBeFalsy();
        expect(isSymbol([])).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isSymbol('xyz', { throwError: true })).toThrow();
        expect(() => isSymbol(true, { throwError: true })).toThrow();
        expect(() => isSymbol([], { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isSymbol).guards.toBeSymbol();
    });
});

describe('isUndefined', () => {
    it('returns true for undefined values', () => {
        expect(isUndefined(undefined)).toBeTruthy();
    });
    it('returns false for non-undefined values', () => {
        expect(isUndefined(null)).toBeFalsy();
        expect(isUndefined(0)).toBeFalsy();
        expect(isUndefined('')).toBeFalsy();
        expect(isUndefined(false)).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isUndefined('xyz', { throwError: true })).toThrow();
        expect(() => isUndefined(true, { throwError: true })).toThrow();
        expect(() => isUndefined([], { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isUndefined).guards.toBeUndefined();
    });
});

describe('isNull', () => {
    it('returns true for null values', () => {
        expect(isNull(null)).toBeTruthy();
    });
    it('returns false for non-null values', () => {
        expect(isNull(undefined)).toBeFalsy();
        expect(isNull(0)).toBeFalsy();
        expect(isNull('')).toBeFalsy();
        expect(isNull(false)).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isNull('xyz', { throwError: true })).toThrow();
        expect(() => isNull(true, { throwError: true })).toThrow();
        expect(() => isNull([], { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isNull).guards.toBeNull();
    });
});

describe('isRegExp', () => {
    it('returns true for regex values', () => {
        expect(isRegExp(new RegExp('test'))).toBeTruthy();
        expect(isRegExp(/'test'/)).toBeTruthy();
    });
    it('returns false for non-regex values', () => {
        expect(isRegExp({})).toBeFalsy();
        expect(isRegExp(0)).toBeFalsy();
        expect(isRegExp('string')).toBeFalsy();
        expect(isRegExp(false)).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isRegExp('xyz', { throwError: true })).toThrow();
        expect(() => isRegExp(true, { throwError: true })).toThrow();
        expect(() => isRegExp([], { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isRegExp).guards.toMatchTypeOf<RegExp>(new RegExp(''));
    });
});

describe('isDate', () => {
    it('returns true for date values', () => {
        expect(isDate(new Date())).toBeTruthy();
    });
    it('returns false for non-date values', () => {
        expect(isDate({})).toBeFalsy();
        expect(isDate(0)).toBeFalsy();
        expect(isDate('string')).toBeFalsy();
        expect(isDate(false)).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isDate('xyz', { throwError: true })).toThrow();
        expect(() => isDate(true, { throwError: true })).toThrow();
        expect(() => isDate([], { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isDate).guards.toMatchTypeOf<Date>(new Date());
    });
});

describe('isObject', () => {
    it('returns true for object values', () => {
        expect(isObject({})).toBeTruthy();
        expect(isObject([])).toBeTruthy();
        expect(isObject(new Map())).toBeTruthy();
        expect(isObject(new WeakMap())).toBeTruthy();
        expect(isObject(new Set())).toBeTruthy();
        expect(isObject(new WeakSet())).toBeTruthy();
        expect(isObject(new Number())).toBeTruthy();
        expect(isObject(new String())).toBeTruthy();
        expect(isObject(new Boolean())).toBeTruthy();
    });
    it('returns false for non-object values', () => {
        expect(isObject(null)).toBeFalsy();
        expect(isObject(0)).toBeFalsy();
        expect(isObject('')).toBeFalsy();
        expect(isObject(false)).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isObject('xyz', { throwError: true })).toThrow();
        expect(() => isObject(true, { throwError: true })).toThrow();
        expect(() => isObject(1, { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isObject).guards.toBeObject();
    });
});

describe('isError', () => {
    it('returns true for error values', () => {
        expect(isError(new Error())).toBeTruthy();
        expect(isError(new TypeError())).toBeTruthy();
        expect(isError(new RangeError())).toBeTruthy();
        expect(isError(new SyntaxError())).toBeTruthy();
        expect(isError(new URIError())).toBeTruthy();
        expect(isError(new ReferenceError())).toBeTruthy();
        expect(isError(new EvalError())).toBeTruthy();
        expect(isError(new AggregateError([new Error()]))).toBeTruthy();
    });
    it('returns false for non-error values', () => {
        expect(isError({})).toBeFalsy();
        expect(isError([])).toBeFalsy();
        expect(isError('')).toBeFalsy();
        expect(isError(false)).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isError({}, { throwError: true })).toThrow();
        expect(() => isError(true, { throwError: true })).toThrow();
        expect(() => isError([], { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isError).guards.toMatchTypeOf<Error>(new Error());
    });
});

describe('isPromise', () => {
    it('returns true for promise values', () => {
        expect(isPromise(new Promise((resolve) => resolve(null)))).toBeTruthy();
    });
    it('returns false for non-promise values', () => {
        expect(isPromise(generator)).toBeFalsy();
        expect(isPromise(asyncFunction)).toBeFalsy();
        expect(isPromise([])).toBeFalsy();
        expect(isPromise({})).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() =>
            isPromise(asyncGeneratorFunction, { throwError: true }),
        ).toThrow();
        expect(() => isPromise(generator, { throwError: true })).toThrow();
        expect(() => isPromise({}, { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isPromise).guards.toMatchTypeOf<Promise<any>>(
            Promise.resolve(null),
        );
    });
});

describe('isFunction', () => {
    it('returns true for function values', () => {
        expect(isFunction(regularFunction)).toBeTruthy();
    });
    it('returns false for non-function values', () => {
        expect(isFunction(asyncFunction)).toBeFalsy();
        expect(isFunction(generatorFunction)).toBeFalsy();
        expect(isFunction(asyncGeneratorFunction)).toBeFalsy();
        expect(isFunction({})).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isFunction(asyncFunction, { throwError: true })).toThrow();
        expect(() =>
            isFunction(generatorFunction, { throwError: true }),
        ).toThrow();
        expect(() =>
            isFunction(asyncGeneratorFunction, { throwError: true }),
        ).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isFunction).guards.toMatchTypeOf<Function>(
            regularFunction,
        );
        expectTypeOf(isFunction).not.guards.toMatchTypeOf<AsyncFunction>(
            asyncFunction,
        );
    });
});

describe('isAsyncFunction', () => {
    it('returns true for async function values', () => {
        expect(isAsyncFunction(asyncFunction)).toBeTruthy();
    });
    it('returns false for non-async function values', () => {
        expect(isAsyncFunction(regularFunction)).toBeFalsy();
        expect(isAsyncFunction(generatorFunction)).toBeFalsy();
        expect(isAsyncFunction(asyncGeneratorFunction)).toBeFalsy();
        expect(isAsyncFunction({})).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() =>
            isAsyncFunction(regularFunction, { throwError: true }),
        ).toThrow();
        expect(() =>
            isAsyncFunction(generatorFunction, { throwError: true }),
        ).toThrow();
        expect(() =>
            isAsyncFunction(asyncGeneratorFunction, { throwError: true }),
        ).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isAsyncFunction).guards.toMatchTypeOf<AsyncFunction>(
            asyncFunction,
        );
    });
});

describe('isGeneratorFunction', () => {
    it('returns true for generator function values', () => {
        expect(isGeneratorFunction(generatorFunction)).toBeTruthy();
    });
    it('returns false for non-generator function values', () => {
        expect(isGeneratorFunction(regularFunction)).toBeFalsy();
        expect(isGeneratorFunction(asyncFunction)).toBeFalsy();
        expect(isGeneratorFunction(asyncGeneratorFunction)).toBeFalsy();
        expect(isGeneratorFunction({})).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() =>
            isGeneratorFunction(regularFunction, { throwError: true }),
        ).toThrow();
        expect(() =>
            isGeneratorFunction(asyncFunction, { throwError: true }),
        ).toThrow();
        expect(() =>
            isGeneratorFunction(asyncGeneratorFunction, { throwError: true }),
        ).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isGeneratorFunction).guards.toMatchTypeOf<
            TypedGeneratorFunction<any, any, any>
        >(generatorFunction);
    });
});

describe('isAsyncGeneratorFunction', () => {
    it('returns true for generator function values', () => {
        expect(isAsyncGeneratorFunction(asyncGeneratorFunction)).toBeTruthy();
    });
    it('returns false for non-generator function values', () => {
        expect(isAsyncGeneratorFunction(regularFunction)).toBeFalsy();
        expect(isAsyncGeneratorFunction(asyncFunction)).toBeFalsy();
        expect(isAsyncGeneratorFunction(generatorFunction)).toBeFalsy();
        expect(isAsyncGeneratorFunction({})).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() =>
            isAsyncGeneratorFunction(regularFunction, { throwError: true }),
        ).toThrow();
        expect(() =>
            isAsyncGeneratorFunction(asyncFunction, { throwError: true }),
        ).toThrow();
        expect(() =>
            isAsyncGeneratorFunction(generatorFunction, { throwError: true }),
        ).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isAsyncGeneratorFunction).guards.toMatchTypeOf<
            TypedAsyncGeneratorFunction<any, any, any>
        >(asyncGeneratorFunction);
    });
});

describe('isGenerator', () => {
    it('returns true for generator values', () => {
        expect(isGenerator(generator)).toBeTruthy();
    });
    it('returns false for non-generator values', () => {
        expect(isGenerator(asyncGenerator)).toBeFalsy();
        expect(isGenerator({})).toBeFalsy();
        expect(isGenerator(generatorFunction)).toBeFalsy();
        expect(isGenerator([])).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() =>
            isGenerator(asyncGenerator, { throwError: true }),
        ).toThrow();
        expect(() => isGenerator({}, { throwError: true })).toThrow();
        expect(() =>
            isGenerator(generatorFunction, { throwError: true }),
        ).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isGenerator).guards.toMatchTypeOf<
            Generator<any, any, any>
        >(generator);
    });
});

describe('isAsyncGenerator', () => {
    it('returns true for async generator values', () => {
        expect(isAsyncGenerator(asyncGenerator)).toBeTruthy();
    });
    it('returns false for non-async generator values', () => {
        expect(isAsyncGenerator(generator)).toBeFalsy();
        expect(isAsyncGenerator(asyncFunction)).toBeFalsy();
        expect(isAsyncGenerator(asyncGeneratorFunction)).toBeFalsy();
        expect(isAsyncGenerator({})).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() =>
            isAsyncGenerator(asyncGeneratorFunction, { throwError: true }),
        ).toThrow();
        expect(() =>
            isAsyncGenerator(generator, { throwError: true }),
        ).toThrow();
        expect(() => isAsyncGenerator({}, { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isAsyncGenerator).guards.toMatchTypeOf<
            AsyncGenerator<any, any, any>
        >(asyncGenerator);
    });
});

describe('isIterable', () => {
    it('returns true for iterable values', () => {
        expect(isIterable(generator)).toBeTruthy();
        expect(isIterable(new String())).toBeTruthy();
        expect(isIterable(new Set())).toBeTruthy();
        expect(isIterable(new Map())).toBeTruthy();
        expect(isIterable([])).toBeTruthy();
        expect(isIterable('')).toBeTruthy();
    });
    it('returns false for non-iterable values', () => {
        expect(isIterable(1)).toBeFalsy();
        expect(isIterable(undefined)).toBeFalsy();
        expect(isIterable(true)).toBeFalsy();
        expect(isIterable(null)).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isIterable(1, { throwError: true })).toThrow();
        expect(() => isIterable(undefined, { throwError: true })).toThrow();
        expect(() => isIterable(null, { throwError: true })).toThrow();
    });
});

describe('isAsyncIterable', () => {
    it('returns true for iterable values', () => {
        expect(isAsyncIterable(asyncGenerator)).toBeTruthy();
    });
    it('returns false for non-iterable values', () => {
        expect(isAsyncIterable(generator)).toBeFalsy();
        expect(isAsyncIterable(new String())).toBeFalsy();
        expect(isAsyncIterable(new Set())).toBeFalsy();
        expect(isAsyncIterable(new Map())).toBeFalsy();
        expect(isAsyncIterable([])).toBeFalsy();
        expect(isAsyncIterable({})).toBeFalsy();
        expect(isAsyncIterable('')).toBeFalsy();
        expect(isAsyncIterable(1)).toBeFalsy();
        expect(isAsyncIterable(undefined)).toBeFalsy();
        expect(isAsyncIterable(true)).toBeFalsy();
        expect(isAsyncIterable(null)).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isAsyncIterable(1, { throwError: true })).toThrow();
        expect(() =>
            isAsyncIterable(undefined, { throwError: true }),
        ).toThrow();
        expect(() => isAsyncIterable(null, { throwError: true })).toThrow();
    });
});

describe('isIterator', () => {
    it('returns true for iterable values', () => {
        expect(isIterator(asyncGenerator)).toBeTruthy();
        expect(isIterator(generator)).toBeTruthy();
        expect(isIterator(new Set().values())).toBeTruthy();
        expect(isIterator(new Map().values())).toBeTruthy();
    });
    it('returns false for non-iterable values', () => {
        expect(isIterator(new String())).toBeFalsy();
        expect(isIterator([])).toBeFalsy();
        expect(isIterator({})).toBeFalsy();
        expect(isIterator('')).toBeFalsy();
        expect(isIterator(1)).toBeFalsy();
        expect(isIterator(undefined)).toBeFalsy();
        expect(isIterator(true)).toBeFalsy();
        expect(isIterator(null)).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isIterator(1, { throwError: true })).toThrow();
        expect(() => isIterator(undefined, { throwError: true })).toThrow();
        expect(() => isIterator(null, { throwError: true })).toThrow();
    });
});

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
    ['Int8Array', isInt8Array, Int8Array],
    ['Uint8Array', isUint8Array, Uint8Array],
    ['Uint8ClampedArray', isUint8ClampedArray, Uint8ClampedArray],
    ['Int16Array', isInt16Array, Int16Array],
    ['Uint16Array', isUint16Array, Uint16Array],
    ['Int32Array', isInt32Array, Int32Array],
    ['Uint32Array', isUint32Array, Uint32Array],
    ['Float32Array', isFloat32Array, Float32Array],
    ['Float64Array', isFloat64Array, Float64Array],
    ['BigInt64Array', isBigInt64Array, BigInt64Array],
    ['BigUint64Array', isBigUint64Array, BigUint64Array],
])('%s', (label: string, guard: TypeGuard, cls: any) => {
    it(`returns true for ${label} values`, () => {
        expect(guard(new cls())).toBeTruthy();
    });
    it(`returns false for non-${label} values`, () => {
        expect(guard({})).toBeFalsy();
        expect(guard([])).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => guard([], { throwError: true })).toThrow();
    });
});
