const request = require('supertest');
const app = require('../app');

describe('Student Signup Functionality', () => {
    it('should create a new user with a success message', async () => {
        const res = await request(app)
            .post('/student/signup')
            .send({
                firstName: 'varshith',
                lastName: 'vajinapelli',
                email: 'vajin001@umn.edu',
                password: 'qwerty123'
            });

        expect(res.body.message).toBe('Registered successfully');
        expect(res.statusCode).toBe(200);
    });

    it('should return an error message when a duplicate email is provided', async () => {
        const res = await request(app)
            .post('/student/signup')
            .send({
                firstName: 'varshith',
                lastName: 'vajinapelli',
                email: 'vajin001@umn.edu',
                password: 'qwerty123'
            });

        expect(res.body.message).toBe('User already exists');
        expect(res.body.success).toBe(false);
        expect(res.statusCode).toBe(400);
    });
});


describe('Student Login Functionality', () => {

    it('Should successfully log in a registered user', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: "vajin001@umn.edu",
                password: "qwerty123"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Successfully logged in');
        expect(res.body).toHaveProperty('user');
    });

    it('Should reject login with an non-existent email', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'test198@umn.edu',
                password: "qwetywovnp"
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Incorrect credentials');
    });


    it('Should reject login for Invalid password', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'vajin001@umn.edu',
                password: "invalidpassword"
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Incorrect credentials');
    });
});