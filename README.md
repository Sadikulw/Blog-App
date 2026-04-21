# 🚀 Blog App

![GitHub repo size](https://img.shields.io/github/repo-size/your-username/blog-app)
![GitHub stars](https://img.shields.io/github/stars/your-username/blog-app?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/blog-app?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-username/blog-app)
![License](https://img.shields.io/badge/license-MIT-green)


<p align="center">
  <img width="100%" alt="Blog App Banner" src="https://github.com/user-attachments/assets/d1d2550c-be24-44b8-a2af-46d50fe15eac" />
</p>

A simple full-stack blogging platform built with the MERN stack.

---

## ✨ Features

- User Authentication (JWT + Cookies)
- Register & Login
- Create, Edit, Delete Blogs
- View all blogs
- Responsive UI

---

## 🏗️ Tech Stack

**Frontend**
- React
- Axios
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

## 📁 Project Structure

blog-app/
├── client/
├── server/
└── README.md

---

## ⚙️ Setup

git clone https://github.com/your-username/blog-app.git
cd blog-app

# install backend
cd server
npm install

# install frontend
cd ../client
npm install

🔑 Environment Variables

Create .env file in server/

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173

▶️ Run Project

# backend
cd server
npm run dev

# frontend
cd ../client
npm run dev

📡 API Routes

Auth

POST /api/register
POST /api/login
GET /api/me

Blogs

GET /api/blogs
POST /api/blogs
PUT /api/blogs/:id
DELETE /api/blogs/:id

