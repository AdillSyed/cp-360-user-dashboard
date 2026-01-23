import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { formatAddress } from "../utils/formatAddress";

export default function UserDetailsPage() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data);
      } catch (e) {
        if (e.name !== "AbortError") setError("Failed to fetch user details");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadUser();

    return () => controller.abort();
  }, [id]);

  if (loading) return <Loader text="Loading user details..." />;

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <Link to="/">← Back</Link>
        <h2>User Details</h2>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!user?.id) {
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
          @{user.username}
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
            <b>Email:</b> {user.email}
          </p>
          <p style={{ margin: "8px 0" }}>
            <b>Phone:</b> {user.phone}
          </p>
          <p style={{ margin: "8px 0" }}>
            <b>Address:</b> {formatAddress(user.address)}
          </p>
        </div>
      </div>
    </div>
  );
}
