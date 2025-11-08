# 🎯 Duobingo

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

* Uses **JWT tokens** for authentication.
* Tokens are stored in `localStorage` and attached to all requests via Axios interceptors:

```js
const token = localStorage.getItem('token');
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
```

> Exact API endpoints are kept private and configured via environment variables.

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
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development
```

---

## 🛠️ Axios API Client (`src/axios.js`)

```js
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
```

* Handles **JWT injection** automatically
* Centralized error logging
* Provides reusable methods for authentication and data fetching

> Base URL is stored in environment variables to avoid exposing the backend publicly.

---

## 🌍 Proxy Configuration

### Development (`vue.config.js`)

```js
'/api': {
  target: process.env.VUE_APP_API_PROXY,
  pathRewrite: { '^/api': '' },
}
```

### Production (`vercel.json`)

```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ]
}
```

> API routes are proxied securely; backend URL is not exposed.

---

## 🧪 CI/CD Pipeline

* **Backend**: GitHub Actions deploy to Vercel.
* **Frontend**: Vercel automatically deploys on push to `main`.

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

| Variable               | Purpose                         |
| ---------------------- | ------------------------------- |
| `MONGO_URI`            | MongoDB connection              |
| `JWT_SECRET`           | JWT token signing               |
| `VUE_APP_API_BASE_URL` | Base URL for frontend API calls |
| `NODE_ENV`             | Development / Production        |

> `.env` files are used locally; Vercel manages environment variables in the dashboard.

---

## 📦 Project Structure

```
duobingo/
├── backend/                 # Node.js API + MongoDB logic
├── src/                     # Vue frontend
├── public/
├── vue.config.js
├── vercel.json
├── package.json
└── README.md
```

---

## 📌 Notes

* Backend API endpoints are **private and not exposed**.
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