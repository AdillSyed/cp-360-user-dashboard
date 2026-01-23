import { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "../api/usersApi";
import Loader from "../components/Loader";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import { filterUsers } from "../utils/filterUsers";
import AddUserForm from "../components/AddUserForm";

export default function UsersPage() {
  const [apiUsers, setApiUsers] = useState([]);
  const [localUsers, setLocalUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getUsers() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchUsers(controller.signal);
        setApiUsers(data);
      } catch (e) {
        if (e.name !== "AbortError") setError("Failed to fetch users");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    getUsers();

    return () => controller.abort();
  }, []);

  const users = useMemo(() => {
    return [...localUsers, ...apiUsers];
  }, [localUsers, apiUsers]);

  const filteredUsers = useMemo(() => filterUsers(users, query), [users, query]);

  if (loading) return <Loader text="Loading users..." />;

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h1>User Management Dashboard</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  function handleAddUser(newUser) {
    setLocalUsers((prev) => [
      {
        id: `local-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        company: { name: newUser.company },
      },
      ...prev,
    ]);
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <h1 style={{ marginBottom: 6 }}>User Management Dashboard</h1>
      <p style={{ marginTop: 0, color: "#666" }}>
        Search users and click a row to view details
      </p>
      <AddUserForm onAddUser={handleAddUser} />
      <SearchBar value={query} onChange={setQuery} />
      <UserTable users={filteredUsers} />
    </div>
  );
}
