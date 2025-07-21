# 🎯 Duobingo – Full-Stack DevOps & CI/CD Documentation

**Duobingo** is a Duolingo-inspired language learning platform built with **Vue 3** (frontend) and a custom **Node.js + Express + MongoDB** backend. This document outlines the DevOps practices, CI/CD pipeline, hosting setup, and architecture used in the full-stack deployment.

---

## 🧱 Stack Overview

| Layer       | Technology                          |
|------------|--------------------------------------|
| Frontend   | Vue 3, Vue Router, Pinia, Axios      |
| Backend    | Node.js, Express.js, MongoDB Atlas   |
| Auth       | JWT-based (Bearer Token)             |
| DB Hosting | MongoDB Atlas (managed by developer) |
| CI/CD      | GitHub Actions, Vercel               |
| Hosting    | Frontend via Vercel, Backend via Vercel Functions or custom Node server |
| API Proxy  | Configured via `vue.config.js` and `vercel.json` |

🌐 Live App: [https://duobingo-is-a-duolingo-inspired-web-application.vercel.app](https://duobingo-is-a-duolingo-inspired-web-application.vercel.app)

---

## 🔐 Authentication

The backend provides `/auth/signup` and `/auth/login` endpoints that return a **JWT token**, stored on the frontend in `localStorage`. Axios uses an interceptor to attach this token to all authenticated requests.

```js
const token = localStorage.getItem('token');
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
````

---

## 📁 Backend API Structure

All requests go through:

```
https://duolingo-vue-backend.vercel.app/api
```

Key routes:

* `POST /auth/signup` → Create account
* `POST /auth/login` → Login
* `GET /lessons`, `POST /progress`, etc. → Language functionality (custom API)
* MongoDB database connection via `MONGO_URI` (managed by developer)

> Note: MongoDB Atlas credentials and `.env` are not committed. Backend is fully managed and deployed independently.

---

## ⚙️ Local Development Setup

### 🖥️ Frontend

```bash
pnpm install
pnpm run serve
```

### 🌐 Backend (Node.js + MongoDB)

```bash
cd backend
npm install
npm run dev
```

> Add `.env` file:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/duobingo
JWT_SECRET=yourSecretKey
```

---

## 🛠️ Axios API Client (`src/axios.js`)

```js
const axiosInstance = axios.create({
  baseURL: 'https://duolingo-vue-backend.vercel.app/api',
  headers: { 'Content-Type': 'application/json' },
});
```

* Handles JWT token injection
* Centralized error logging
* Reusable auth helpers: `login()`, `signUp()`

---

## 🌍 Proxy Setup

### Dev Proxy (`vue.config.js`)

```js
'/api': {
  target: 'https://duolingo-clone-server.vercel.app/api/proxy',
  pathRewrite: { '^/api': '' },
}
```

### Prod Proxy (`vercel.json`)

```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://duolingo-vue-backend.vercel.app/api/$1"
    }
  ]
}
```

---

## 🧪 CI/CD Pipeline

### 🔄 GitHub Actions (Backend Deployment)

You can add a `.github/workflows/backend.yml` for lint/test/deploy:

```yaml
name: Deploy Backend

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Install dependencies
        run: npm install
        working-directory: ./backend

      - name: Lint
        run: npm run lint
        working-directory: ./backend

      - name: Deploy to Vercel
        run: npx vercel --token=${{ secrets.VERCEL_TOKEN }} --prod --confirm
```

### ✅ Frontend via Vercel (Auto CI/CD)

Just push to `main` – Vercel auto-builds and deploys.

---

## 🧪 Linting & Testing

```bash
# Frontend
pnpm run lint
pnpm run test

# Backend
npm run lint
npm run test
```

---

## 🔒 Environment Variables

| Variable     | Usage               |
| ------------ | ------------------- |
| `MONGO_URI`  | MongoDB Atlas URI   |
| `JWT_SECRET` | JWT token signing   |
| `NODE_ENV`   | dev/production mode |

> Use `.env` files locally. Vercel uses its dashboard for env variables.

---

## 📦 Directory Structure

```
duobingo/
├── backend/                 # Node.js API + MongoDB logic
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── index.js
├── src/                     # Vue frontend
│   ├── components/
│   ├── views/
│   ├── assets/
│   ├── locales/
│   └── axios.js
├── public/
├── vue.config.js
├── vercel.json
```

---

## 📌 Notes

* 🔐 MongoDB backend is **owned and maintained by the developer**.
* 🌍 Full-stack: You control frontend, backend, authentication, and persistence.
* 🚀 Vercel serves both static frontend and API proxy via serverless or dedicated API URL.
* 🧪 Tests and linters are integrated.
* 🔧 Extensible to Docker/Kubernetes/CI as needed.

---

## About Me

I'm Ongun Akay, a Senior Full-Stack Developer with expertise across various technologies.

- 👀 I specialize in full-stack development with extensive experience in frontend and backend technologies.
- 🌱 Currently, I'm sharpening my skills in advanced concepts of web development.
- 💞️ I’m always open to exciting collaborations and projects that challenge my abilities.
- 📫 You can reach me at [info@ongunakay.com](mailto:info@ongunakay.com).

---

## 📄 License

MIT License – See [`LICENSE`](./LICENSE)
