export default function Loader({ text = "Loading..." }) {
  return (
    <div style={{ padding: 20 }}>
      <p style={{ margin: 0 }}>{text}</p>
    </div>
  );
}
