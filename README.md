# 🔐 MERN Stack Authentication System (Local + Google OAuth)

A **production-ready authentication system** built with the **MERN stack** (MongoDB, Express, React, Node.js).
This project implements **secure, cookie-based authentication**, **Google OAuth**, **email verification**, **refresh tokens**, and **frontend route protection**.

---

## 🚀 Features

### 🔑 Authentication

* **Local Authentication** (Email + Password)
* **Google OAuth 2.0 Login**
* **JWT-based Access & Refresh Tokens**
* **HTTP-only Cookie Sessions** (XSS safe)

### 📧 Email Workflows

* Email verification after registration
* Secure password reset (forgot/reset password)
* Token expiration handling

### 🔒 Security

* HTTP-only, SameSite cookies
* Access token rotation via refresh tokens
* Rate limiting on sensitive routes
* Secure headers using Helmet
* CSRF-safe OAuth state validation

### 🧠 Session Management

* `/me` endpoint to fetch authenticated user
* Silent refresh when access token expires
* Auto logout if refresh token is invalid
* Persistent login across reloads

### 🧭 Frontend UX

* Protected routes (`RequireAuth`)
* Redirect logged-in users away from auth pages
* OAuth error handling via query params
* Centralized AuthContext
* 404 Not Found page

---

## 🛠️ Tech Stack

### Backend

* Node.js + Express
* MongoDB + Mongoose
* JWT (Access & Refresh Tokens)
* Google OAuth 2.0
* Nodemailer (Email)
* Helmet, CORS, Rate Limiting

### Frontend

* React (Vite)
* React Router v6
* Context API
* Axios (with interceptors)
* Tailwind CSS

---

## 🔐 Authentication Flow (High Level)

```text
Login / OAuth
→ Access Token (15 min) stored in httpOnly cookie
→ Refresh Token stored securely in DB + cookie
→ API request fails (401)
→ Silent refresh (/refresh-token)
→ Retry original request
```

---

## 🛠️ API Endpoints

### Auth Routes

| Method | Endpoint                          | Description                             |
| ------ | --------------------------------- | --------------------------------------- |
| POST   | `/api/auth/register`              | Register user & send verification email |
| POST   | `/api/auth/login`                 | Login user (rate limited)               |
| GET    | `/api/auth/google`                | Start Google OAuth                      |
| GET    | `/api/auth/google/callback`       | Google OAuth callback                   |
| POST   | `/api/auth/verify-email/:token`   | Verify email                            |
| POST   | `/api/auth/forgot-password`       | Send reset password email               |
| POST   | `/api/auth/reset-password/:token` | Reset password                          |
| POST   | `/api/auth/refresh-token`         | Refresh access token                    |
| POST   | `/api/auth/logout`                | Logout & revoke refresh token           |
| GET    | `/api/auth/me`                    | Get authenticated user                  |

---

## 🚦 Getting Started

### Prerequisites

* Node.js v18+
* MongoDB (local or Atlas)
* Google OAuth credentials
* SMTP credentials (Gmail / Mailtrap)

---

### 🔧 Installation

```bash
git clone https://github.com/mohankumaronly/Authentication_using_MERN.git
cd Authentication_using_MERN
```

---

### 📦 Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret

FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

Run backend:

```bash
npm run dev
```

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

Run frontend:

```bash
npm run dev
```

---

## 📂 Project Structure

### Backend

```text
backend
│   .dockerignore
│   .env
│   .env.example
│   Dockerfile
│   Dockerfile.dev
│   nodemon.json
│   package-lock.json
│   package.json
│   server.js
│   
├───configuration
│       db.js
│       
├───middlewares
│       rate.limiter.js
│       token.verification.js
│
├───modules
│   └───auth
│       ├───controllers
│       │       auth.controller.js
│       │       auth.forgot.controller.js
│       │       auth.me.controller.js
│       │       auth.refreshToken.controller.js
│       │       googleAuthCallback.controller.js
│       │       verifyEmail.controller.js
│       │
│       ├───models
│       │       auth.model.js
│       │       auth.refreshToken.js
│       │
│       ├───routers
│       ├───routers
│       │       auth.routers.js
│       │
│       │
│       └───validators
│               auth.validate.js
│               auth.validators.js
│
│               auth.validators.js
│
│
└───utils
    │   sendEmail.js
    │
    └───emails
            emailVerificationTemplate.js
            resetPasswordTemplate.js
```

---

### Frontend

```text
frontend
│   .dockerignore
│   .env
│   .env.example
│   Dockerfile
│   Dockerfile.dev
│   nginx.conf
│   package.json
│   vite.config.js
│
└── src
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    │
    ├── common
    │   ├── Button.jsx
    │   └── InputText.jsx
    │
    ├── components
    │   ├── Loading.jsx
    │   ├── RedirectIfAuth.jsx
    │   ├── RequireAuth.jsx
    │   └── HealthCheck.jsx
    │
    ├── context
    │   └── AuthContext.jsx
    │
    ├── Hooks
    │   ├── InputHooks.js
    │   └── LoadingHook.js
    │
    ├── layouts
    │   └── CommonLayout.jsx
    │
    ├── pages
    │   ├── Auth
    │   │   ├── Login.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── ForgotPasswordPage.jsx
    │   │   ├── ResetPasswordPage.jsx
    │   │   ├── VerificationPage.jsx
    │   │   ├── VerificationHandler.jsx
    │   │   └── VerificationLinkPage.jsx
    │   │
    │   ├── Home
    │   │   └── HomePage.jsx
    │   │
    │   └── NotFound
    │       └── NotFoundPage.jsx
    │
    ├── Routers
    │   └── AppRouters.jsx
    │
    └── services
        ├── api.js
        └── auth.service.js
```

---

## 🏁 Production Notes

* Uses **httpOnly cookies** (no localStorage)
* Supports **silent token refresh**
* Secure OAuth state validation
* Ready for Docker & cloud deployment
* Clean separation of concerns (controllers, services, context)

---

## 📜 License

MIT License
