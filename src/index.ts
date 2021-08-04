/* eslint-disable @typescript-eslint/ban-types,eslint-comments/disable-enable-pair */
import {
    AsyncFunction,
    BaseTypeGuard,
    TypeValidator,
    TypedAsyncGeneratorFunction,
    TypedGeneratorFunction,
} from './types';

const toObjectString = (value: unknown): string =>
    Object.prototype.toString.call(value);

const createGuard = <T>(validator: TypeValidator, label: string) => {
    return (
        input: unknown,
        { throwError = false }: { throwError?: boolean } = {},
    ): input is T => {
        if (!validator(input)) {
            if (throwError) {
                throw new TypeError(`expected input to be ${label}`);
            }
            return false;
        }
        return true;
    };
};

export function isUnion<T>(...guards: BaseTypeGuard[]) {
    return function (
        input: unknown,
        { throwError = false }: { throwError?: boolean } = {},
    ): input is T {
        const errors: string[] = [];
        for (const guard of guards) {
            try {
                guard(input, { throwError: true });
                return true;
            } catch (error: any) {
                errors.push(Reflect.get(error, 'message'));
            }
        }
        if (throwError) {
            const label = errors
                .map((message) => message.replace('expected input to be ', ''))
                .join(' | ');
            throw new TypeError(`expected input to be ${label}`);
        }
        return false;
    };
}

/**
 * Checks that input is string primitive
 *
 * @param input - value to be tested
 * @param throwError - throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isString("xyz") // true
 *
 * isString(new String("xyz")) // false
 *
 * isString(1) // false
 *
 * isString([], true) // throws TypeError
 * ```
 */
export const isString = createGuard<string>(
    (value) => typeof value === 'string',
    'string',
);

/**
 * Checks that input is number primitive
 *
 * @param input - value to be tested
 * @param throwError -throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isNumber(1) // true
 *
 * isNumber(new Number(1)) // false
 *
 * isNumber("xyz") // false
 *
 * isNumber([], true) // throws TypeError
 * ```
 */
export const isNumber = createGuard<number>(
    (value) => typeof value === 'number',
    'number',
);

/**
 * Checks that input is symbol primitive
 *
 * @param input - value to be tested
 * @param throwError -throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isSymbol(Symbol("My Symbol")) // true
 *
 * isSymbol("My Symbol") // false
 *
 * isSymbol([], true) // throws TypeError
 * ```
 */
export const isSymbol = createGuard<symbol>(
    (value) => typeof value === 'symbol',
    'symbol',
);

/**
 * Checks that input is undefined
 *
 * @param input - value to be tested
 * @param throwError -throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isUndefined(undefined) // true
 *
 * isUndefined(null) // false
 *
 * isUndefined("", true) // throws TypeError
 * ```
 */
export const isUndefined = createGuard<undefined>(
    (value) => typeof value === 'undefined',
    'undefined',
);

/**
 * Checks that input is null
 *
 * @param input - value to be tested
 * @param throwError -throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isNull(null) // true
 *
 * isNull(undefined) // false
 *
 * isNull("", true) // throws TypeError
 * ```
 */
export const isNull = createGuard<null>((value) => value === null, 'null');

/**
 * Checks that input is object
 *
 * @param input - value to be tested
 * @param throwError - throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isObject({}) // true
 *
 * isObject([]) // true
 *
 * isObject(1) // false
 *
 * isObject("xyz", true) // throws TypeError
 * ```
 */
export const isObject = createGuard<object>(
    (value) => typeof value === 'object' && value !== null,
    'object',
);

/**
 * Checks that input is function
 *
 * @typeParam T - function type, defaults to "Function"
 * @param input - value to be tested
 * @param throwError -throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isFunction(() => null) // true
 *
 * isFunction(async () => Promise.resolve(null)) // true
 *
 * isFunction(function* () {}) // true
 *
 * isFunction(async function* () {}) // true
 *
 * isFunction(() => null)) // false
 *
 * isFunction([], true) // throws TypeError
 * ```
 */
export function isFunction<T extends Function = Function>(
    input: unknown,
    { throwError = false }: { throwError?: boolean } = {},
): input is T {
    return createGuard<T>(
        (value) =>
            typeof value === 'function' &&
            toObjectString(value) === '[object Function]',
        'function',
    )(input, { throwError });
}

/**
 * Checks that input is an async function
 *
 * @typeParam T - type of Promise return value, defaults to "any"
 * @param input - value to be tested
 * @param throwError -throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isAsyncFunction(async () => await Promise.resolve()) // true
 *
 * isAsyncFunction(() => null)) // false
 *
 * isAsyncFunction(() => null, true) // throws TypeError
 * ```
 */
export function isAsyncFunction<T = any>(
    input: unknown,
    { throwError = false }: { throwError?: boolean } = {},
): input is AsyncFunction<T> {
    return createGuard<AsyncFunction<T>>((value) => {
        const { constructor: AsyncFunctionConstructor } = Object.getPrototypeOf(
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            async () => {},
        ) as { constructor: FunctionConstructor };
        return (
            typeof value === 'function' &&
            (toObjectString(value) === '[object AsyncFunction]' ||
                value instanceof AsyncFunctionConstructor)
        );
    }, 'async function')(input, { throwError });
}

/**
 * Checks that input is promise
 *
 * @typeParam T - type of promise value, defaults to "any"
 * @param input - value to be tested
 * @param throwError - throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isPromise<string>(Promise.resolve("hi")) // true
 *
 * isPromise<string>({}) // false
 *
 * isPromise<string>([], true) // throws type error
 * ```
 */
export function isPromise<T = any>(
    input: unknown,
    { throwError = false }: { throwError?: boolean } = {},
): input is Promise<T> {
    return createGuard<Promise<T>>(
        (value) =>
            value instanceof Promise ||
            (isObject(value) && isFunction(Reflect.get(value, 'then'))),
        'promise',
    )(input, { throwError });
}

/**
 * Checks that input is generator function
 *
 * @typeParam Y - type of yield value, defaults to unknown
 * @typeParam R - type of return value, defaults to unknown
 * @typeParam N - type of .next() args, defaults to unknown
 * @param input - value to be tested
 * @param throwError -throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isGeneratorFunction(function * () {}) // true
 *
 * isGeneratorFunction(async function * () {}) // false
 *
 * isGeneratorFunction(() => null, true) // throws TypeError
 * ```
 */
export function isGeneratorFunction<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: { throwError?: boolean } = {},
): input is TypedGeneratorFunction<Y, R, N> {
    return createGuard<TypedGeneratorFunction<Y, R, N>>((value) => {
        const { constructor: GeneratorFunctionConstructor } =
            Object.getPrototypeOf(
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                function* () {},
            ) as { constructor: GeneratorFunction };
        return (
            typeof value === 'function' &&
            (toObjectString(value) === '[object GeneratorFunction]' ||
                value instanceof GeneratorFunctionConstructor)
        );
    }, 'generator-function')(input, { throwError });
}

/**
 * Checks that input is async generator function
 *
 * @typeParam Y - type of yield value, defaults to unknown
 * @typeParam R - type of return value, defaults to unknown
 * @typeParam N - type of .next() args, defaults to unknown
 * @param input - value to be tested
 * @param throwError -throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isAsyncGeneratorFunction(async function * () {}) // true
 *
 * isAsyncGeneratorFunction(function * () {}) // false
 *
 * isAsyncGeneratorFunction(() => null, true) // throws TypeError
 * ```
 */
export function isAsyncGeneratorFunction<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: { throwError?: boolean } = {},
): input is TypedAsyncGeneratorFunction<Y, R, N> {
    return createGuard<TypedAsyncGeneratorFunction<Y, R, N>>((value) => {
        const { constructor: AsyncGeneratorFunctionConstructor } =
            Object.getPrototypeOf(
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                async function* () {},
            ) as { constructor: AsyncGeneratorFunction };
        return (
            typeof value === 'function' &&
            (toObjectString(value) === '[object AsyncGeneratorFunction]' ||
                value instanceof AsyncGeneratorFunctionConstructor)
        );
    }, 'async-generator-function')(input, { throwError });
}

/**
 * Checks that input is generator
 *
 * @typeParam Y - type of yield value, defaults to unknown
 * @typeParam R - type of return value, defaults to unknown
 * @typeParam N - type of .next() args, defaults to unknown
 * @param input - value to be tested
 * @param throwError -throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isGenerator<boolean>((function * () { yield true })()) // true
 *
 * isGenerator((async function * () { yield true })()) // false
 *
 * isGenerator({}, true) // throws TypeError
 * ```
 */
export function isGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: { throwError?: boolean } = {},
): input is Generator<Y, R, N> {
    return createGuard<Generator<Y, R, N>>(
        (value) =>
            isObject(value) && toObjectString(value) === '[object Generator]',
        'generator',
    )(input, { throwError });
}

/**
 * Checks that input is async generator
 *
 * @typeParam Y - type of yield value, defaults to unknown
 * @typeParam R - type of return value, defaults to unknown
 * @typeParam N - type of .next() args, defaults to unknown
 * @param input - value to be tested
 * @param throwError -throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isGenerator<boolean>((async function * () { yield Promise.resolve(true) })()) // true
 *
 * isGenerator((function * () { yield true })()) // false
 *
 * isGenerator({}, true) // throws TypeError
 * ```
 */
export function isAsyncGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: { throwError?: boolean } = {},
): input is AsyncGenerator<Y, R, N> {
    return createGuard<AsyncGenerator<Y, R, N>>(
        (value) =>
            isObject(value) &&
            toObjectString(value) === '[object AsyncGenerator]',
        'async-generator',
    )(input, { throwError });
}

/**
 * Checks that input is array
 *
 * @typeParam T - type of array value
 * @param input - value to be tested
 * @param valueGuard - guard function to validate array is of type T
 * @param throwError - throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isArray<string>(["xyz"], isString) // true
 *
 * isArray<string>(["xyz", 1], isString) // false
 *
 * isArray<string | number>(["xyz", 1], (value) => isString(value) || isNumber(value)) // true
 *
 * isArray<string>(["xyz", 1], isString, true) // throws type error
 * ```
 */
export function isArray(
    input: unknown,
    options?: {
        valueGuard: undefined;
        throwError?: boolean;
    },
): input is unknown[];
export function isArray<T>(
    input: unknown,
    options?: {
        valueGuard: TypeValidator;
        throwError?: boolean;
    },
): input is T[];
export function isArray<T>(
    input: unknown,
    {
        throwError = false,
        valueGuard,
    }: { throwError?: boolean; valueGuard?: TypeValidator } = {},
): input is T[] {
    return createGuard<T[]>(
        (value) =>
            Array.isArray(value) && (!valueGuard || value.every(valueGuard)),
        'array',
    )(input, { throwError });
}

/**
 * Checks that input is set
 *
 * @typeParam T - type of set value
 * @param input - value to be tested
 * @param valueGuard - guard function to validate set is of type T
 * @param throwError - throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * isSet<string>(new Set(["xyz"]), isString) // true
 *
 * isSet<string>(new Set(["xyz", 1]), isString) // false
 *
 * isSet<string | number>(new Set(["xyz", 1]), (value) => isString(value) || isNumber(value)) // true
 *
 * isSet<string>(new Set(["xyz", 1]), isString, true) // throws type error
 * ```
 */
export function isSet(
    input: unknown,
    options?: {
        valueGuard: undefined;
        throwError?: boolean;
    },
): input is Set<unknown>;
export function isSet<T>(
    input: unknown,
    options?: {
        valueGuard: TypeValidator;
        throwError?: boolean;
    },
): input is Set<T>;
export function isSet<T>(
    input: unknown,
    {
        throwError = false,
        valueGuard,
    }: { throwError?: boolean; valueGuard?: TypeValidator } = {},
): input is Set<T> {
    return createGuard<Set<T>>(
        (value) =>
            isObject(value) &&
            (toObjectString(value) === '[object Set]' ||
                value instanceof Set) &&
            (!valueGuard || [...(value as Set<any>)].every(valueGuard)),
        'set',
    )(input, { throwError });
}

/**
 * Checks that input is map
 *
 * @typeParam T - type of map value
 * @param input - value to be tested
 * @param keyGuard - guard function to validate map keys are of type T
 * @param valueGuard - guard function to validate map values are of type T
 * @param throwError - throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * ```
 */
export function isMap<K, V>(
    input: unknown,
    options?: {
        throwError?: boolean;
        valueGuard: undefined;
        keyGuard: undefined;
    },
): input is Map<unknown, unknown>;
export function isMap<K, V>(
    input: unknown,
    options?: {
        throwError?: boolean;
        valueGuard: undefined;
        keyGuard: TypeValidator;
    },
): input is Map<K, unknown>;
export function isMap<K, V>(
    input: unknown,
    options?: {
        throwError?: boolean;
        valueGuard: TypeValidator;
        keyGuard: undefined;
    },
): input is Map<unknown, V>;
export function isMap<K, V>(
    input: unknown,
    options?: {
        throwError?: boolean;
        valueGuard: TypeValidator;
        keyGuard: TypeValidator;
    },
): input is Map<K, V>;
export function isMap<K, V>(
    input: unknown,
    {
        throwError = false,
        valueGuard,
        keyGuard,
    }: {
        throwError?: boolean;
        valueGuard?: TypeValidator;
        keyGuard?: TypeValidator;
    } = {},
): input is Map<K, V> {
    return createGuard<Map<K, V>>((value) => {
        if (
            value instanceof Map ||
            (isObject(value) && toObjectString(value) === '[object Map]')
        ) {
            const valuesValid =
                !valueGuard ||
                [...(value as Map<any, any>).values()].every(valueGuard);
            const keysValid =
                !keyGuard ||
                [...(value as Map<any, any>).keys()].every(keyGuard);
            return valuesValid && keysValid;
        }
        return false;
    }, 'map')(input, { throwError });
}
