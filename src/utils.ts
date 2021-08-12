import {
    TypeAssertion,
    TypeGuard,
    TypeGuardOptions,
    TypeValidator,
} from './types';

/*
 * @internal
 * */
export const toObjectString = (value: unknown): string =>
    Object.prototype.toString.call(value);

/**
 * @category Utility
 * @example
 *
 * ```typescript
 * // myTypeGuard === (input: unknown, { throwError: boolean }) => input is MyClass
 * const myTypeGuard = createTypeGuard<MyClass>(
 *     (value) => isObject(value) && Reflect.get(value, 'myProp'),
 *     MyClass.name,
 * );
 * ```
 */
export function createTypeGuard<
    T,
    O extends TypeGuardOptions | undefined = undefined,
>(validator: TypeValidator, options?: O): TypeGuard<T, O> {
    return options
        ? (input: unknown): input is T => validator(input, options)
        : (input: unknown): input is T => validator(input);
}

/**
 * @category Utility
 * @example
 *
 * ```typescript
 * // myTypeAssertion === (input: unknown) => asserts input is MyClass
 * const myTypeAssertion = createTypeAssertion<MyClass>(guard: TypeGuard<MyClass>)
 * ```
 */
export function createTypeAssertion<
    T,
    O extends TypeGuardOptions | undefined = undefined,
>(guard: TypeGuard<T, O>): TypeAssertion<T, O> {
    return (input: unknown, options?: O): asserts input is T => {
        if (!guard(input, options)) {
            throw new TypeError();
        }
    };
}

/**
 * @category Utility
 * @example
 *
 * ```typescript
 * // unionTypeGuard === <T>(input: unknown, ...args: any[]) => input is T
 * const unionTypeGuard = isUnion<string | number | symbol>(
 *     isString,
 *     isNumber,
 *     isSymbol,
 * );
 * ```
 */
export function isUnion<T>(...guards: TypeGuard<T>[]): TypeGuard<T> {
    return function (input: unknown, ...args: any[]): input is T {
        for (const guard of guards) {
            if (guard(input, ...args)) {
                return true;
            }
        }
        return false;
    };
}
