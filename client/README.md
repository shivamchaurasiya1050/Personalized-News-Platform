# 📰 NewsBite – Personalized News Platform

NewsBite is a full-stack web application that delivers **personalized news feeds** based on user preferences. It integrates RSS feeds, ad systems, and real-time analytics to create a modern content experience.

---

##  Features

*  **Authentication System (JWT)**
*  **Personalized Feed** (based on user preferences)
*  **Category-based News Filtering**
*  **Save / Bookmark Articles**
*  **Ad Analytics (Views & Clicks)**
*  **Background Jobs using BullMQ + Redis**
*  **Auto RSS Feed Fetching (Cron Jobs)**
*  **Admin Panel (Agents, Ads, Analytics)**

---

##  Tech Stack

### Frontend

* Next.js (App Router)
* React
* Axios
* React Hook Form
* Bootstrap

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Queue & Jobs

* BullMQ
* Redis

---

##  Project Structure

```
NewsBite/
│
├── frontend/        # Next.js App
├── backend/
│   ├── jobs/        # BullMQ (queue, worker, scheduler)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── index.js
```

---

##  Environment Variables

Create a `.env` file inside backend:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

##  Installation & Setup

```

---

### 2️ Install dependencies

#### Backend

```
cd backend
npm install
```

#### Frontend

```
cd frontend
npm install
```

---

### 3️ Start Redis (Important)

Using Docker:

```
docker run -d -p 6379:6379 redis
```

---

### 4️ Run Backend

```
npm run start
```

---

### 5️ Run Worker (BullMQ)

```
node jobs/rss.worker.js
```

---

### 6️ Run Frontend

```
cd frontend
npm run dev
```

---

##  Background Jobs

* RSS feeds are fetched every 10 minutes
* Ads & analytics processed asynchronously
* Powered by BullMQ + Redis

---

##  API Overview

### Auth

## API Overview

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/auth/me`

---

### Feed

* GET `/api/feed/personalized`
* GET `/api/feed/category/:category`

---

### User

* PUT `/api/user/preferences`
* GET `/api/user/saved`
* POST `/api/user/save`

---

### Ads

* POST `/api/ad/view/:id`
* POST `/api/ad/click/:id`

---

### Admin – Agents

* GET `/api/admin/agent`
* POST `/api/admin/agent`
* PUT `/api/admin/agent/:id`
* DELETE `/api/admin/agent/:id`

---

### Admin – Ads

* GET `/api/admin/ads`
* POST `/api/admin/ads`
* PUT `/api/admin/ads/:id`
* DELETE `/api/admin/ads/:id`

---

### Admin – Analytics

* GET `/api/ad/admin/analytics`

---

##  Deployment

### Frontend

* Vercel

### Backend

* Render / Railway / VPS

### Redis

* Redis Cloud (recommended)

---

## Future Improvements

* AI-based recommendations
* Mobile responsiveness improvements
* Advanced analytics dashboard
* Real-time notifications

---


---

## 👨‍💻 Author

**Shivam Chaurasiya**
