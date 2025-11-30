# 📚 Seminar Hub

A full-stack seminar management platform built with **React**, **Node.js**, and **MySQL**.  
This project represents my transition from older stacks (PHP/jQuery) into **industry-standard engineering** — clean architecture, testing, documentation, and scalable UI development.

---

## 🖼️ Screenshots

### User Dashboard
![User Dashboard](./screenshots/user-dashboard.png)

### User Landing Page
![User Landing Page](./screenshots/user-landingPage.png)

### Admin Dashboard
![Admin Dashboard](./screenshots/admin-dashboard.png)

### Admin Landing Page
![Admin Landing Page](./screenshots/admin-landingPage.png)

## 🛠️ Tech Stack

### **Frontend**
- React
- Vite
- Tailwind CSS
- Axios
- reactQuery

### **Backend**
- Node.js
- Express.js
- MySQL (mysql2)
- JWT Authentication
- Multer (image upload)
- Swagger API Docs

### **Tools**
- Jest (Unit + Integration Tests)
- Winston Logging
- REST API Architecture

---

## ✨ Features

### **Backend (Express + MySQL)**
- Clean architecture (routes, controllers, services)
- JWT Authentication (Login, Register, Role-based: user/admin)
- User CRUD
- Admin CRUD
- Seminar CRUD (with image upload)
- Join Seminar API (many-to-many relation)
- Dashboard Statistics  
  - Admin: total seminars, users, attendees  
  - User: seminars joined, latest seminar
- Swagger API documentation
- Unit tests + Integration tests
- Logging with Winston

---

### **Frontend (React)**
- Login / Register
- Admin dashboard (stats)
- Admin: Manage seminars (CRUD + upload)
- Admin: Manage users
- Admin: Manage admins
- Admin profile + logout
- User dashboard (profile + stats)
- User: Browse seminars + join
- User: View joined seminars

---

## 📁 Project Structure

```plaintext
seminar-hub/
 ├── backend/
 │   ├── src/
 │   │   ├── controllers/
 │   │   ├── services/
 │   │   ├── routes/
 │   │   ├── middleware/
 │   │   ├── db/
 │   │   └── tests/
 │   ├── swagger/
 │   └── server.js
 │
 └── frontend/
     ├── src/
     │   ├── pages/
     │   ├── components/
     │   ├── hooks/
     │   └── layouts/
     └── main.jsx
```


## 🛠️ Running Locally

### **1️⃣ Backend Setup**

```bash
cd backend
npm install
npm run start
```

Backend will start on:

```
http://localhost:3000
```

### **2️⃣ Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

Frontend will start on:

```
http://localhost:5173
```

## 📌 Closing Notes

I built this project to demonstrate how I approach structure, problem-solving, and modern development practices. If you're reviewing this, I’m open to feedback and always excited to learn from more experienced engineers. Thanksss!

