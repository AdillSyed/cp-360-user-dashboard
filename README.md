# User Management Dashboard (CP360 Task)

A simple user management dashboard built with React (Hooks + Functional Components).

## ✨ Features
- Fetch users from `https://jsonplaceholder.typicode.com/users`
- Display users in a table (Name, Email, Company)
- Loading state while fetching
- Case-insensitive search by name/email/company
- User details view on row click
  - Full name, username, email, phone, address
- Add user locally (no API POST)
  - Form validation for required fields
  - Opens in a modal

## 🛠 Tech Stack
- React + Vite
- React Router DOM
- JavaScript
- Context API (for shared state)

## 🧠 Assumptions / Notes
- Added users are stored in local state only (not persisted after refresh).
- Local users do not have address data, so address is shown as -.
- Users are stored in a shared Context store to keep list + details in sync.

## 📁 Project Structure (High Level)
- src/pages → page components (list + details)
- src/components → reusable UI components
- src/store → users store (Context)
- src/utils → helpers (filtering, initials, formatting)

## ▶️ Setup & Run
```bash
npm install
npm run dev
