# [FlowMail](<(https://client-three.vercel.app)>)

## 📌 Introduction

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

This is a full-stack application that allows users to visually design and implement an email marketing sequence using a drag-and-drop interface. Built with the **MERN stack**, it uses **React Flow** for the flowchart UI and **Agenda + Nodemailer** on the backend for email scheduling and delivery.


## 👨‍💻 Tech Stack Used

- Node.js, Express.js, JWT, MongoDB, Agenda | Nodemailer

### Backend (Node + Express + MongoDB)

- 🧠 Parses saved flow to schedule email jobs
- ⏰ Agenda schedules emails based on delay nodes
- 📩 Nodemailer sends emails
- 🔐 Protected routes with JWT
- ✅ Unit testing with Jest

## Folder Structure

```bash
project-root/
│
├── controllers/
│   ├── authController.js
│   └── emailController.js
│
├── models/
│   ├── User.js
│   └── EmailSchedule.js
│   └── SMTPConfig.js
│
├── routes/
│   ├── authRoutes.js
│   └── emailRoutes.js
│   └── smtpRoutes.js
│
├── jobs/
│   └── emailJob.js
│
├── middleware/
│   └── auth.js
│
├── utils/
│   └── agenda.js
│   └── agenda.js
│
├── index.js
├── .env
└── package.json

```

## API Endpoints

#### Authentication

POST /api/auth/register - User Registration.

```bash
{
  "email": "String",
  "password": "String"
}
```

POST /api/auth/login - Log in an existing bidder.

```bash
{
  "email": "String",
  "password": "String"
}
```
http://localhost:5001/auth/smtp-setup

http://localhost:5001/api/schedule

## 🛠️ Installation Steps

Star and Fork the Repo 🌟 and this will keep us motivated.

1. Clone the repository

```bash
git clone https://github.com/subhashdippu/Backend-engin.git
```

2. Change the working directory

```bash
cd Backend-engin
```

3. Install dependencies

```bash
npm install
```

4. Run the app

```bash
npm run start
```
