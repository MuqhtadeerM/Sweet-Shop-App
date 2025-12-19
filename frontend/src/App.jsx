import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Admin from "./pages/Admin";
import Register from "./pages/Register";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex gap-4">
        <Link to="/">Dashboard</Link>
        {user?.user?.role === "admin" && <Link to="/admin">Admin</Link>}
      </div>
      <div>
        {user ? (
          <div className="flex gap-4 items-center">
            <span>Welcome, {user.user?.name}!</span>
            <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute admin>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
