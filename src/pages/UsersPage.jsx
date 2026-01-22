import { useEffect, useState } from "react";
import { fetchUsers } from "../api/usersApi";
import Loader from "../components/Loader";
import UserTable from "../components/UserTable";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getUsers() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchUsers(controller.signal);
        setUsers(data);
      } catch (e) {
        if (e.name !== "AbortError") setError("Failed to fetch users");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    getUsers();

    return () => controller.abort();
  }, []);

  if (loading) return <Loader text="Loading users..." />;

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h1>User Management Dashboard</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <h1 style={{ marginBottom: 6 }}>User Management Dashboard</h1>
      <p style={{ marginTop: 0, color: "#666" }}>
        Click a user row to view details
      </p>

      <UserTable users={users} />
    </div>
  );
}
