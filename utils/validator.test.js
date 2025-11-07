const { studentSignupValidation, loginValidation } = require('./validator');

describe('StudentSignup Validation', () => {

    test('should pass for valid inputs', () => {
        expect(studentSignupValidation('varshith', 'vajinapelli', 'vajin001@umn.edu', 'Qwerty123'))
            .toBe(true);
    });

    test('should reject email not ending in @umn.edu', () => {
        expect(studentSignupValidation('varshith', 'vajinapelli', 'vsv@gmail.com', 'qwerty123')).
            toBe(false);
    });

    test('should reject password shorter than 6 characters', () => {
        expect(studentSignupValidation('varshith', 'vajinapelli', 'vajin001@umn.edu', '12345'))
            .toBe(false);
    });

    test('should reject when one or more fields are missing (empty strings)', () => {
        expect(studentSignupValidation('', 'vajinapelli', 'vajin001@umn.edu', 'qwerty123'))
            .toBe(false);
    });

    test('should reject when one or more fields are missing (null/undefined)', () => {
        expect(studentSignupValidation('varshith', null, 'vajin001@umn.edu', 'qwerty123'))
            .toBe(false);
    });

});


describe('Login Validation', () => {
    test('should pass for a valid UMN email and password (>= 6 chars)', () => {
        expect(loginValidation('vajin001@umn.edu', '1we4r56')).toBe(true);
    });

    test('should reject when email or password is missing (empty strings)', () => {
        expect(loginValidation('', '1we4r56')).toBe(false);
    });

    test('should reject when email is not a UMN email', () => {
        expect(loginValidation('invalid@gmail.com', '12wert')).toBe(false);
    });

    test('should reject when password is too short (< 6 chars)', () => {
        expect(loginValidation('vajin001@umn.edu', '123')).toBe(false);
    });
});