# Next.js Authentication and Dynamic Dashboard

This project demonstrates how to implement authentication (login/logout) along with a dynamic dashboard that fetches and filters data from an external API. The dashboard includes a user authentication system with JWT and MongoDB, as well as a posts display with filtering, search, and pagination features.

## Features

- **Authentication**:
  - User registration and login using email and password.
  - JWT token-based authentication for secure access.
  - Protected routes to ensure only authenticated users can access the dashboard.

- **Dashboard**:
  - Displays data from a mock API (JSONPlaceholder) with search and filter capabilities.
  - Pagination for easy navigation through large data sets.
  
- **Responsive Design**:
  - Fully responsive layout using Tailwind CSS.

## Technologies Used

- **Next.js (App Router)** for building the app.
- **MongoDB** for storing user data.
- **bcryptjs** for password hashing.
- **jsonwebtoken (JWT)** for generating secure tokens.
- **Tailwind CSS** for styling.
- **Framer Motion** for animations.

## Setup Instructions

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/nextjs-dashboard-auth.git
cd nextjs-dashboard-auth
```

### 2. Install Dependencies

Install all required dependencies by running the following command:

```bash
npm install
```

### 3. Set up Environment Variables

Create a .env.local file in the root of your project and add the following environment variables:

```bash
MONGODB_URI=mongodb://localhost:27017/your-database-name # Replace with your MongoDB URI
JWT_SECRET=your_jwt_secret_key # A secure key for signing JWT token.
```
Note: Email me for the .env file.

### 4. Run the Application

Run the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000.

## Endpoints

### 1. User Registration (POST /api/auth/register)
- **URL**: `/api/auth/register`
- **Method**: `POST`

### Request Body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response:

- **Success**:
```json
{ "message": "User registered successfully" }
```

### 2. User Login (POST /api/auth/login)
- **URL**: `/api/auth/login`
- **Method**: `POST`

### Request Body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response:

- **Success**:
```json
{ "token": "JWT_TOKEN" }
```

### 3. Token Verification (POST /api/auth/verify)
- **URL**: `/api/auth/verify`
- **Method**: `POST`

### Request Body:

```json
{
  "token": "JWT_TOKEN"
}
```

### Response:

- **Success**:
```json
{ "user": { "email": "user@example.com" } }
```


### 4. Fetch Posts Data (GET /api/posts)
- **URL**: `/api/posts`
- **Method**: `GET`

### Response:

- **Success**:
```json
[
  {
    "id": 1,
    "title": "Post Title",
    "body": "Post content"
  }
]
```

This endpoint fetches posts from the JSONPlaceholder API.
