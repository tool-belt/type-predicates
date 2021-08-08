import {
    TypedGeneratorFunction,
    isGeneratorFunction,
} from '../guards/isGeneratorFunction';
import { createTypeAssertion } from '../utils';

/**
 * Asserts that input is TypedGeneratorFunction<Y, R, N> object
 *
 * @remarks
 * - This assertion works only in ES2018 and above
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as TypedGeneratorFunction<unknown, unknown, unknown>
 * assertIsGeneratorFunction(function* () {
 *     while (true) {
 *         yield true;
 *     }
 * });
 *
 * // does not throw, value is typed as TypedGeneratorFunction<boolean, unknown, unknown>
 * assertIsGeneratorFunction(function* () {
 *     while (true) {
 *         yield true;
 *     }
 * });
 *
 * // throws
 * assertIsGeneratorFunction(async function* () {});
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export function assertIsGeneratorFunction<
    Y = unknown,
    R = unknown,
    N = unknown,
>(input: unknown): asserts input is TypedGeneratorFunction<Y, R, N> {
    return createTypeAssertion<TypedGeneratorFunction<Y, R, N>>(
        isGeneratorFunction,
    )(input);
}
