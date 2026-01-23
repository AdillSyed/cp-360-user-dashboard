export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name, email, or company..."
    />
  );
}
