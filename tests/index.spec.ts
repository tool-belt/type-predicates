/* eslint-disable @typescript-eslint/ban-types,eslint-comments/disable-enable-pair */
import {
    AsyncFunction,
    TypedAsyncGeneratorFunction,
    TypedGeneratorFunction,
} from '../src/types';
import { expectTypeOf } from 'expect-type';
import {
    isArray,
    isAsyncFunction,
    isAsyncGenerator,
    isAsyncGeneratorFunction,
    isBoolean,
    isFunction,
    isGenerator,
    isGeneratorFunction,
    isMap,
    isNull,
    isNumber,
    isObject,
    isPromise,
    isSet,
    isString,
    isSymbol,
    isUndefined,
    isUnion,
} from '../src';

class CustomClass {}
console.log(CustomClass, Object.prototype.toString.call(CustomClass));
const asyncFunction = async () => Promise.resolve(null);
const regularFunction = () => null;
const generatorFunction = function* () {
    yield true;
};
const asyncGeneratorFunction = async function* () {
    yield await Promise.resolve(true);
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
    it('returns false for negatively tested map values', () => {});
    it('returns false for non-map values', () => {});
    it('throws error when throwError = true', () => {
        expect(() => isMap('', { throwError: true })).toThrow();
        expect(() => isMap(null, { throwError: true })).toThrow();
        expect(() => isMap(123, { throwError: true })).toThrow();
    });
    it('guards type correctly', () => {});
});
