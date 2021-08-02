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
    isFunction,
    isGenerator,
    isGeneratorFunction,
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
        expect(() => isString(1, true)).toThrow();
        expect(() => isString(true, true)).toThrow();
        expect(() => isString([], true)).toThrow();
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
        expect(() => isNumber('xyz', true)).toThrow();
        expect(() => isNumber(true, true)).toThrow();
        expect(() => isNumber([], true)).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isNumber).guards.toBeNumber();
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
        expect(() => isSymbol('xyz', true)).toThrow();
        expect(() => isSymbol(true, true)).toThrow();
        expect(() => isSymbol([], true)).toThrow();
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
        expect(() => isUndefined('xyz', true)).toThrow();
        expect(() => isUndefined(true, true)).toThrow();
        expect(() => isUndefined([], true)).toThrow();
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
        expect(() => isNull('xyz', true)).toThrow();
        expect(() => isNull(true, true)).toThrow();
        expect(() => isNull([], true)).toThrow();
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
        expect(() => isObject('xyz', true)).toThrow();
        expect(() => isObject(true, true)).toThrow();
        expect(() => isObject(1, true)).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isObject).guards.toBeObject();
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
        expect(() => isFunction(asyncFunction, true)).toThrow();
        expect(() => isFunction(generatorFunction, true)).toThrow();
        expect(() => isFunction(asyncGeneratorFunction, true)).toThrow();
    });
    it('guards type correctly', () => {
        // eslint-disable-next-line @typescript-eslint/ban-types
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
        expect(() => isAsyncFunction(regularFunction, true)).toThrow();
        expect(() => isAsyncFunction(generatorFunction, true)).toThrow();
        expect(() => isAsyncFunction(asyncGeneratorFunction, true)).toThrow();
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
        expect(() => isGeneratorFunction(regularFunction, true)).toThrow();
        expect(() => isGeneratorFunction(asyncFunction, true)).toThrow();
        expect(() =>
            isGeneratorFunction(asyncGeneratorFunction, true),
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
        expect(() => isAsyncGeneratorFunction(regularFunction, true)).toThrow();
        expect(() => isAsyncGeneratorFunction(asyncFunction, true)).toThrow();
        expect(() =>
            isAsyncGeneratorFunction(generatorFunction, true),
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
        expect(() => isGenerator(asyncGenerator, true)).toThrow();
        expect(() => isGenerator({}, true)).toThrow();
        expect(() => isGenerator(generatorFunction, true)).toThrow();
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
        expect(() => isAsyncGenerator(asyncGeneratorFunction, true)).toThrow();
        expect(() => isAsyncGenerator(generator, true)).toThrow();
        expect(() => isAsyncGenerator({}, true)).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isAsyncGenerator).guards.toMatchTypeOf<
            AsyncGenerator<any, any, any>
        >(asyncGenerator);
    });
});

describe('isArray', () => {
    it('returns true for positively tested array values', () => {
        expect(isArray<string>(stringArray, isString)).toBeTruthy();
        expect(isArray<number>(numberArray, isNumber)).toBeTruthy();
        expect(isArray<symbol>(symbolArray, isSymbol)).toBeTruthy();
        expect(isArray<object>(recordArray, isObject)).toBeTruthy();
        expect(
            isArray<string | number>(
                [...stringArray, ...numberArray],
                isUnion<string | number>(isString, isNumber),
            ),
        ).toBeTruthy();
    });
    it('returns false for negatively tested array values', () => {
        expect(isArray<string>(stringArray, isNumber)).toBeFalsy();
        expect(isArray<number>(numberArray, isString)).toBeFalsy();
        expect(isArray<symbol>(symbolArray, isObject)).toBeFalsy();
        expect(isArray<object>(recordArray, isSymbol)).toBeFalsy();
        expect(
            isArray<string | number>(
                [...symbolArray, ...recordArray],
                isUnion<string | number>(isString, isNumber),
            ),
        ).toBeFalsy();
    });
    it('returns false for non-array values', () => {
        expect(isArray<string>('', isString)).toBeFalsy();
        expect(isArray<string>(null, isString)).toBeFalsy();
        expect(isArray<string>(123, isString)).toBeFalsy();
        expect(isArray<string>(Symbol(), isString)).toBeFalsy();
        expect(isArray<string>({}, isString)).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isArray<string>('', isString, true)).toThrow();
        expect(() => isArray<string>(null, isString, true)).toThrow();
        expect(() => isArray<string>(123, isString, true)).toThrow();
    });
    it('guards type correctly', () => {
        const unknownArray: unknown = [...stringArray];
        if (isArray<string>(unknownArray, isString)) {
            expectTypeOf(unknownArray).toMatchTypeOf(stringArray);
        }
    });
});

describe('isSet', () => {
    it('returns true for positively tested set values', () => {
        expect(isSet<string>(new Set(stringArray), isString)).toBeTruthy();
        expect(isSet<number>(new Set(numberArray), isNumber)).toBeTruthy();
        expect(isSet<symbol>(new Set(symbolArray), isSymbol)).toBeTruthy();
        expect(isSet<object>(new Set(recordArray), isObject)).toBeTruthy();
        expect(
            isSet<string | number>(
                new Set([...stringArray, ...numberArray]),
                isUnion<string | number>(isString, isNumber),
            ),
        ).toBeTruthy();
    });
    it('returns false for negatively tested set values', () => {
        expect(isSet<string>(new Set(stringArray), isNumber)).toBeFalsy();
        expect(isSet<number>(new Set(numberArray), isString)).toBeFalsy();
        expect(isSet<symbol>(new Set(symbolArray), isObject)).toBeFalsy();
        expect(isSet<object>(new Set(recordArray), isSymbol)).toBeFalsy();
        expect(
            isSet<string | number>(
                new Set([...symbolArray, ...recordArray]),
                isUnion<string | number>(isString, isNumber),
            ),
        ).toBeFalsy();
    });
    it('returns false for non-set values', () => {
        expect(isSet<string>('', isString)).toBeFalsy();
        expect(isSet<string>(null, isString)).toBeFalsy();
        expect(isSet<string>(123, isString)).toBeFalsy();
        expect(isSet<string>(Symbol(), isString)).toBeFalsy();
        expect(isSet<string>({}, isString)).toBeFalsy();
    });
    it('throws error when throwError = true', () => {
        expect(() => isSet<string>('', isString, true)).toThrow();
        expect(() => isSet<string>(null, isString, true)).toThrow();
        expect(() => isSet<string>(123, isString, true)).toThrow();
    });
    it('guards type correctly', () => {
        const unknownSet: unknown = new Set([...stringArray]);
        if (isSet<string>(unknownSet, isString)) {
            expectTypeOf(unknownSet).toMatchTypeOf(
                new Set<string>([...stringArray]),
            );
        }
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
        expect(() => isPromise(asyncGeneratorFunction, true)).toThrow();
        expect(() => isPromise(generator, true)).toThrow();
        expect(() => isPromise({}, true)).toThrow();
    });
    it('guards type correctly', () => {
        expectTypeOf(isPromise).guards.toMatchTypeOf<Promise<any>>(
            Promise.resolve(null),
        );
    });
});
