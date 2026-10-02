# 🎨 Duobingo AI — Frontend

[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Vercel](https://img.shields.io/badge/Vercel-Live-000000?logo=vercel&logoColor=white)](https://duobingo-is-a-duolingo-inspired-web-application.vercel.app)
[![Pinia](https://img.shields.io/badge/Pinia-4-FFD859?logo=pinia&logoColor=white)](https://pinia.vuejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Production-grade **Vue 3 + Vite 8** frontend for an AI-native language learning platform. Features real-time grammar evaluation via an LLM backend, gamified lesson paths, and a fully modernized build pipeline — **34x faster** than the legacy Vue CLI setup, with **0 known vulnerabilities**.

---

## 🔗 Live

| Environment       | URL                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------- |
| **Production**    | https://duobingo-is-a-duolingo-inspired-web-application.vercel.app                      |
| **Backend API**   | Private Repo                                               |

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Vue 3 SPA (Vite 8)                            │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Router (hash mode)                                       │   │
│  │  ├── /            → Home / Login                          │   │
│  │  ├── /dashboard   → Dashboard (auth guard)                │   │
│  │  └── /lessons     → Lessons + Quiz + AI Feedback           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Components                                              │   │
│  │  ├── AppHeader.vue          (nav)                         │   │
│  │  ├── AppFooter.vue          (footer)                      │   │
│  │  ├── Dashboard.vue          (profile + start)             │   │
│  │  ├── Lessons.vue            (lesson path + quiz)          │   │
│  │  ├── AIFeedback.vue         (real-time AI eval)           │   │
│  │  ├── LanguageSelection.vue  (i18n switcher)               │   │
│  │  └── Landing*.vue           (marketing)                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  State (Pinia) + i18n (Vue-i18n 11) + UI (Bootstrap 5)   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ Axios (JWT interceptor)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│         Serverless Backend (Vercel Functions, Node 24)           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  AI Layer                                                 │   │
│  │  └── Gemini 3.5 Flash + MongoDB Atlas Vector Search (RAG)│   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer     | Technology                  | Engineering Decision                            |
| --------- | --------------------------- | ----------------------------------------------- |
| Framework | Vue 3.5                     | Composition API + `<script setup>`              |
| Build     | **Vite 8**                  | Replaced Vue CLI 5 (Webpack) → **34x faster**   |
| Router    | Vue Router 5                | Hash history (no server rewrite needed)         |
| State     | Pinia 4                     | Type-safe, modular stores                       |
| i18n      | Vue i18n 11                 | EN / ES (Composition API mode)                  |
| UI        | Bootstrap 5 + Bootstrap-Vue-3 | Rapid, accessible components                  |
| Icons     | Bootstrap Icons             | Self-hosted webfont (~134 KB)                   |
| HTTP      | Axios                       | Interceptors for JWT + error logging            |
| Lint      | ESLint 9 (flat config)      | Modern config, Vue 3 essentials                 |
| Deploy    | Vercel                      | Auto-deploy from `main` + preview deployments   |

---

## 🗂️ Repository Structure

```
.
├── public/                            # Static assets (favicon, robots, manifest)
├── src/
│   ├── axios.js                       # Axios instance + JWT interceptor + API methods
│   ├── main.js                        # App entry (Vue, Router, Pinia, i18n, Bootstrap)
│   ├── router.js                      # Route definitions + auth guards
│   ├── App.vue                        # Root component
│   ├── duobingo.svg
│   ├── assets/
│   │   ├── duo.png
│   │   ├── duo-banner.png
│   │   ├── Duolingo_logo.svg.png
│   │   ├── german-flag.png
│   │   ├── tr-flag.png
│   │   └── us-flag.png
│   ├── components/
│   │   ├── AIFeedback.vue             # Real-time AI evaluation card
│   │   ├── AppFooter.vue
│   │   ├── AppHeader.vue
│   │   ├── Dashboard.vue              # Profile + start learning
│   │   ├── LandingFeatures.vue
│   │   ├── LandingJumbotron.vue
│   │   ├── LandingWrapper.vue
│   │   ├── LanguageSelection.vue      # i18n switcher
│   │   └── Lessons.vue                # Lesson path + quiz + AI feedback
│   ├── locales/
│   │   ├── en.json
│   │   └── es.json
│   ├── store/
│   │   └── language.js                # Pinia store (language preference)
│   └── views/
│       └── Home.vue                   # Landing / login
├── eslint.config.js                   # ESLint 9 flat config
├── index.html                         # Vite entry point
├── jsconfig.json                      # Path aliases (@/*)
├── package.json
├── vite.config.js                     # Vite config + @ alias
└── README.md
```

---

## 🚀 Key Features

### 1. AI-Native Quiz Feedback

`AIFeedback.vue` renders a real-time evaluation card for translation questions. It calls the backend LLM endpoint and displays:

- **Grammar corrections** with rule names (`subject-verb agreement`, `present perfect`, etc.)
- **Corrected sentence** (if wrong)
- **CEFR level estimate** (`A1`–`C2`)
- **Personalized encouragement**
- **RAG context indicator** (`past_mistakes_used` count) — shows how many similar past mistakes the model retrieved

```javascript
// src/components/AIFeedback.vue
async evaluate(sentence, targetRule) {
  this.result = await evaluateAnswer(sentence, targetRule);
}
```

### 2. Gamified Lesson Path

`Lessons.vue` renders a vertical path with 6 lessons loaded from the backend. Each node shows:
- Lock state (🔒 locked, ▶ current, ✓ completed)
- XP + Gem rewards
- Progress bar (questions answered / total)

### 3. Three Quiz Types

| Type              | UI                                  | Example                              |
| ----------------- | ----------------------------------- | ------------------------------------ |
| `multiple-choice` | Clickable list with ✓/✗ indicators  | "How do you say 'Hello'?"            |
| `translation`     | Text input + Check Answer           | "Translate to Spanish: 'Thank you'"  |
| `match-pairs`     | Drag-and-drop columns               | English ↔ Spanish                    |

### 4. Persistent Auth

JWT stored in `localStorage`, auto-attached to every request via Axios interceptors:

```javascript
// src/axios.js
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### 5. i18n (EN / ES)

Language switcher in the header. Preference persisted to `localStorage`.

---

## 🧩 Frontend ↔ Backend Contract

`src/axios.js` exposes a thin, typed API surface:

```javascript
export {
  axiosInstance,
  signUp,           // (email, password) → token
  login,            // (email, password) → token
  evaluateAnswer,   // (sentence, targetRule) → AI result
  lessonsApi,       // { getAll, getById }
  progressApi,      // { get, update }
};
```

| Frontend call                | Backend endpoint                  |
| ---------------------------- | --------------------------------- |
| `login(email, pwd)`          | `POST /api/auth/login`            |
| `signUp(email, pwd)`         | `POST /api/auth/signup`           |
| `lessonsApi.getAll()`        | `GET /api/lessons`                |
| `lessonsApi.getById(id)`     | `GET /api/lessons?lessonId=X`     |
| `progressApi.get()`          | `GET /api/progress`               |
| `progressApi.update({...})`  | `POST /api/progress`              |
| `evaluateAnswer(s, r)`       | `POST /api/ai/evaluate-answer`    |

---

## 📊 Engineering Metrics

### Build Performance

| Metric            | Vue CLI 5 (before)          | **Vite 8 (after)** | Improvement       |
| ----------------- | --------------------------- | ------------------ | ----------------- |
| Production build  | ~30 s                       | **0.871 s**        | **~34x faster**   |
| HMR (dev)         | ~2 s                        | ~50 ms             | **~40x faster**   |
| Bundle (gzip)     | ~1 MB                       | **156.59 KB**      | ~6x smaller       |
| Vulnerabilities   | 39 (1 critical, 22 high)    | **0**              | ✅ **eliminated** |
| Node.js           | 20.x (deprecated)           | **24.21.0**        | ✅ modern         |

### Bundle Breakdown

```
dist/index.html                          0.47 kB │ gzip:   0.31 kB
dist/assets/Duolingo_logo.svg-*.png     30.73 kB
dist/assets/bootstrap-icons-*.woff2    134.04 kB
dist/assets/bootstrap-icons-*.woff     180.28 kB
dist/assets/duo-*.png                  242.74 kB
dist/assets/index-*.css                336.12 kB │ gzip:  49.49 kB
dist/assets/index-*.js                 482.72 kB │ gzip: 156.59 kB
```

---

## 🧪 Local Development

```bash
# 1. Clone
git clone https://github.com/ongunakaycom/Duobingo-is-a-Duolingo-inspired-web-application
cd Duobingo-is-a-Duolingo-inspired-web-application

# 2. Install
npm install

# 3. Run dev server (Vite, port 8080, auto-open)
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview

# 6. Lint
npm run lint
```

### Environment (optional)

Vite reads env vars prefixed with `VITE_`. The `axios.js` base URL has a hardcoded fallback, so `.env` is optional in dev.

```env
# .env.local
VITE_API_BASE_URL=https://duolingo-vue-backend.vercel.app/api
```

---

## 🚀 Deploying to Vercel

The repository auto-deploys via Vercel's GitHub integration.

1. **Push to `main`** → Vercel builds and deploys to production.
2. **Open a PR** → Vercel creates a preview deployment.

### Build Settings (Vercel Dashboard)

| Setting          | Value           |
| ---------------- | --------------- |
| Framework Preset | **Vite**        |
| Build Command    | `npm run build` |
| Output Directory | `dist`          |
| Install Command  | `npm install`   |
| Node.js Version  | **24.x**        |

> **Note:** No `vercel.json` is committed. Vercel auto-detects Vite from `package.json`. Adding an unnecessary `vercel.json` caused **"Invalid vercel.json"** errors on the current Vercel CLI.

---

## 🔐 Security Highlights

- **JWT in `localStorage`** — auto-attached via Axios interceptors
- **Route guards** — `meta.requiresAuth` checked in `router.beforeEach`
- **CORS** — backend explicitly allows frontend origin
- **No secrets in bundle** — API key lives only on the backend; frontend calls a public endpoint
- **`Content-Type` enforced** — every request is JSON
- **Error logging** — centralized in `axios.js` response interceptor

---

## ⚙️ Modernization Highlights (Vue CLI → Vite)

This project migrated from **Vue CLI 5 (Webpack)** to **Vite 8** in a single refactor pass. Key changes:

| Change                                                | Reason                                              |
| ----------------------------------------------------- | --------------------------------------------------- |
| `@vue/cli-service` → `vite` + `@vitejs/plugin-vue`    | Modern ESM-based bundler                            |
| `vue.config.js` → `vite.config.js`                    | Vite configuration                                  |
| `babel.config.js` → (deleted)                         | Vite uses `esbuild` for transpilation               |
| `public/index.html` → `index.html` (root)             | Vite expects HTML at root                           |
| `VUE_APP_*` → `VITE_*` env prefix                     | Vite env convention                                 |
| `npm run serve` → `npm run dev`                       | Vite convention                                     |
| `require('path')` + `__dirname` → `import.meta.url`   | ESM-native path resolution                          |
| `BootstrapIconsPlugin` (removed)                      | Not exported by `bootstrap-vue-3`; CSS suffices     |
| Node 20 → **Node 24**                                 | Vercel deprecation of Node 20/22                    |

**Result:** 34x faster builds, 6x smaller bundle, 0 vulnerabilities, modern Node runtime.

---

## 🛣️ Roadmap

- [x] Vue 3 + Composition API
- [x] Pinia state management
- [x] i18n (EN / ES)
- [x] Vite 8 migration
- [x] AI Feedback component
- [x] Real-time grammar eval via backend LLM
- [ ] Voice tutor (Web Speech API + backend streaming)
- [ ] Offline PWA mode
- [ ] Skeleton loaders on route transitions
- [ ] Storybook for `AIFeedback.vue`

---

## 👤 Author

**Ongun Akay** — Senior Cloud & AI Engineer

🌐 [ongunakay.com](https://ongunakay.com) · 💼 [LinkedIn](https://linkedin.com/in/ongunakay) · 🧑‍💻 [GitHub](https://github.com/ongunakaycom) · 📧 [info@ongunakay.com](mailto:info@ongunakay.com)

Specialized in GCP/OCI infrastructure, Terraform IaC, Kubernetes, serverless, container security, and AI/LLM application orchestration.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)