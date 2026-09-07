# 📌 PROJECT CONTINUITY FILE — Event Booking Platform

> **INSTRUCTIONS FOR ANY AI TOOL READING THIS FILE:**
> This file is the single source of truth for this project. Before doing ANY work,
> read this entire file. It tells you what the project is, what's been decided,
> what's already built, and what to do next. After you finish work in a session,
> UPDATE the "Progress Log" and "Current Status" sections before ending — the
> next AI tool (or the next session) depends on this being accurate.
>
> If the user just says "continue" or "let's keep going," look at
> **"Immediate Next Step"** near the top and start there.

---

## 1. What This Project Is (Plain English)

A full-stack **event booking web application** — think a mini "BookMyShow" /
"Eventbrite" clone. There are three types of users:
- **User** — browses events, books tickets, gets a QR-code ticket
- **Organizer** — creates and manages events, scans QR tickets at entry
- **Admin** — manages the whole platform, views analytics

The project's standout feature is an **AI-based recommendation system** that
suggests events to users based on their booking history and preferences.

This is a student/portfolio **major project**, so the priority is: get the
"Must-Have" features fully working end-to-end before touching "Good-to-Have"
features.

---

## 2. Tech Stack (Decided)

> If no stack was chosen yet when you read this, propose MERN and ask the user
> to confirm before writing code — don't assume silently.

| Layer | Choice |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT + bcrypt |
| Payments | Razorpay (Test Mode) |
| QR Codes | `qrcode` (generate) + a scanner lib (validate) |
| Charts | Recharts or Chart.js |
| Recommendations | Simple content-based filtering (no heavy ML infra needed) |

**Repo structure (target):**
```
/backend    → Express API, MongoDB models, routes, controllers
/frontend   → React app
CONTINUITY.md → this file, always at project root
```

---

## 3. ⭐ IMMEDIATE NEXT STEP

> **THIS IS THE FIRST THING ANY AI SHOULD DO. Update this line every session.**

**Next step:** Start **Phase 2 — Event Management (CRUD)**.
1. Create `backend/models/Event.js` (title, description, category, date, venue,
   price, totalSeats, seatsRemaining, imageUrl, organizer ref → User).
2. Create `backend/controllers/eventController.js` + `backend/routes/eventRoutes.js`
   with: create (organizer/admin only), update, delete, get all, get one.
3. Wire an image upload approach (simplest: accept an image URL for now;
   real file upload via Cloudinary/multer can come later if time permits).
4. On the frontend: add `pages/CreateEvent.jsx` (organizer-only, behind
   `ProtectedRoute roles={["organizer","admin"]}`), `pages/EventList.jsx`,
   `pages/EventDetail.jsx`, and add these routes to `App.jsx`.
5. Test the full loop: register as organizer → create event → see it in the
   list → view its detail page.

Before starting, run `npm install` in both `backend/` and `frontend/`, copy
`.env.example` to `.env` in both folders, and make sure a MongoDB instance
(local or Atlas) is reachable at `MONGO_URI`.

---

## 4. Current Status

**Overall progress: ~15% — Phase 0 and Phase 1 (backend + frontend) are built and verified working.**

| Phase | Status |
|---|---|
| Phase 0 — Setup & Architecture | ✅ Done |
| Phase 1 — Auth & Roles | ✅ Done (backend + frontend), not yet tested against a live MongoDB |
| Phase 2 — Event Management (CRUD) | 🔲 Not started ← **next up** |
| Phase 3 — Search & Filters | 🔲 Not started |
| Phase 4 — Booking System | 🔲 Not started |
| Phase 5 — QR Generation & Validation | 🔲 Not started |
| Phase 6 — Payment Integration (Razorpay) | 🔲 Not started |
| Phase 7 — AI Recommendations | 🔲 Not started |
| Phase 8 — Analytics Dashboard | 🔲 Not started |
| Phase 9 — Good-to-Have Features | 🔲 Not started |
| Phase 10 — Polish, Testing, Deployment | 🔲 Not started |

Legend: 🔲 Not started · 🟨 In progress · ✅ Done

### What actually exists right now (file map)
```
backend/
  server.js              → Express app entry, health check at /api/health
  config/db.js           → MongoDB connection (Mongoose)
  models/User.js         → name, email, password(hashed), role, favoriteCategories
  middleware/auth.js     → protect() verifies JWT, authorize(...roles) checks role
  controllers/authController.js → registerUser, loginUser, getCurrentUser
  routes/authRoutes.js   → POST /register, POST /login, GET /me

frontend/
  src/context/AuthContext.jsx → login/register/logout, holds JWT + user in state
  src/api/axios.js       → shared axios instance, base URL from .env
  src/components/ProtectedRoute.jsx → gate routes by login + role
  src/pages/Login.jsx, Register.jsx, Home.jsx
  src/App.jsx            → routes: "/", "/login", "/register"
```
Both `backend` (`npm run build`-equivalent: syntax-checked) and `frontend`
(`npm run build`) were verified to compile without errors. The backend has
**not** been tested against a live MongoDB yet — do that first if something
seems broken in Phase 2.

---

## 5. Phase-by-Phase Plan

### Phase 0 — Setup & Architecture
- [ ] Confirm tech stack
- [ ] Initialize `/backend` (Express server, MongoDB connection, env config)
- [ ] Initialize `/frontend` (React + Vite, routing, basic layout)
- [ ] Set up folder conventions (models/routes/controllers, components/pages)
- [ ] Push to a GitHub repo (recommended, so any AI tool can `git pull`)

### Phase 1 — User Authentication + Role-Based Access
- [ ] User model (name, email, password hash, role)
- [ ] Register / Login / Logout endpoints
- [ ] Password hashing with bcrypt
- [ ] JWT issuing + verification middleware
- [ ] Role field: `user` / `organizer` / `admin`
- [ ] Role-based route protection middleware
- [ ] Frontend: register/login pages, auth context, protected routes

### Phase 2 — Event Management (CRUD)
- [ ] Event model (title, description, category, date, venue, price, seats, image)
- [ ] Organizer-only: create/edit/delete event
- [ ] Image upload (e.g. Cloudinary or local storage)
- [ ] Public: view event details
- [ ] Frontend: event creation form, event list, event detail page

### Phase 3 — Search & Filters
- [ ] Search by name
- [ ] Filter by category, location, date range, price range
- [ ] Backend query support (indexes as needed)
- [ ] Frontend: search bar + filter UI

### Phase 4 — Booking System
- [ ] Booking model (user, event, ticket count, status)
- [ ] Book event flow (seat availability check)
- [ ] Booking history page for user
- [ ] Prevent overbooking (seats can't go negative)

### Phase 5 — QR Code Ticket Generation & Validation
- [ ] Generate unique QR code per booking (encodes booking ID + a signature)
- [ ] Display/download ticket with QR
- [ ] Organizer-side scanner page
- [ ] Validation logic: valid / already used / invalid
- [ ] Mark ticket "used" on successful scan

### Phase 6 — Payment Integration (Razorpay Test Mode)
- [ ] Razorpay account + test API keys
- [ ] Order creation on backend
- [ ] Checkout on frontend
- [ ] Payment verification (signature check) before confirming booking
- [ ] Handle payment failure gracefully

### Phase 7 — AI Recommendation System
- [ ] Track user's booking history + category preferences
- [ ] Content-based filtering: recommend events similar to past bookings
  (category match, tags, popularity as tiebreaker)
- [ ] "Recommended for you" section on homepage

### Phase 8 — Analytics Dashboard (Admin)
- [ ] Total users, total events, total bookings, total revenue
- [ ] Popular events (by bookings)
- [ ] Booking trends over time (line/bar chart)
- [ ] Build with Recharts/Chart.js

### Phase 9 — Good-to-Have Features (only after Phases 0–8 are solid)
- [ ] Email confirmation on booking
- [ ] Event reminder emails
- [ ] Profile editing
- [ ] Reviews & ratings
- [ ] Wishlist/favorites
- [ ] Google Maps venue location
- [ ] Image gallery per event
- [ ] Organizer revenue report

### Phase 10 — Polish, Testing, Deployment
- [ ] Manual end-to-end testing of every flow
- [ ] Error handling & input validation pass
- [ ] Deploy backend (Render/Railway) + frontend (Vercel/Netlify)
- [ ] Environment variable checklist for production
- [ ] Final README for the repo itself

---

## 6. Decisions Log

> Record any meaningful decision here (stack choices, schema changes, trade-offs)
> so no AI tool re-litigates a decision that was already made.

- **Stack confirmed:** React + Vite / Node.js + Express / MongoDB (Mongoose).
  The original project report also mentioned Django/MySQL and Python +
  scikit-learn as alternatives — we are **not** using those; sticking to one
  JS-based stack end-to-end keeps things simpler for a solo/small-team build.
- **AI recommendations will be JS-based content filtering** (category/tag
  similarity + popularity), not a separate Python/scikit-learn microservice.
  This satisfies the "AI recommendation system" requirement without adding a
  second language/runtime to manage. Revisit only if a real ML model becomes
  a hard requirement later.
- **Report's extra features are out of scope for now:** the uploaded report
  mentions 2FA, a Gemini API chatbot, Google Calendar API, live-streaming for
  hybrid events, and "squad voting." None of these are in the must-have list
  from the original brief — they are parked as possible Phase 9+ good-to-haves,
  not committed to.
- **Single shared `User` model** with a `role` field (`user`/`organizer`/`admin`)
  instead of three separate models — simpler permission logic via one
  `authorize(...roles)` middleware.
- **Admin accounts are not self-registerable.** The public `/register` endpoint
  only allows `user` or `organizer`; admin users must be created directly in
  the database (a seed script can be added in Phase 10 if needed).
- **Image upload deferred:** Phase 2 will start with a plain image URL field
  on events rather than real file upload, to get CRUD working end-to-end
  first. Multer/Cloudinary can be layered in afterward if time permits.

---

## 7. Progress Log

> Add a dated one-line entry every session. Keep entries short.

- **2026-08-19** — Project scoped, phase plan created, continuity file created. No code yet.
- **2026-09-07** — User's original project report (PDF) reviewed and reconciled with
  the plan (see Decisions Log). Phase 0 completed: repo scaffolded (backend +
  frontend). Phase 1 completed: JWT auth (register/login/me) built on the
  backend with bcrypt hashing and role field; matching Login/Register pages
  and AuthContext built on the frontend. Both sides verified to build/compile
  cleanly. Not yet tested against a live MongoDB instance. Next: Phase 2
  (Event Management CRUD).

---

## 8. How to Use This File (for the human)

1. Give this file (or paste its contents) to whichever AI tool you're using next.
2. Tell it: "Read CONTINUITY.md first, then help me with [whatever you need]."
3. After each work session, ask the AI to update Section 3 (Immediate Next
   Step), Section 4 (status table), and add a line to Section 7 (Progress Log).
4. Keep this file at the root of your project repo so it travels with the code.
