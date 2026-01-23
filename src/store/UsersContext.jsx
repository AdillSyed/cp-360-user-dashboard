import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchUsers } from "../api/usersApi";

const UsersContext = createContext(null);

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchUsers(controller.signal);
        setUsers(data);
      } catch (e) {
        if (e.name !== "AbortError") setError("Failed to fetch users");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  function addUser(newUser) {
    const userToAdd = {
      id: String(Date.now()),
      name: newUser.name,
      username: newUser.username || newUser.name.split(" ")[0] || "local-user",
      email: newUser.email,
      phone: newUser.phone || "-",
      company: { name: newUser.company },
      address: null, // no address for local users
    };

    setUsers((prev) => [userToAdd, ...prev]);
  }

  function getUserById(id) {
    return users.find((u) => String(u.id) === String(id));
  }

  const value = useMemo(() => {
    return { users, loading, error, addUser, getUserById };
  }, [users, loading, error]);

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be used inside UsersProvider");
  return ctx;
}
