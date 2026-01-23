import { useNavigate } from "react-router-dom";

export default function UserTable({ users }) {
  const navigate = useNavigate();

  if (!users.length) {
    return <p style={{ margin: 0 }}>No users found.</p>;
  }

  return (
    <div className="tableWrap">
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "35%" }}>Name</th>
            <th style={{ width: "40%" }}>Email</th>
            <th style={{ width: "25%" }}>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              onClick={() => navigate(`/users/${u.id}`)}
              style={{ cursor: "pointer" }}
              title="Click to view details"
            >
              <td style={{ fontWeight: 700 }}>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.company?.name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
