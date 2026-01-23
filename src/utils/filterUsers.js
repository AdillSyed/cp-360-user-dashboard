export function filterUsers(users, query) {
  const q = query.trim().toLowerCase();
  if (!q) return users;

  return users.filter((u) => {
    const name = (u.name || "").toLowerCase();
    const email = (u.email || "").toLowerCase();
    const company = (u.company?.name || "").toLowerCase();

    return name.includes(q) || email.includes(q) || company.includes(q);
  });
}
