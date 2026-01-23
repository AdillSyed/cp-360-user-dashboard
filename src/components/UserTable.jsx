import { useNavigate } from "react-router-dom";

export default function UserTable({ users }) {
  const navigate = useNavigate();

  if (!users.length) {
    return <p style={{ margin: 0 }}>No users found.</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        width="100%"
        cellPadding="12"
        style={{
          borderCollapse: "collapse",
          background: "white",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
            <th style={{ borderBottom: "1px solid #eee" }}>Name</th>
            <th style={{ borderBottom: "1px solid #eee" }}>Email</th>
            <th style={{ borderBottom: "1px solid #eee" }}>Company</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              onClick={() => navigate(`/users/${u.id}`)}
              style={{
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              title="Click to view details"
            >
              <td style={{ fontWeight: 600 }}>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.company?.name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
