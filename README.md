# 🚀 Blog App – Full Stack Blogging Platform

<p align="center">
  <img src="./image/Screenshot 2026-04-21 192737" alt="Blog App Banner"/>
</p>

<p align="center">
  <b>A modern full-stack blogging platform built with MERN stack</b><br/>
  Create, share, and manage blogs seamlessly ✨
</p>

---

## ✨ Features

- 🔐 User Authentication (JWT + Cookies)
- 🧑‍💻 Register & Login
- ✍️ Create, Edit, Delete Blogs
- 📖 View all blogs
- ⚡ Fast API (Express)
- 🎨 Responsive UI (Tailwind CSS)

---

## 🖼️ Screenshots

<p align="center">
  <img src="./image/home.png" width="400"/>
  <img src="./image/dashboard.png" width="400"/>
  <img src="./image/create.png" width="400"/>
</p>

---

## 🏗️ Tech Stack

**Frontend**
- React.js
- React Router
- Axios
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs



## 📁 Project Structure
---
blog-app/
│
├── client/
├── server/
├── image/
└── README.md


---

## ⚙️ Installation

git clone https://github.com/your-username/blog-app.git
cd blog-app
Install Dependencies
cd server
npm install
cd client
npm install
🔑 Environment Variables

Create .env in server/

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
▶️ Run Project
cd server
npm run dev
cd client
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


---

If your images don’t show, it’s usually because of wrong file names — match them exactly with your `image/` folder.

Want me to :contentReference[oaicite:0]{index=0}?
