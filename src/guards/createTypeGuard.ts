import { BaseTypeGuardOptions, TypeGuard, TypeValidator } from '../types';

/**
 * Creates a TypeGuard<T> function
 *
 * @category Type Guard
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
