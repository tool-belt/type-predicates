import {
    assertIsArray,
    isNumber,
    isObject,
    isString,
    isSymbol,
    isUnion,
} from '../src';

const stringArray = ['xyz', 'abc', '123'];
const numberArray = [1, 2, 3];
const symbolArray = [Symbol(), Symbol(), Symbol()];
const recordArray = [{ name: 1 }, { name: 2 }, { name: 3 }];

describe('assertArray', () => {
    it('does not throw for positively tested array values', () => {
        expect(() =>
            assertArray<string>(stringArray, { valueValidator: isString }),
        ).not.toThrow();
        expect(() =>
            assertArray<number>(numberArray, { valueValidator: isNumber }),
        ).not.toThrow();
        expect(() =>
            assertArray<symbol>(symbolArray, { valueValidator: isSymbol }),
        ).not.toThrow();
        expect(() =>
            assertArray<object>(recordArray, { valueValidator: isObject }),
        ).not.toThrow();
        expect(() =>
            assertArray<string | number>([...stringArray, ...numberArray], {
                valueValidator: isUnion<string | number>(isString, isNumber),
            }),
        ).not.toThrow();
    });
    it('throw for negatively tested array values', () => {
        expect(() =>
            assertArray<string>(stringArray, { valueValidator: isNumber }),
        ).toThrow();
        expect(() =>
            assertArray<number>(numberArray, { valueValidator: isString }),
        ).toThrow();
        expect(() =>
            assertArray<symbol>(symbolArray, { valueValidator: isObject }),
        ).toThrow();
        expect(() =>
            assertArray<object>(recordArray, { valueValidator: isSymbol }),
        ).toThrow();
        expect(() =>
            assertArray<string | number>([...symbolArray, ...recordArray], {
                valueValidator: isUnion<string | number>(isString, isNumber),
            }),
        ).toThrow();
    });
    it('throws for non-array values', () => {
        expect(() =>
            assertArray<string>('', { valueValidator: isString }),
        ).toThrow();
        expect(() =>
            assertArray<string>(null, { valueValidator: isString }),
        ).toThrow();
        expect(() =>
            assertArray<string>(123, { valueValidator: isString }),
        ).toThrow();
        expect(() =>
            assertArray<string>(Symbol(), { valueValidator: isString }),
        ).toThrow();
        expect(() =>
            assertArray<string>({}, { valueValidator: isString }),
        ).toThrow();
    });
});
