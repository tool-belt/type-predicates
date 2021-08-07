import { TypeGuardBaseOptions } from '../types';
import { createTypeGuard, toObjectString } from '../utils';

export type TypedGeneratorFunction<Y, R, N> = (
    ...args: any[]
) => Generator<Y, R, N>;

/**
 * Checks that input is GeneratorFunction
 *
 * @category Type Guard
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
    { throwError = false }: TypeGuardBaseOptions = {},
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
