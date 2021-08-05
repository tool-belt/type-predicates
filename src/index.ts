export interface BaseTypeGuardOptions {
    throwError?: boolean;
}
export type RecordKeyTypes = string | symbol;
export type TypeGuard<T = any> = (
    input: unknown,
    options?: BaseTypeGuardOptions,
) => input is T;
export type TypeValidator = (input: unknown) => boolean;
export type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;
export type TypedGeneratorFunction<Y, R, N> = (
    ...args: any[]
) => Generator<Y, R, N>;
export type TypedAsyncGeneratorFunction<Y, R, N> = (
    ...args: any[]
) => AsyncGenerator<Y, R, N>;

const toObjectString = (value: unknown): string =>
    Object.prototype.toString.call(value);

/**
 * Creates a TypeGuard<T> function
 *
 * @example
 *
 * ```typescript
 * // myTypeGuard === (input: unknown, {throwError: boolean}) => input is MyClass
 * const myTypeGuard = createTypeGuard<MyClass>(
 *     (value) => isObject(value) && Reflect.get(value, 'myProp'),
 *     MyClass.name,
 * );
 * ```
 *
 * @typeParam T - Type of the TypeGuard
 * @param validator - TypeValidator function that is applied to the value being tested
 * @param label - Label to use in the TypeError message
 * @returns TypeGuard<T>
 */
export function createTypeGuard<T>(
    validator: TypeValidator,
    label?: string,
): TypeGuard<T> {
    return (
        input: unknown,
        { throwError = false }: BaseTypeGuardOptions = {},
    ): input is T => {
        if (!validator(input)) {
            if (throwError) {
                throw new TypeError(
                    label ? `expected input to be ${label}` : '',
                );
            }
            return false;
        }
        return true;
    };
}

/**
 * Checks that input is one of union
 *
 * @example
 *
 * ```typescript
 * // unionTypeGuard === <T>(input: unknown, {throwError: boolean}) => input is T
 * const unionTypeGuard = isUnion(isString, isNumber, isSymbol);
 * ```
 *
 * @typeParam T - Union type to guard
 * @param guards - Type guard functions to be applied
 * @returns TypeGuard<T>
 */
export function isUnion<T>(...guards: TypeGuard[]): TypeGuard<T> {
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
 * @example
 *
 * ```typescript
 * // true
 * isString('xyz');
 *
 * // false, because String constructor returns object
 * isString(new String('xyz'));
 *
 * // false
 * isString(1);
 *
 * // throws TypeError
 * isString([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isString = createTypeGuard<string>(
    (value) => typeof value === 'string',
    'string',
);

/**
 * Checks that input is number primitive
 *
 * @example
 *
 * ```typescript
 * // true
 * isNumber(1);
 *
 * // false, because Number constructor returns object
 * isNumber(new Number(1));
 *
 * // false
 * isNumber('xyz');
 *
 * // throws TypeError
 * isNumber([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isNumber = createTypeGuard<number>(
    (value) => typeof value === 'number',
    'number',
);

/**
 * Checks that input is boolean primitive
 *
 * @example
 *
 * ```typescript
 * // true
 * isBoolean(false);
 *
 * // false
 * isBoolean(1);
 *
 * // false
 * isBoolean('xyz');
 *
 * // throws TypeError
 * isBoolean([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isBoolean = createTypeGuard<boolean>(
    (value) => typeof value === 'boolean',
    'boolean',
);

/**
 * Checks that input is symbol primitive
 *
 * @example
 *
 * ```typescript
 * // true
 * isSymbol(Symbol('My Symbol'));
 *
 * // false
 * isSymbol('My Symbol');
 *
 * // throws TypeError
 * isSymbol([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isSymbol = createTypeGuard<symbol>(
    (value) => typeof value === 'symbol',
    'symbol',
);

/**
 * Checks that input is undefined
 *
 * @example
 *
 * ```typescript
 * // true
 * isUndefined(undefined);
 *
 * // false
 * isUndefined(null);
 *
 * // throws TypeError
 * isUndefined('', { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isUndefined = createTypeGuard<undefined>(
    (value) => typeof value === 'undefined',
    'undefined',
);

/**
 * Checks that input is null
 *
 * @example
 *
 * ```typescript
 * // true
 * isNull(null);
 *
 * // false
 * isNull(undefined);
 *
 * // throws TypeError
 * isNull('', { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isNull = createTypeGuard<null>((value) => value === null, 'null');

/**
 * Checks that input is object
 *
 * @example
 *
 * ```typescript
 * // true
 * isObject({});
 *
 * // true
 * isObject([]);
 *
 * // false
 * isObject(() => null);
 *
 * // false
 * isObject(1);
 *
 * // throws TypeError
 * isObject('xyz', { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param throwError - Throw error if check fails
 * @returns Boolean
 * @throws TypeError
 */
export const isObject = createTypeGuard<object>(
    (value) => typeof value === 'object' && value !== null,
    'object',
);

/**
 * Checks that input is function
 *
 * @remarks
 * - This function excludes class declarations
 *
 * @example
 *
 * ```typescript
 * // true
 * isFunction(() => null);
 *
 * // false
 * isFunction(async () => Promise.resolve(null));
 *
 * // false
 * isFunction(function* () {});
 *
 * // false
 * isFunction(async function* () {});
 *
 * // false
 * isFunction(MyClass);
 *
 * // throws TypeError
 * isFunction([], { throwError: true });
 * ```
 *
 * @typeParam T - Function type, defaults to "Function"
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isFunction<T extends Function = Function>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
): input is T {
    return createTypeGuard<T>(
        (value) =>
            typeof value === 'function' &&
            toObjectString(value) === '[object Function]',
        'function',
    )(input, { throwError });
}

/**
 * Checks that input is an async function
 *
 * @example
 *
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
 *
 * @typeParam T - Type of Promise return value, defaults to "any"
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isAsyncFunction<T = any>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
): input is AsyncFunction<T> {
    return createTypeGuard<AsyncFunction<T>>((value) => {
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
 * @remarks
 * - Works with custom promises as well, e.g. AxiosPromise or Bluebird
 *
 * @example
 *
 * ```typescript
 * // true
 * isPromise<string>(Promise.resolve('hi'));
 *
 * // false
 * isPromise<string>({});
 *
 * // throws type error
 * isPromise<string>([], { throwError: true });
 * ```
 *
 * @typeParam T - Type of promise value, defaults to "any"
 * @param input - Value to be tested
 * @param throwError - Throw error if check fails
 * @returns Boolean
 * @throws TypeError
 */
export function isPromise<T = any>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
): input is Promise<T> {
    return createTypeGuard<Promise<T>>(
        (value) =>
            value instanceof Promise ||
            (isObject(value) && isFunction(Reflect.get(value, 'then'))),
        'promise',
    )(input, { throwError });
}

/**
 * Checks that input is generator function
 *
 * @example
 *
 * ```typescript
 * // true
 * isGeneratorFunction(function* () {});
 *
 * // false
 * isGeneratorFunction(async function* () {});
 *
 * // throws TypeError
 * isGeneratorFunction(() => null, { throwError: true });
 * ```
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isGeneratorFunction<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
): input is TypedGeneratorFunction<Y, R, N> {
    return createTypeGuard<TypedGeneratorFunction<Y, R, N>>((value) => {
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
 * @example
 *
 * ```typescript
 * // true
 * isAsyncGeneratorFunction(async function* () {});
 *
 * // false
 * isAsyncGeneratorFunction(function* () {});
 *
 * // throws TypeError
 * isAsyncGeneratorFunction(() => null, { throwError: true });
 * ```
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isAsyncGeneratorFunction<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
): input is TypedAsyncGeneratorFunction<Y, R, N> {
    return createTypeGuard<TypedAsyncGeneratorFunction<Y, R, N>>((value) => {
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
 * @example
 *
 * ```typescript
 * // true
 * isGenerator<boolean>(
 *     (function* () {
 *         yield true;
 *     })(),
 * );
 *
 * // false
 * isGenerator(
 *     (async function* () {
 *         yield true;
 *     })(),
 * );
 *
 * // throws TypeError
 * isGenerator({}, { throwError: true });
 * ```
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
): input is Generator<Y, R, N> {
    return createTypeGuard<Generator<Y, R, N>>(
        (value) =>
            isObject(value) && toObjectString(value) === '[object Generator]',
        'generator',
    )(input, { throwError });
}

/**
 * Checks that input is async generator
 *
 * @example
 *
 * ```typescript
 * // true
 * isGenerator<boolean>(
 *     (async function* () {
 *         yield Promise.resolve(true);
 *     })(),
 * );
 *
 * // false
 * isGenerator(
 *     (function* () {
 *         yield true;
 *     })(),
 * );
 *
 * // throws TypeError
 * isGenerator({}, { throwError: true });
 * ```
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isAsyncGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
): input is AsyncGenerator<Y, R, N> {
    return createTypeGuard<AsyncGenerator<Y, R, N>>(
        (value) =>
            isObject(value) &&
            toObjectString(value) === '[object AsyncGenerator]',
        'async-generator',
    )(input, { throwError });
}

/**
 * Checks that input is array
 *
 * @example
 *
 * ```typescript
 * // true, typed as unknown[]
 * isArray(['xyz']);
 *
 * // true, typed as unknown[]
 * isArray<string>(['xyz']);
 *
 * // true, typed as string[]
 * isArray<string>(['xyz'], { valueGuard: isString });
 *
 * // false
 * isArray<string>(['xyz', 1], { valueGuard: isString });
 *
 * // true, typed as string | number[]
 * isArray<string | number>(['xyz', 1], {
 *     valueGuard: isUnion(isString, isNumber),
 * });
 *
 * // throws type error
 * isArray<string>(['xyz', 1], { valueGuard: isString, throwError: true });
 * ```
 *
 * @typeParam T - Type of array value
 * @param input - Value to be tested
 * @param options - ThrowError, valueGuard
 * @returns Boolean
 * @throws TypeError
 */
export function isArray(
    input: unknown,
    options?: BaseTypeGuardOptions,
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
    return createTypeGuard<T[]>(
        (value) =>
            Array.isArray(value) && (!valueGuard || value.every(valueGuard)),
        'array',
    )(input, { throwError });
}

/**
 * Checks that input is set
 *
 * @example
 *
 * ```typescript
 * // true, typed as Set<unknown>
 * isSet(new Set(['xyz']));
 *
 * // true, typed as Set<unknown>
 * isSet<string>(new Set(['xyz']));
 *
 * // true, typed as Set<string>
 * isSet<string>(new Set(['xyz']), { valueGuard: isString });
 *
 * // false
 * isSet<string>(new Set(['xyz', 1]), { valueGuard: isString });
 *
 * // true, typed as Set<string | number>
 * isSet<string | number>(new Set(['xyz', 1]), {
 *     valueGuard: isUnion(isString, isNumber),
 * });
 *
 * // throws type error
 * isSet<string>(new Set(['xyz', 1]), {
 *     valueGuard: isString,
 *     throwError: true,
 * });
 * ```
 *
 * @typeParam T - Type of set value
 * @param input - Value to be tested
 * @param options - ThrowError, valueGuard
 * @returns Boolean
 * @throws TypeError
 */
export function isSet(
    input: unknown,
    options?: BaseTypeGuardOptions,
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
    return createTypeGuard<Set<T>>(
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
 * @example
 *
 * ```typescript
 * // true, typed as Map<unknown, unknown>
 * isMap(new Map([['xyz', 'abc']]));
 *
 * // true, typed as Map<unknown, string>
 * isMap<string>(new Map([['xyz', 'abc']]), { valueGuard: isString });
 *
 * // true, typed as Map<string, unknown>
 * isMap<string>(new Map([['xyz', 'abc']]), { keyGuard: isString });
 *
 * // true, typed as Map<string, string>
 * isMap<string, string>(new Map([['xyz', 'abc']]), {
 *     keyGuard: isString,
 *     valueGuard: isString,
 * });
 *
 * // false
 * isMap<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 *     { keyGuard: isString, valueGuard: isString },
 * );
 *
 * // true, typed as Map<string, string | number>
 * isMap<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 *     { keyGuard: isString, valueGuard: isUnion(isString, isNumber) },
 * );
 *
 * // throws type error
 * isMap<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 *     { keyGuard: isString, valueGuard: isString, throwError: true },
 * );
 * ```
 *
 * @typeParam T - Type of map value
 * @param input - Value to be tested
 * @param options - ThrowError, keyGuard, valueGuard
 * @returns Boolean
 * @throws TypeError
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
    return createTypeGuard<Map<K, V>>((value) => {
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
 *
 * @remarks
 * - The Record interface is construed here as representing an object literal
 *
 * @example
 *
 * ```typescript
 * // true, typed as Map<unknown, unknown>
 * isRecord(new Map([['xyz', 'abc']]));
 *
 * // true, typed as Map<unknown, string>
 * isRecord<string>(new Map([['xyz', 'abc']]), { valueGuard: isString });
 *
 * // true, typed as Map<string, unknown>
 * isRecord<string>(new Map([['xyz', 'abc']]), { keyGuard: isString });
 *
 * // true, typed as Map<string, string>
 * isRecord<string, string>(new Map([['xyz', 'abc']]), {
 *     keyGuard: isString,
 *     valueGuard: isString,
 * });
 *
 * // false
 * isRecord<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 *     { keyGuard: isString, valueGuard: isString },
 * );
 *
 * // true, typed as Map<string, string | number>
 * isRecord<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 *     { keyGuard: isString, valueGuard: isUnion(isString, isNumber) },
 * );
 *
 * // throws type error
 * isRecord<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 *     { keyGuard: isString, valueGuard: isString, throwError: true },
 * );
 * ```
 *
 * @typeParam T - Type of map value
 * @param input - Value to be tested
 * @param options - ThrowError, keyGuard, valueGuard
 * @returns Boolean
 * @throws TypeError
 */
export function isRecord(
    input: unknown,
    options?: BaseTypeGuardOptions,
): input is Record<string, unknown>;
export function isRecord<K extends RecordKeyTypes>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        keyGuard: TypeValidator;
    },
): input is Record<K, unknown>;
export function isRecord<V>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: TypeValidator;
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
    return createTypeGuard<Record<K, V>>(
        (value) =>
            isObject(value) &&
            toObjectString(value) === '[object Object]' &&
            (!valueGuard || Object.values(value).every(valueGuard)) &&
            (!keyGuard || Object.keys(value).every(keyGuard)),
        'map',
    )(input, { throwError });
}
