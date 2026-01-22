import { useParams, Link } from "react-router-dom";

export default function UserDetailsPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">← Back</Link>
      <h2>User Details</h2>
      <p>User ID: {id}</p>
    </div>
  );
}
