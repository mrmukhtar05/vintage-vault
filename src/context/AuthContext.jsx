import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const USERS_KEY = "vv_users";
const SESSION_KEY = "vv_current_user";

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to seeding
  }
  // Seed a default admin account on first run so the dashboard is reachable.
  const seeded = [
    { name: "Admin", email: "admin@vintagevault.com", password: "admin123", role: "admin" },
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
  return seeded;
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// NOTE: This is a frontend-only mock auth system for demo purposes.
// Passwords are stored in plain text in localStorage — do NOT use this
// pattern in a real production app. Replace with a real backend + hashed
// passwords + secure sessions when this project gets an API.

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession);

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  const register = ({ name, email, password }) => {
    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists." };
    }
    const newUser = { name, email, password, role: "customer" };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    setUser({ name, email, role: "customer" });
    return { success: true };
  };

  const login = ({ email, password }) => {
    const users = loadUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, error: "Invalid email or password." };
    }
    setUser({ name: found.name, email: found.email, role: found.role || "customer" });
    return { success: true };
  };

  const logout = () => setUser(null);

  const getUserCount = () => loadUsers().length;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        register,
        login,
        logout,
        getUserCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
