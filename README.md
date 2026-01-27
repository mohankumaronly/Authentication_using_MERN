# 🔐 MERN Stack Authentication & Payments System

*(Authentication Complete · Payments Backend Ready · Frontend Payments WIP)*

A **production-ready authentication system** built with the **MERN stack** (MongoDB, Express, React, Node.js), extended with a **manual UPI-based payment approval system** for premium access.

This project focuses on **secure, cookie-based authentication**, **Google OAuth**, **email workflows**, and a **backend-complete admin-controlled payment system**.

---

## 🚀 Features

---

## 🔑 Authentication (✅ Completed)

* Local Authentication (Email + Password)
* Google OAuth 2.0 Login
* JWT Access & Refresh Tokens
* HTTP-only cookie-based sessions
* Silent token refresh
* Secure logout & token revocation

---

## 📧 Email Workflows (✅ Completed)

* Email verification after registration
* Forgot / Reset password flow
* Token expiration handling
* Email templates with Nodemailer

---

## 🔒 Security (✅ Completed)

* HTTP-only, SameSite cookies (XSS safe)
* Refresh token rotation
* Rate limiting on auth routes
* Helmet security headers
* OAuth CSRF-safe state validation

---

## 🧠 Session Management (✅ Completed)

* `/me` endpoint for authenticated user
* Persistent login across reloads
* Auto logout on invalid refresh token

---

## 💳 Payments & Access Control (🚧 Backend Complete)

> ⚠️ **Frontend payment UI is under development**

### Implemented (Backend)

* Manual **UPI QR-based payments**
* One-time & time-based plans
* UTR submission & deduplication
* Admin approval / rejection workflow
* Secure admin-only routes
* Access enforcement middleware
* Premium route protection
* Payment audit trail

### Not Implemented Yet

* Frontend payment UI
* User payment dashboard
* Admin payment UI (table)

---

## 👑 Admin Capabilities (✅ Backend Complete)

* List payments (filtered by status)
* Approve / reject payments
* Grant lifetime or time-based access
* Admin-only protected routes

---

## 🧭 Tech Stack

### Backend

* Node.js + Express
* MongoDB + Mongoose
* JWT (Access & Refresh Tokens)
* Google OAuth 2.0
* Nodemailer
* Helmet, CORS, Rate Limiting

### Frontend

* React (Vite)
* React Router v6
* Context API
* Axios (with interceptors)
* Tailwind CSS

---

## 🔐 High-Level Authentication Flow

```text
Login / OAuth
→ Access Token (15 min) stored in httpOnly cookie
→ Refresh Token stored in DB + cookie
→ Access expires
→ Silent refresh (/refresh-token)
→ Retry original request
```

---

## 🛠️ API Endpoints

### Auth Routes

| Method | Endpoint                        | Description                        |
| ------ | ------------------------------- | ---------------------------------- |
| POST   | /api/auth/register              | Register & send verification email |
| POST   | /api/auth/login                 | Login (rate limited)               |
| GET    | /api/auth/google                | Start Google OAuth                 |
| GET    | /api/auth/google/callback       | OAuth callback                     |
| POST   | /api/auth/verify-email/:token   | Verify email                       |
| POST   | /api/auth/forgot-password       | Send reset email                   |
| POST   | /api/auth/reset-password/:token | Reset password                     |
| POST   | /api/auth/refresh-token         | Refresh access token               |
| POST   | /api/auth/logout                | Logout & revoke refresh token      |
| GET    | /api/auth/me                    | Get authenticated user             |

---

### Payment Routes (Backend Ready)

| Method | Endpoint                                   | Description               |
| ------ | ------------------------------------------ | ------------------------- |
| POST   | /api/payment/intent                        | Generate UPI QR intent    |
| POST   | /api/payment/verify                        | Submit UTR                |
| GET    | /api/payment/admin/payments                | List all payments (admin) |
| GET    | /api/payment/admin/payments?status=PENDING | List pending payments     |
| POST   | /api/payment/admin/payments/:id/approve    | Approve payment           |
| POST   | /api/payment/admin/payments/:id/reject     | Reject payment            |

---

## 📂 Project Structure (Updated)

### Backend

```text
backend
│── server.js
│── configuration/
│   └── db.js
│
├── middlewares/
│   ├── rate.limiter.js
│   └── token.verification.js
│
├── modules/
│   ├── auth/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routers/
│   │   └── validators/
│   │
│   └── payment/
│       ├── controllers/
│       │   ├── paymentIntent.controller.js
│       │   ├── paymentVerification.controller.js
│       │   └── adminPayment.controller.js
│       ├── middleware/
│       │   ├── access.middleware.js
│       │   └── admin.middleware.js
│       ├── models/
│       │   └── payment.model.js
│       └── routers/
│           └── payment.routes.js
│
└── utils/
    └── Emails/
```

---

### Frontend

```text
frontend/src
│── context/
│   └── AuthContext.jsx
│
├── components/
│   ├── RequireAuth.jsx
│   ├── RedirectIfAuth.jsx
│   └── Loading.jsx
│
├── pages/
│   ├── Auth/
│   ├── Home/
│   └── NotFound/
│
├── services/
│   ├── api.js
│   └── auth.service.js
│
└── Routers/
    └── AppRouters.jsx
```

---

## 🚧 Roadmap (Planned Enhancements)

### 1️⃣ Pagination for Admin Payments

```
/admin/payments?page=1&limit=10
```

### 2️⃣ Reject Reason Support

* Admin can provide reason
* User can view rejection message

### 3️⃣ Admin Payment UI

* Table view
* Approve / Reject buttons
* Status filters

### 4️⃣ Time-Based Access Auto Expiry

* Middleware / cron job
* Disable access after `endDate`

### 5️⃣ Cleanup & Hardening

* DB indexes (`status`, `userId`)
* Validation tightening
* RBAC upgrade path

---

## 🏁 Production Notes

* Auth system fully integrated with frontend
* Payment backend is stable & secure
* Frontend payment integration is in progress
* Manual approval avoids unsafe automation
* Ready for Docker & cloud deployment

---

## 📜 License

MIT License
