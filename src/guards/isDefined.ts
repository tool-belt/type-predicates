/** @category Type Guard */
export function isDefined<T>(input: T | undefined): input is T {
    return input !== undefined;
}
