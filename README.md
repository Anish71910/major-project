# Event Booking Platform

AI-Powered Smart Event Management and Recommendation System — see CONTINUITY.md
for full project plan and current status.

## Quick Start

### Backend
```
cd backend
npm install
cp .env.example .env   # then fill in MONGO_URI and JWT_SECRET
npm run dev
```
Runs on http://localhost:5000 — test with http://localhost:5000/api/health

### Frontend
```
cd frontend
npm install
cp .env.example .env
npm run dev
```
Runs on http://localhost:5173

## What's working right now
- User registration & login (JWT-based) for roles: user, organizer
- Role field stored on every user (admin accounts are seeded manually, not self-registered)
- Protected `/api/auth/me` route to confirm token validity
- Frontend Login/Register pages wired to the backend

See CONTINUITY.md for what's next.
