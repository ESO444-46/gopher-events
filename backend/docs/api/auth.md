## POST /auth/signup

### Purpose

Create a new user account for a University of Minnesota email address.

### Auth

Not required

### Request

Body:

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

### Validation Rules

- All fields are required
- `firstName` must be 1-30 characters
- `lastName` must be 1-30 characters
- `email` must be a valid email address
- `email` must end with `@umn.edu`
- `password` must be 6-128 characters
- Email address must not already be registered

### Response (201)

```json
{
  "success": true,
  "message": "Signup successfull",
  "user": {
    "id": 1,
    "firstName": "Goldy",
    "lastName": "Gopher",
    "email": "goldy@umn.edu",
    "createdAt": "2026-01-02T12:00:00.000Z"
  }
}
```

### Error Responses

- 400 Bad Request: Request body failed validation
- 400 Bad Request: Email is already registered

Example validation error:

```json
{
  "success": false,
  "errors": {
    "email": ["Email must end with @umn.edu"],
    "password": ["Password must be at least 6 characters"]
  }
}
```

Example duplicate email error:

```json
{
  "success": false,
  "message": "Email already registered"
}
```

### Notes

- Passwords are hashed with bcrypt before they are stored.
- The response does not include the stored password.
- Signup currently creates the account only. Use `POST /auth/login` after signup to receive an access token.

---

## POST /auth/login

### Purpose

Authenticate an existing user with email and password.

### Auth

Not required

### Request

Body:

```json
{
  "email": "string",
  "password": "string"
}
```

### Validation Rules

- `email` is required
- `email` must be a valid email address
- `email` must end with `@umn.edu`
- `password` is required
- Email must exist in the database
- Password must match the stored hashed password

### Response (200)

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "firstName": "Goldy",
    "lastName": "Gopher",
    "email": "goldy@umn.edu"
  },
  "accessToken": "jwt-access-token"
}
```

### Error Responses

- 400 Bad Request: Request body failed validation
- 401 Unauthorized: Invalid email or password
- 500 Internal Server Error: Unexpected server error

Example invalid credentials error:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Notes

- Login returns a JWT access token.
- The access token expires after 15 minutes.
- Refresh tokens are not implemented yet.
- The password is compared with bcrypt and is never returned in the response.

---

## Protected Route Auth

### Purpose

Send the access token from `POST /auth/login` when calling routes that require a logged-in user.

### Auth

Required

### Request Header

```http
Authorization: Bearer jwt-access-token
```

### Token Payload

The server stores the decoded token values on `req.user`:

```json
{
  "userId": 1,
  "email": "goldy@umn.edu"
}
```

### Error Responses

- 401 Unauthorized: Missing `Authorization` header
- 401 Unauthorized: Authorization header does not start with `Bearer `
- 401 Unauthorized: Token is invalid or expired

Example missing token error:

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

Example invalid token error:

```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### Notes

- Protected routes use `authMiddleware`.
- The token is verified with `JWT_SECRET`.
- After verification, controllers can read the current user from `req.user.userId` and `req.user.email`.
