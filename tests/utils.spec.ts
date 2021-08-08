import { createTypeAssertion, createTypeGuard } from '../src';
class CustomClass {}
const customTypeGuard = createTypeGuard<CustomClass>(
    (value) => value instanceof CustomClass,
);

describe('createTypeGuard', () => {
    it('creates a type-guard', () => {
        expect(customTypeGuard(new CustomClass())).toBeTruthy();
    });
});

describe('createTypeAssertion', () => {
    it('creates a type-assertion with the supplied guard', () => {
        const customTypeAssertion =
            createTypeAssertion<CustomClass>(customTypeGuard);
        expect(() => customTypeAssertion(new CustomClass())).not.toThrow();
        expect(() => customTypeAssertion([])).toThrow();
    });
});
