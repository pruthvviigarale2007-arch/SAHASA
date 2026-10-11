# Wanderly REST API Backend

Production-ready Node.js, Express, MongoDB, JWT REST API backend for the **Wanderly / Sahasa** Travel Platform.

## Features & Architecture

- **Clean Layered Architecture**: `config`, `controllers`, `models`, `routes`, `middleware`, `services`, `utils`.
- **Zero External Setup**: Auto-falls back to `mongodb-memory-server` if no `MONGODB_URI` is provided, allowing instant out-of-the-box execution.
- **Security**: Password hashing with `bcryptjs`, stateless JWT authentication, `helmet` HTTP headers, `cors`, and `express-rate-limit`.
- **Server Price Calculation**: All booking totals are strictly calculated server-side using database package rates.
- **Seed Script**: Realistic travel dataset spanning 10 destinations, 20 packages, 15 hotspots, 10 reviews, and default user accounts.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Create `.env` based on `.env.example`:

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=wanderly_secret_jwt_key_2026_super_secure_editorial
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

*(Note: Leaving `MONGODB_URI` empty will automatically launch an in-memory MongoDB instance).*

### 3. Seed Database

Populate realistic travel data and default accounts:

```bash
npm run seed
```

Default Credentials generated:
- **Admin Account**: `admin@wanderly.com` / `Admin@123456`
- **Traveler Account**: `traveler@wanderly.com` / `User@123456`

### 4. Start Server

```bash
# Development mode with Nodemon
npm run dev

# Production start
npm start
```

The server runs at: `http://localhost:5000`

---

## 📑 API Endpoints Summary

Base URL: `/api`

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and receive JWT
- `GET /api/auth/me` - Fetch authenticated user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - Logout user

### Destinations (`/api/destinations`)
- `GET /api/destinations` - Query parameters: `page`, `limit`, `search`, `category`, `featured`, `trending`
- `GET /api/destinations/:slug` - Get destination details
- `POST /api/destinations` - Create destination (Admin only)
- `PUT /api/destinations/:id` - Update destination (Admin only)
- `DELETE /api/destinations/:id` - Delete destination (Admin only)

### Packages (`/api/packages`)
- `GET /api/packages` - Query parameters: `search`, `destination`, `category`, `minPrice`, `maxPrice`, `featured`, `sort`
- `GET /api/packages/:slug` - Get full package itinerary and ratings
- `POST /api/packages` - Create package (Admin only)
- `PUT /api/packages/:id` - Update package (Admin only)
- `DELETE /api/packages/:id` - Delete package (Admin only)

### Hotspots (`/api/hotspots`)
- `GET /api/hotspots` - List sensory moments
- `POST /api/hotspots` - Create hotspot (Admin only)

### Search (`/api/search`)
- `GET /api/search?q=` - Unified search returning `{ destinations: [], packages: [], hotspots: [] }`

### Bookings (`/api/bookings`)
- `POST /api/bookings` - Create booking (Server calculates total price)
- `GET /api/bookings/my-bookings` - Fetch authenticated user's bookings
- `GET /api/bookings/:id` - Fetch booking details
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Reviews (`/api/reviews`)
- `GET /api/reviews/package/:packageId` - Get reviews for package
- `POST /api/reviews` - Submit review (Authenticated)

### Newsletter & Contact (`/api/newsletter`, `/api/contact`)
- `POST /api/newsletter/subscribe` - Subscribe email
- `POST /api/contact` - Submit support/concierge inquiry

### Admin Dashboard (`/api/admin`)
- `GET /api/admin/stats` - Total Users, Bookings, Revenue, Pending Requests
- `GET /api/admin/bookings` - List all bookings
- `PUT /api/admin/bookings/:id/status` - Update booking status (`confirmed`, `cancelled`, `completed`)
- `GET /api/admin/users` - List all registered users
- `GET /api/admin/contact` - List contact inquiries
- `GET /api/admin/subscribers` - List newsletter subscribers
