import { useContext, useState, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // ✅ Better initialization
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (data) => {
    console.log("Login data received:", data); // ✅ Debug log

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Save data.user, not data

    setUser(data.user); // ✅ Set data.user, not data
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
