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
 * @returns TypeGuard<T>
 */
export function createTypeGuard<T>(validator: TypeValidator): TypeGuard<T> {
    return (input: unknown, ...args: any[]): input is T =>
        validator(input, ...args);
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
 * @param options - Optional guard options
 * @returns TypeAssertion<T>
 */
export function createTypeAssertion<T, O extends TypeGuardOptions = undefined>(
    guard: TypeGuard<T, O>,
): TypeAssertion<T, O> {
    return (input: unknown, options?: O): asserts input is T => {
        if (!guard(input, options)) {
            throw new TypeError();
        }
    };
}
