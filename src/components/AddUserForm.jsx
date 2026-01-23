import { useState } from "react";

export default function AddUserForm({ onAddUser }) {
  const [form, setForm] = useState({name: "", email: "", company: ""});
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.company.trim()) e.company = "Company is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;

    onAddUser({
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
    });
    setForm({ name: "", email: "", company: "" });
    setErrors({});
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: 16,
        borderRadius: 10,
        border: "1px solid #eee",
        marginBottom: 16,
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: 12 }}>Add User (Local)</h3>
      <div style={{ display: "grid", gap: 12 }}>
        <div>
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Name"
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
          {errors.name && (
            <div style={{ color: "red", fontSize: 12, marginTop: 6 }}>
              {errors.name}
            </div>
          )}
        </div>
        <div>
          <input
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="Email"
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
          {errors.email && (
            <div style={{ color: "red", fontSize: 12, marginTop: 6 }}>
              {errors.email}
            </div>
          )}
        </div>
        <div>
          <input
            value={form.company}
            onChange={(e) =>
              setForm((p) => ({ ...p, company: e.target.value }))
            }
            placeholder="Company"
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
          {errors.company && (
            <div style={{ color: "red", fontSize: 12, marginTop: 6 }}>
              {errors.company}
            </div>
          )}
        </div>
        <button
          type="submit"
          style={{
            padding: 12,
            borderRadius: 8,
            border: "none",
            background: "black",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Add User
        </button>
      </div>
    </form>
  );
}
