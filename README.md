# 🎯 Duobingo – Duolingo-Inspired Language Learning Platform

**Duobingo** is a Duolingo-inspired language learning web application built with **Vue 3** for the frontend and a custom **Node.js + Express + MongoDB** backend. This README covers project setup, architecture, DevOps practices, CI/CD, and hosting.

🌐 **Live App:** [Duobingo on Vercel](https://duobingo-is-a-duolingo-inspired-web-application.vercel.app)

---

## 🧱 Tech Stack

| Layer          | Technology                                       |
| -------------- | ------------------------------------------------ |
| Frontend       | Vue 3, Vue Router, Pinia, Axios, Bootstrap 5     |
| Backend        | Node.js, Express.js, MongoDB Atlas               |
| Authentication | JWT (Bearer token)                               |
| CI/CD          | GitHub Actions, Vercel                           |
| Hosting        | Frontend & Backend via Vercel                    |
| API Proxy      | Configured via `vue.config.js` and `vercel.json` |

---

## 🔐 Authentication

* Endpoints: `/auth/signup` and `/auth/login` return **JWT tokens**.
* Tokens are stored in `localStorage` and attached to all requests via Axios interceptors:

```js
const token = localStorage.getItem('token');
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
```

---

## 📁 Backend API

All backend endpoints are prefixed with:

```
https://duolingo-vue-backend.vercel.app/api
```

Key routes:

* `POST /auth/signup` → Register account
* `POST /auth/login` → Login
* `GET /lessons` / `POST /progress` → Language learning functionality

> MongoDB Atlas connection uses `MONGO_URI` (kept private in `.env`).

---

## ⚙️ Local Development

### Frontend

```bash
pnpm install
pnpm run serve
```

### Backend

```bash
cd backend
npm install
npm run dev
```

> Create a `.env` file:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/duobingo
JWT_SECRET=yourSecretKey
NODE_ENV=development
```

---

## 🛠️ Axios API Client (`src/axios.js`)

```js
const axiosInstance = axios.create({
  baseURL: 'https://duolingo-vue-backend.vercel.app/api',
  headers: { 'Content-Type': 'application/json' },
});
```

* Handles **JWT injection** automatically
* Centralized error logging
* Provides reusable methods like `login()` and `signUp()`

---

## 🌍 Proxy Configuration

### Development (`vue.config.js`)

```js
'/api': {
  target: 'https://duolingo-clone-server.vercel.app/api/proxy',
  pathRewrite: { '^/api': '' },
}
```

### Production (`vercel.json`)

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

### Backend (GitHub Actions)

`.github/workflows/backend.yml` example:

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

### Frontend

* Frontend automatically deploys via **Vercel CI/CD** when pushing to `main`.

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

| Variable     | Purpose                  |
| ------------ | ------------------------ |
| `MONGO_URI`  | MongoDB Atlas connection |
| `JWT_SECRET` | JWT token signing        |
| `NODE_ENV`   | Development / Production |

> `.env` files are used locally; Vercel manages environment variables in the dashboard.

---

## 📦 Project Structure

```
duobingo/
├── backend/                 # Node.js API + MongoDB logic
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
├── src/                     # Vue frontend
│   ├── assets/
│   ├── components/
│   ├── locales/
│   ├── views/
│   └── axios.js
├── public/
├── vue.config.js
├── vercel.json
├── package.json
└── README.md
```

---

## 📌 Notes

* MongoDB backend is **maintained by the developer**.
* Full-stack architecture: **frontend, backend, authentication, persistence**.
* Supports extensibility for **Docker, Kubernetes, advanced CI/CD**.

---

## 👨‍💻 About Me

**Ongun Akay** – Senior Full-Stack Developer

* Specializes in full-stack development across frontend and backend.
* Open to collaborations on challenging web projects.
* Contact: [info@ongunakay.com](mailto:info@ongunakay.com)

---

## 📄 License

MIT License – see [`LICENSE`](./LICENSE)