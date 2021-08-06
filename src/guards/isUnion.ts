import { BaseTypeGuardOptions, TypeGuard } from '../types';

/**
 * Checks that input is one of union
 *
 * @category Type Guard
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
