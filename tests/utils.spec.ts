import { createTypeAssertion, createTypeGuard } from '../src';
class CustomClass {}
const customTypeGuard = createTypeGuard<CustomClass>(
    (value) => value instanceof CustomClass,
    CustomClass.name,
);

describe('createTypeGuard', () => {
    it('creates a type-guard with the correct label', () => {
        expect(customTypeGuard(new CustomClass())).toBeTruthy();
        expect(() => customTypeGuard([], { throwError: true })).toThrow(
            `expected input to be ${CustomClass.name}`,
        );
    });
    it('creates a type-guard without error message when no label is supplied', () => {
        const customTypeGuardWithoutLabel = createTypeGuard<CustomClass>(
            (value) => value instanceof CustomClass,
        );
        expect(() =>
            customTypeGuardWithoutLabel([], { throwError: true }),
        ).toThrow('');
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
