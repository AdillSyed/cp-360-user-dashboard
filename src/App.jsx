import { Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import UserDetailsPage from "./pages/UserDetailsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
