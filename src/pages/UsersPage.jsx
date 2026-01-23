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

  const filteredUsers = useMemo(() => filterUsers(users, query), [users, query]);

  if (loading) return <Loader text="Loading users..." />;

  if (error) {
    return (
      <div className="container">
        <div className="card">
          <h1 className="pageTitle">User Management Dashboard</h1>
          <p style={{ color: "red", marginBottom: 0 }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
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
          <h1 className="pageTitle">User Management Dashboard</h1>
          <p className="subtitle">
            Search users and click a row to view details
          </p>
        </div>
        <button className="btnPrimary" onClick={() => setIsAddOpen(true)}>
          + Add User
        </button>
      </div>
      <div style={{ height: 16 }} />
      <div className="card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 14,
          }}
        >
          <div style={{ flex: 1, minWidth: 240 }}>
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <span className="badge">Showing: {filteredUsers.length}</span>
        </div>
        <UserTable users={filteredUsers} />
      </div>
      {isAddOpen && (
        <Modal title="Add User" onClose={() => setIsAddOpen(false)}>
          <AddUserForm onAddUser={addUser} onClose={() => setIsAddOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
