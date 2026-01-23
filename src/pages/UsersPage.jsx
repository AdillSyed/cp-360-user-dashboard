import { useMemo, useState } from "react";
import Loader from "../components/Loader";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import AddUserForm from "../components/AddUserForm";
import { filterUsers } from "../utils/filterUsers";
import { useUsers } from "../store/UsersContext";

export default function UsersPage() {
  const { users, loading, error, addUser } = useUsers();
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    return filterUsers(users, query);
  }, [users, query]);

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
        Search users and click a row to view details
      </p>
      <AddUserForm onAddUser={addUser} />
      <SearchBar value={query} onChange={setQuery} />
      <UserTable users={filteredUsers} />
    </div>
  );
}
