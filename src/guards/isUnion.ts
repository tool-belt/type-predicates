import { TypeGuard } from '../types';

/**
 * Checks that input is one of union
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // unionTypeGuard === <T>(input: unknown, ...args: any[]) => input is T
 * const unionTypeGuard = isUnion(isString, isNumber, isSymbol);
 * ```
 *
 * @typeParam T - Union type to guard
 * @param guards - Type guard functions to be applied
 * @returns TypeGuard<T>
 */
export function isUnion<T>(...guards: TypeGuard[]): TypeGuard<T> {
    return function (input: unknown, ...args: any[]): input is T {
        for (const guard of guards) {
            if (guard(input, ...args)) {
                return true;
            }
        }
        return false;
    };
}
