/* eslint-disable @typescript-eslint/ban-types,eslint-comments/disable-enable-pair */
import {
    AsyncFunction,
    BaseTypeGuard,
    BaseTypeGuardOptions,
    RecordKeyTypes,
    TypeValidator,
    TypedAsyncGeneratorFunction,
    TypedGeneratorFunction,
} from './types';

const toObjectString = (value: unknown): string =>
    Object.prototype.toString.call(value);

const createGuard = <T>(validator: TypeValidator, label: string) => {
    return (
        input: unknown,
        { throwError = false }: BaseTypeGuardOptions = {},
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
        { throwError = false }: BaseTypeGuardOptions = {},
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
 * @param options - throwError
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true
 * isString("xyz")
 *
 * // false, because String constructor returns object
 * isString(new String("xyz"))
 *
 * // false
 * isString(1)
 *
 * // throws TypeError
 * isString([], { throwError: true })
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
 * @param options - throwError
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 *  // true
 * isNumber(1)
 *
 * // false, because Number constructor returns object
 * isNumber(new Number(1))
 *
 * // false
 * isNumber("xyz")
 *
 * // throws TypeError
 * isNumber([], { throwError: true })
 * ```
 */
export const isNumber = createGuard<number>(
    (value) => typeof value === 'number',
    'number',
);

/**
 * Checks that input is boolean primitive
 *
 * @param input - value to be tested
 * @param options - throwError
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 *  // true
 * isBoolean(false)
 *
 * // false
 * isBoolean(1)
 *
 * // false
 * isBoolean("xyz")
 *
 * // throws TypeError
 * isBoolean([], { throwError: true })
 * ```
 */
export const isBoolean = createGuard<boolean>(
    (value) => typeof value === 'boolean',
    'boolean',
);

/**
 * Checks that input is symbol primitive
 *
 * @param input - value to be tested
 * @param options - throwError
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true
 * isSymbol(Symbol("My Symbol"))
 *
 * // false
 * isSymbol("My Symbol")
 *
 * // throws TypeError
 * isSymbol([], { throwError: true })
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
 * @param options - throwError
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true
 * isUndefined(undefined)
 *
 * // false
 * isUndefined(null)
 *
 * // throws TypeError
 * isUndefined("", { throwError: true })
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
 * @param options - throwError
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true
 * isNull(null)
 *
 * // false
 * isNull(undefined)
 *
 * // throws TypeError
 * isNull("", { throwError: true })
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
 * // true
 * isObject({})
 *
 * // true
 * isObject([])
 *
 * // false
 * isObject(() => null)
 *
 * // false
 * isObject(1)
 *
 * // throws TypeError
 * isObject("xyz", { throwError: true })
 * ```
 */
export const isObject = createGuard<object>(
    (value) => typeof value === 'object' && value !== null,
    'object',
);

/**
 * Checks that input is function
 * @remarks - this function excludes class declarations
 * @typeParam T - function type, defaults to "Function"
 * @param input - value to be tested
 * @param options - throwError
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 *  // true
 * isFunction(() => null)
 *
 * // false
 * isFunction(async () => Promise.resolve(null))
 *
 * // false
 * isFunction(function* () {})
 *
 * // false
 * isFunction(async function* () {})
 *
 * // false
 * isFunction(MyClass)
 *
 * // throws TypeError
 * isFunction([], { throwError: true })
 * ```
 */
export function isFunction<T extends Function = Function>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
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
 * @param options - throwError
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true
 * isAsyncFunction(async () => await Promise.resolve())
 *
 * // false
 * isAsyncFunction(() => null))
 *
 * // throws TypeError
 * isAsyncFunction(() => null, { throwError: true })
 * ```
 */
export function isAsyncFunction<T = any>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
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
 * @remarks - works with custom promises as well, e.g. AxiosPromise or Bluebird
 * @typeParam T - type of promise value, defaults to "any"
 * @param input - value to be tested
 * @param throwError - throw error if check fails
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true
 * isPromise<string>(Promise.resolve("hi"))
 *
 * // false
 * isPromise<string>({})
 *
 * // throws type error
 * isPromise<string>([], { throwError: true })
 * ```
 */
export function isPromise<T = any>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
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
 * @param options - throwError
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true
 * isGeneratorFunction(function * () {})
 *
 * // false
 * isGeneratorFunction(async function * () {})
 *
 * // throws TypeError
 * isGeneratorFunction(() => null, { throwError: true })
 * ```
 */
export function isGeneratorFunction<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
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
 * @param options - throwError
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true
 * isAsyncGeneratorFunction(async function * () {})
 *
 * // false
 * isAsyncGeneratorFunction(function * () {})
 *
 * // throws TypeError
 * isAsyncGeneratorFunction(() => null, { throwError: true })
 * ```
 */
export function isAsyncGeneratorFunction<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
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
 * @param options - throwError
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true
 * isGenerator<boolean>((function * () { yield true })())
 *
 * // false
 * isGenerator((async function * () { yield true })())
 *
 * // throws TypeError
 * isGenerator({}, { throwError: true })
 * ```
 */
export function isGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
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
 * @param options - throwError
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true
 * isGenerator<boolean>((async function * () { yield Promise.resolve(true) })())
 *
 * // false
 * isGenerator((function * () { yield true })())
 *
 * // throws TypeError
 * isGenerator({}, { throwError: true })
 * ```
 */
export function isAsyncGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
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
 * @param options - throwError, valueGuard
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true, typed as unknown[]
 * isArray(["xyz"])
 *
 * // true, typed as unknown[]
 * isArray<string>(["xyz"])
 *
 * // true, typed as string[]
 * isArray<string>(["xyz"], { valueGuard: isString })
 *
 * // false
 * isArray<string>(["xyz", 1], { valueGuard: isString })
 *
 * // true, typed as string | number[]
 * isArray<string | number>(["xyz", 1], { valueGuard: isUnion(isString, isNumber) })
 *
 * // throws type error
 * isArray<string>(["xyz", 1], { valueGuard: isString, throwError: true })
 * ```
 */
export function isArray(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: undefined;
    },
): input is unknown[];
export function isArray<T>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: TypeValidator;
    },
): input is T[];
export function isArray<T>(
    input: unknown,
    {
        throwError = false,
        valueGuard,
    }: BaseTypeGuardOptions & { valueGuard?: TypeValidator } = {},
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
 * @param options - throwError, valueGuard
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true, typed as Set<unknown>
 * isSet(new Set(["xyz"]))
 *
 * // true, typed as Set<unknown>
 * isSet<string>(new Set(["xyz"]))
 *
 * // true, typed as Set<string>
 * isSet<string>(new Set(["xyz"]), { valueGuard: isString })
 *
 * // false
 * isSet<string>(new Set(["xyz", 1]), { valueGuard: isString })
 *
 * // true, typed as Set<string | number>
 * isSet<string | number>(new Set(["xyz", 1]), { valueGuard: isUnion(isString, isNumber) })
 *
 * // throws type error
 * isSet<string>(new Set(["xyz", 1]), { valueGuard: isString, throwError: true })
 * ```
 */
export function isSet(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: undefined;
    },
): input is Set<unknown>;
export function isSet<T>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: TypeValidator;
    },
): input is Set<T>;
export function isSet<T>(
    input: unknown,
    {
        throwError = false,
        valueGuard,
    }: BaseTypeGuardOptions & { valueGuard?: TypeValidator } = {},
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
 * @param options - throwError, keyGuard, valueGuard
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true, typed as Map<unknown, unknown>
 * isMap(new Map([["xyz", "abc"]]))
 *
 * // true, typed as Map<unknown, string>
 * isMap<string>(new Map([["xyz", "abc"]]), { valueGuard: isString })
 *
 * // true, typed as Map<string, unknown>
 * isMap<string>(new Map([["xyz", "abc"]]), { keyGuard: isString })
 *
 * // true, typed as Map<string, string>
 * isMap<string, string>(new Map([["xyz", "abc"]]), { keyGuard: isString, valueGuard: isString })
 *
 * // false
 * isMap<string, string>(new Map([["abc", "def"], ["xyz", 100]]), { keyGuard: isString, valueGuard: isString })
 *
 * // true, typed as Map<string, string | number>
 * isMap<string, string>(new Map([["abc", "def"], ["xyz", 100]]), { keyGuard: isString, valueGuard: isUnion(isString, isNumber) })
 *
 * // throws type error
 * isMap<string, string>(new Map([["abc", "def"], ["xyz", 100]]), { keyGuard: isString, valueGuard: isString, throwError: true })
 * ```
 */
export function isMap(
    input: unknown,
    options?: BaseTypeGuardOptions,
): input is Map<unknown, unknown>;
export function isMap<K>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        keyGuard: TypeValidator;
    },
): input is Map<K, unknown>;
export function isMap<V>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: TypeValidator;
    },
): input is Map<unknown, V>;
export function isMap<K, V>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
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
    }: BaseTypeGuardOptions & {
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

/**
 * Checks that input is record
 * @remarks - The Record interface is construed here as representing an object literal
 * @typeParam T - type of map value
 * @param input - value to be tested
 * @param options - throwError, keyGuard, valueGuard
 * @returns boolean
 * @throws TypeError
 * @example
 * ```typescript
 * // true, typed as Map<unknown, unknown>
 * isRecord(new Map([["xyz", "abc"]]))
 *
 * // true, typed as Map<unknown, string>
 * isRecord<string>(new Map([["xyz", "abc"]]), { valueGuard: isString })
 *
 * // true, typed as Map<string, unknown>
 * isRecord<string>(new Map([["xyz", "abc"]]), { keyGuard: isString })
 *
 * // true, typed as Map<string, string>
 * isRecord<string, string>(new Map([["xyz", "abc"]]), { keyGuard: isString, valueGuard: isString })
 *
 * // false
 * isRecord<string, string>(new Map([["abc", "def"], ["xyz", 100]]), { keyGuard: isString, valueGuard: isString })
 *
 * // true, typed as Map<string, string | number>
 * isRecord<string, string>(new Map([["abc", "def"], ["xyz", 100]]), { keyGuard: isString, valueGuard: isUnion(isString, isNumber) })
 *
 * // throws type error
 * isRecord<string, string>(new Map([["abc", "def"], ["xyz", 100]]), { keyGuard: isString, valueGuard: isString, throwError: true })
 * ```
 */
export function isRecord(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: undefined;
        keyGuard: undefined;
    },
): input is Record<string, unknown>;
export function isRecord<K extends RecordKeyTypes>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: undefined;
        keyGuard: TypeValidator;
    },
): input is Record<K, unknown>;
export function isRecord<V>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: TypeValidator;
        keyGuard: undefined;
    },
): input is Record<string, V>;
export function isRecord<K extends RecordKeyTypes, V>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: TypeValidator;
        keyGuard: TypeValidator;
    },
): input is Record<K, V>;
export function isRecord<K extends RecordKeyTypes, V>(
    input: unknown,
    {
        throwError = false,
        valueGuard,
        keyGuard,
    }: BaseTypeGuardOptions & {
        valueGuard?: TypeValidator;
        keyGuard?: TypeValidator;
    } = {},
): input is Record<K, V> {
    return createGuard<Record<K, V>>(
        (value) =>
            isObject(value) &&
            toObjectString(value) === '[object Object]' &&
            (!valueGuard || Object.values(value).every(valueGuard)) &&
            (!keyGuard || Object.keys(value).every(keyGuard)),
        'map',
    )(input, { throwError });
}
