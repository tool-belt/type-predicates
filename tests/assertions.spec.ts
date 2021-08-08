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

describe('assertIsArray', () => {
    it('does not throw for positively tested array values', () => {
        expect(() =>
            assertIsArray<string>(stringArray, { valueValidator: isString }),
        ).not.toThrow();
        expect(() =>
            assertIsArray<number>(numberArray, { valueValidator: isNumber }),
        ).not.toThrow();
        expect(() =>
            assertIsArray<symbol>(symbolArray, { valueValidator: isSymbol }),
        ).not.toThrow();
        expect(() =>
            assertIsArray<object>(recordArray, { valueValidator: isObject }),
        ).not.toThrow();
        expect(() =>
            assertIsArray<string | number>([...stringArray, ...numberArray], {
                valueValidator: isUnion<string | number>(isString, isNumber),
            }),
        ).not.toThrow();
    });
    it('throw for negatively tested array values', () => {
        expect(() =>
            assertIsArray<string>(stringArray, { valueValidator: isNumber }),
        ).toThrow();
        expect(() =>
            assertIsArray<number>(numberArray, { valueValidator: isString }),
        ).toThrow();
        expect(() =>
            assertIsArray<symbol>(symbolArray, { valueValidator: isObject }),
        ).toThrow();
        expect(() =>
            assertIsArray<object>(recordArray, { valueValidator: isSymbol }),
        ).toThrow();
        expect(() =>
            assertIsArray<string | number>([...symbolArray, ...recordArray], {
                valueValidator: isUnion<string | number>(isString, isNumber),
            }),
        ).toThrow();
    });
    it('throws for non-array values', () => {
        expect(() =>
            assertIsArray<string>('', { valueValidator: isString }),
        ).toThrow();
        expect(() =>
            assertIsArray<string>(null, { valueValidator: isString }),
        ).toThrow();
        expect(() =>
            assertIsArray<string>(123, { valueValidator: isString }),
        ).toThrow();
        expect(() =>
            assertIsArray<string>(Symbol(), { valueValidator: isString }),
        ).toThrow();
        expect(() =>
            assertIsArray<string>({}, { valueValidator: isString }),
        ).toThrow();
    });
});
