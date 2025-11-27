# 🕊️ SikhshaConnect

SikhshaConnect is a study-focused productivity and social app.  
Users can register with unique usernames, add friends, track their study sessions with timers and notes, automatically share progress with friends, send reminders, and relax using music/podcasts.

![Project Structure](./screenshots/folder-structure.png)

---

## 🚀 Features

### 👤 User & Social System
- Register with a unique username  
- Find users by their username  
- Send/accept/reject friend requests  
- Send study reminders to friends  
- Auto-send study session updates to connected friends  

### ⏱️ Study Tools
- Pomodoro-style study timer  
- Attach notes to each timer session  
- Track study session history  

### 🎵 Relax Mode
- Listen to relaxing music  
- Access productivity podcasts  

---

## 🛠️ Tech Stack

### **Frontend**
- React (Vite)
- React Router
- Context API / Redux Toolkit
- TailwindCSS or CSS Modules

### **Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- (Optional) Socket.io for real-time notifications

### **Additional Tools**
- Nodemailer / Cron jobs for reminders  
- Cloudinary (optional) for user profile images  
- ESLint + Prettier for clean code  

---

## 📁 Project Structure

```
sikhshaconnect/
│
├── backend/
│   ├── config/         # DB connection & global config
│   ├── controllers/    # Handle request/response
│   ├── middlewares/    # Auth, validation, error handlers
│   ├── models/         # Mongoose schemas (User, Session, Friends…)
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic (core app functions)
│   ├── utils/          # Reusable helper functions (jwt, mail, otp)
│   ├── .env
│   ├── index.js
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/        # axios/fetch calls to backend
│   │   ├── components/ # UI components
│   │   ├── features/   # feature-based modules (auth, timer, friends)
│   │   ├── hooks/      # custom hooks (useTimer)
│   │   ├── context/    # global state providers
│   │   ├── layouts/    # Main layout / Auth layout
│   │   ├── pages/      # routed pages
│   │   ├── utils/      # frontend helpers (storage, formatting)
│   │   ├── assets/     # images/icons
│   │   └── styles/     # global styles
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── package.json (root) – optional combined scripts
```

---

## 🔧 Installation & Setup

### **1. Clone the repo**
```bash
git clone <repo-url>
cd sikhshaconnect
```

---

## 🖥️ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=8000
```

Run server:
```bash
npm run dev
```

---

## 🌐 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

If needed, create `frontend/.env`:
```
VITE_API_URL=http://localhost:8000
```

---

## ▶️ Running Both (optional)

In the **root folder**, add this to `package.json`:

```json
"scripts": {
  "server": "npm --prefix backend run dev",
  "client": "npm --prefix frontend run dev",
  "dev": "concurrently \"npm run server\" \"npm run client\""
}
```

Then run:
```bash
npm run dev
```

---

## 🧠 Core Modules Overview

### 🔹 Authentication
- Register, login, logout  
- Unique username validation  
- JWT-based authentication  

### 🔹 Friends System
- Search users  
- Send/accept/reject friend requests  
- Auto-sync study updates  

### 🔹 Study Timer
- Pomodoro timer implementation  
- Save sessions with notes  
- Push auto-notifications to friends  

### 🔹 Reminder System
- Cron jobs to send scheduled reminders  
- Email or in-app notifications  

### 🔹 Relax Mode
- Music playlist  
- Podcast list or API integration  

---

## 👥 Team Workflow (Recommended)

| Role | Responsibility |
|------|----------------|
| **Frontend Developer** | Auth UI, Timer UI, Friends UI, Relax mode |
| **Backend Developer** | Auth APIs, Timer APIs, Friend request APIs, Reminders |
| **Integrator** | Connect frontend ↔ backend, testing, deployment |

---

## 📅 Suggested Timeline

| Week | Task |
|------|------|
| 1 | Auth + unique username + DB models |
| 2 | Timer + notes + session tracking |
| 3 | Friends system + reminders |
| 4 | Music/podcast + UI polish |
| 5 | Final testing + deployment |

---

## 🧹 Best Practices Followed
- MVC + Service Layer architecture  
- Feature-based React structure  
- Reusable utilities & middlewares  
- Error handling + validation  
- Environment variables with `.env`  
- Clean modular folder structure  

---

## 📜 License
This project is open-source and free to use.

