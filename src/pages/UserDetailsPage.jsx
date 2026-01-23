import { Link, useParams } from "react-router-dom";
import { useUsers } from "../store/UsersContext";
import { formatAddress } from "../utils/formatAddress";

export default function UserDetailsPage() {
  const { id } = useParams();
  const { getUserById } = useUsers();
  const user = getUserById(id);

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <Link to="/">← Back</Link>
        <h2>User Details</h2>
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <Link to="/">← Back</Link>
      <div style={{ marginTop: 16 }}>
        <h2 style={{ marginBottom: 6 }}>{user.name}</h2>
        <p style={{ marginTop: 0, color: "#666" }}>
          @{user.username || "-"}
        </p>
        <div
          style={{
            background: "white",
            padding: 16,
            borderRadius: 10,
            border: "1px solid #eee",
          }}
        >
          <p style={{ margin: "8px 0" }}>
            <b>Email:</b> {user.email || "-"}
          </p>
          <p style={{ margin: "8px 0" }}>
            <b>Phone:</b> {user.phone || "-"}
          </p>
          <p style={{ margin: "8px 0" }}>
            <b>Address:</b> {formatAddress(user.address)}
          </p>
        </div>
      </div>
    </div>
  );
}
