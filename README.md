<<<<<<< HEAD
# Assignment Submission Portal

This is a MERN stack assignment submission portal for students and teachers.

## Features

- Student registration and login
- Teacher registration and login
- JWT authentication and protected routes
- Assignment creation, editing, and deletion by teachers
- Assignment listing and detail view for students
- File upload support (PDF, DOC, DOCX) with 5MB max file size
- Submission review with marks and feedback
- Role-based authorization

## Folder structure

- `backend/` — Node.js + Express API
- `frontend/` — React + Vite frontend

## Backend setup

1. Open a terminal in `backend/`
2. Run `npm install`
3. Make sure MongoDB is running locally or update `backend/.env` with your `MONGO_URI`
4. Run `npm run dev`

Default backend URL: `http://localhost:5000`

## Frontend setup

1. Open a terminal in `frontend/`
2. Run `npm install`
3. Run `npm run dev`

Default frontend URL: `http://localhost:5173`

## Environment variables

### Backend (`backend/.env`)

- `PORT=5000`
- `MONGO_URI=mongodb://127.0.0.1:27017/assignment-portal`
- `JWT_SECRET=supersecretkey`

### Frontend (`frontend/.env`)

- `VITE_API_URL=http://localhost:5000/api`

## API Documentation

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Assignments
- `GET /api/assignments`
- `GET /api/assignments/:id`
- `POST /api/assignments`
- `PUT /api/assignments/:id`
- `DELETE /api/assignments/:id`

### Submissions
- `POST /api/submissions`
- `GET /api/submissions`
- `GET /api/submissions/student`
- `PUT /api/submissions/:id/review`

## Notes

- Student users can submit assignments and track their status.
- Teacher users can review submissions, add marks, and provide feedback.

## Running locally

Run backend and frontend in separate terminals:

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

If MongoDB is not installed locally, update `backend/.env` with your database URI.
=======
# Assignment-submission-portal-
Assignment Submission Portal built with MERN Stack (MongoDB, Express.js, React.js, Node.js) that allows students to submit assignments and teachers to review, manage, and assign marks through a secure and user-friendly web interface.
>>>>>>> 6f2ceca99df3a4bf98a441ea098e8ffb094b5a38
