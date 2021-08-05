/*
 * @internal
 * */
export const toObjectString = (value: unknown): string =>
    Object.prototype.toString.call(value);
