import { useMemo, useState } from "react";
import Loader from "../components/Loader";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import AddUserForm from "../components/AddUserForm";
import Modal from "../components/Modal";
import { filterUsers } from "../utils/filterUsers";
import { useUsers } from "../store/UsersContext";

export default function UsersPage() {
  const { users, loading, error, addUser } = useUsers();
  const [query, setQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

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
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ marginBottom: 6 }}>User Management Dashboard</h1>
          <p style={{ marginTop: 0, color: "#666" }}>
            Search users and click a row to view details
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          style={{
            alignSelf: "center",
            padding: "10px 14px",
            borderRadius: 10,
            border: "none",
            background: "black",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            height: 42,
          }}
        >
          + Add User
        </button>
      </div>
      <div style={{ marginTop: 16 }}>
        <SearchBar value={query} onChange={setQuery} />
        <UserTable users={filteredUsers} />
      </div>
      {isAddOpen && (
        <Modal title="Add User" onClose={() => setIsAddOpen(false)}>
          <AddUserForm
            onAddUser={addUser}
            onClose={() => setIsAddOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
