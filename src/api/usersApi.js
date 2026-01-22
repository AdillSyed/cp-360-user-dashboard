export async function fetchUsers(signal) {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    signal,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}
