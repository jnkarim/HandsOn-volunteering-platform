# 👐 Hands-On Volunteering Platform

## 📌 Project Overview
Hands-On Volunteering Platform is a web-based application that connects volunteers with events and initiatives in their communities. The platform allows organizations to create events and volunteers to explore, join, and participate in these events.

---

## 🚀 Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT-based Authentication
- **API Communication**: RESTful APIs

---

## ✨ Features
- 🔐 User Authentication (Signup, Login, Logout) using JWT
- 👤 User Profile Management
- 📅 Event Creation, Viewing, Updating, and Deletion
- 🙌 Event Participation (Join Events)
- 🔎 Public Event Listing for Unauthenticated Users
- 🛡️ Protected Routes for Authenticated Users
- 📄 REST API following best practices

---

## 🗄️ Database Schema

### **Users Collection**
| Field        | Type     | Description          |
| ------------ | -------- | -------------------- |
| _id          | ObjectId | Unique Identifier    |
| name         | String   | User's Name          |
| email        | String   | User's Email         |
| password     | String   | Hashed Password      |
| joinedEvents | [ObjectId] | List of Event IDs  |

### **Events Collection**
| Field       | Type     | Description                |
| ----------- | -------- | -------------------------- |
| _id         | ObjectId | Unique Identifier          |
| title       | String   | Event Title                |
| description | String   | Event Description          |
| date        | Date     | Event Date                 |
| location    | String   | Event Location             |
| organizer   | ObjectId | Reference to Organizer (User) |
| participants| [ObjectId] | List of Participant IDs |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB Atlas account or a local MongoDB instance.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hands-on-volunteering-platform.git
   cd hands-on-volunteering-platform/backend
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
3. env file in backend:
   ```bash
   PORT=4000
   MONGO_URI=mongodb+srv://jnkarim:uzumaki@handson.2bhpg.mongodb.net/
   JWT_SECRET=netninjanarutouzumaki
4. Start the backend server:
   ```bash
   npm run dev
5. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   npm install
   npm run dev

## 🛠️ API Endpoints

### Authentication Routes

| Method | Endpoint             | Description                      |
|--------|----------------------|----------------------------------|
| POST   | `/api/user/signup`   | Register a new user              |
| POST   | `/api/user/login`    | Login an existing user           |
| POST   | `/api/user/logout`   | Logout the user                  |
| GET    | `/api/user/profile`  | Get user profile (Protected)     |
| PUT    | `/api/user/profile`  | Update user profile (Protected)  |

### Event Routes

| Method | Endpoint                | Description                      |
|--------|-------------------------|----------------------------------|
| GET    | `/api/events`           | Get all events (Public)         |
| GET    | `/api/events/:id`       | Get a single event (Public)     |
| POST   | `/api/events`           | Create a new event (Protected)  |
| PUT    | `/api/events/:id`       | Update an event (Protected)     |
| DELETE | `/api/events/:id`       | Delete an event (Protected)     |
| POST   | `/api/events/:id/join`  | Join an event (Protected)       |
