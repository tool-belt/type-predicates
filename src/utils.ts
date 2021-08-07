import {
    TypeAssertion,
    TypeGuard,
    TypeGuardBaseOptions,
    TypeValidator,
} from './types';

/*
 * @internal
 * */
export const toObjectString = (value: unknown): string =>
    Object.prototype.toString.call(value);

/**
 * Creates a TypeGuard<T> function
 *
 * @category Utility
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
        { throwError = false }: TypeGuardBaseOptions = {},
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
 * Creates a TypeAssertion<T> function
 *
 * @category Utility
 * @example
 *
 * ```typescript
 * // myTypeAssertion === (input: unknown) => asserts input is MyClass
 * const myTypeAssertion = createTypeAssertion<MyClass>(guard: TypeGuard<MyClass>)
 * ```
 *
 * @typeParam T - Type of the TypeAssertion
 * @param guard - TypeGuard<T> function
 * @returns TypeAssertion<T>
 */
export function createTypeAssertion<T>(guard: TypeGuard<T>): TypeAssertion<T> {
    return (input: unknown): asserts input is T => {
        guard(input, { throwError: true });
    };
}
