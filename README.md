# SAHASA • Travel Editorial & Bespoke Expeditions

A luxury travel discovery and booking platform featuring an Express/Node.js REST API backend connected to a modern React + Vite frontend with a high-end editorial aesthetic (Parchment & Terracotta typography, transparent frosted glass navigation, dynamic destination background videos, and comprehensive coverage of all 28 States & 8 Union Territories of India).

---

## 🏛 Architecture & Tech Stack

```
USER
 ↓
FRONTEND (React 18 + Vite + Tailwind CSS + Lucide Icons)
 ↓
REST API (Axios client with JWT Auth Interceptors)
 ↓
BACKEND (Node.js + Express + Helmet + CORS + Rate Limiting)
 ↓
DATABASE (MongoDB with Mongoose / Automatic In-Memory Fallback)
```

- **Frontend**: React 18, Vite, React Router DOM, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express, Mongoose, JWT authentication, bcryptjs, Helmet, Express Rate Limit
- **Database**: MongoDB with auto-seeding & in-memory database fallback

---

## ✨ Features

1. **Editorial Travel Discovery**:
   - Transparent frosted glass navigation bar with integrated search input.
   - Cinematic background video hero with dynamic route reloading.
   - Mega menus for Packages, Destinations, and Hotspots.
   - Full coverage of **all 28 States and 8 Union Territories of India** with filter tabs.

2. **Dedicated Destination Pages (`/location/:slug`)**:
   - Individual HD video backgrounds for destinations.
   - Clean top-left return navigation, bottom-right location tags, and transparent reservation actions.

3. **Curated Packages & Instant Booking**:
   - Interactive booking modal with server-side price calculation.
   - Currency switcher (`INR (₹)` / `USD ($)`).
   - Wishlist / bookmarking system.

4. **Authentication & Profile Management**:
   - JWT-based authentication (Sign in & Register).
   - User profile management (`/profile`).
   - "My Bookings" reservation tracking (`/my-bookings`).

5. **Admin Dashboard (`/admin`)**:
   - Management of bookings, users, packages, destinations, and contact inquiries.

---

## 🚀 Quick Start Guide

### 1. Clone the repository
```bash
git clone https://github.com/pruthvviigarale2007-arch/SAHASA.git
cd SAHASA
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run seed     # Seeds test accounts and travel portfolio
npm run dev      # Starts server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev      # Starts frontend on http://localhost:5173
```

---

## 🔐 Default Credentials (From Seed)

- **Admin Account**: `admin@wanderly.com` / `admin123`
- **User Account**: `user@wanderly.com` / `user123`

---

## 📄 License
ISC
