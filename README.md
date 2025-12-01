🕊️ SikhshaConnect

A fast, scalable, study-focused productivity and social platform designed for high-performance real-world usage.

⚡ Performance, Scalability & System Design Highlights

SikhshaConnect is engineered for speed, efficiency, and massive scalability.
The backend is optimized to handle 50,000+ users per day with smooth, reliable performance.

🔥 High-Performance Backend Architecture

✔ Redis Caching – Reduces repetitive DB queries and boosts API speed
✔ Redis Rate Limiting – Prevents abuse, protects server from spamming, ensures smooth traffic
✔ MongoDB Indexing – Query time improved from O(n) → O(log n)
✔ Node.js Clustering – Utilizes all CPU cores, enabling high concurrency
✔ Benchmarks Folder – Contains scripts using Autocannon to benchmark APIs & caching performance
✔ Connection Pooling & Optimized Queries
✔ Clean service-layer architecture

This makes the platform ultra-fast, scalable, and production-ready.

🚀 Features
👤 User & Social System

Unique username registration

Search users by username

Send, accept, reject friend requests

Send reminders to friends

Auto-share study session updates

⏱️ Study Tools

Pomodoro-based timer

Notes attached to every session

Study history tracking

🎵 Relax Mode

Soothing music

Productivity podcasts

🛠️ Tech Stack
Frontend

React (Vite)

React Router

Context API / Redux Toolkit

TailwindCSS / CSS Modules

Backend

Node.js + Express

MongoDB + Mongoose

JWT authentication

Clustered Node server

Redis for caching + rate limiting

Dev Tools

Nodemailer / Cron jobs

Cloudinary (optional)

ESLint + Prettier

Autocannon (API benchmarking)

📁 Project Structure
sikhshaconnect/
│
├── backend/
│   ├── benchmarks/      # API & caching benchmarking (Autocannon)
│   ├── config/          # DB, Redis, cluster setup
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Auth, rate limiting, error handlers
│   ├── models/          # Mongoose models
│   ├── routes/          # API endpoints
│   ├── services/        # Core app logic
│   ├── utils/           # Helpers (jwt, mail, cache utilities)
│   ├── .env
│   ├── index.js
│   └── server.js        # Express server + clustering
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── assets/
│   │   └── styles/
│   ├── .env
│   ├── index.html
│   └── vite.config.js
│
├── README.md
└── package.json (root)

🔧 Installation & Setup
Clone the repository
git clone <repo-url>
cd sikhshaconnect

🖥️ Backend Setup
cd backend
npm install


Create .env:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=8000
REDIS_URL=your_redis_url


Run backend:

npm run dev

🌐 Frontend Setup
cd frontend
npm install
npm run dev


Optional .env:

VITE_API_URL=http://localhost:8000

▶️ Run Frontend & Backend Together

Add in root package.json:

"scripts": {
  "server": "npm --prefix backend run dev",
  "client": "npm --prefix frontend run dev",
  "dev": "concurrently \"npm run server\" \"npm run client\""
}


Run:

npm run dev

🧪 Benchmarking (Backend Speed Tests)

Inside /backend/benchmarks:

Autocannon is used to benchmark:

API response times

Redis caching performance

MongoDB indexing improvements

Cluster mode impact

Run:

node benchmarks/test.js

🧠 Core Backend Modules
🔹 Authentication

JWT auth

Username uniqueness validation

🔹 Friends System

Search, request, accept, reject

Auto-sync with study updates

🔹 Study Timer

Pomodoro system

Save sessions + notes

🔹 Reminders

Cron-based scheduling

Emails or in-app alerts

🧹 Best Engineering Practices

Efficient and scalable folder structure

MVC + Service layer pattern

Redis caching & rate limiting

Index-optimized MongoDB queries

Node.js clustering

Fully modular middleware

Secure environment variables

📜 License

Open-source. Free to use for learning & production.
