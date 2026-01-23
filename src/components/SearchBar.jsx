export default function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name, email, or company..."
      style={{
        padding: 12,
        borderRadius: 8,
        border: "1px solid #ccc",
        width: "100%",
        marginBottom: 16,
      }}
    />
  );
}
