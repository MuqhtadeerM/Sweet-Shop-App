import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black text-white px-6 py-3 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        🍬 Sweet Shop
      </Link>

      <div className="flex gap-4 items-center">
        {user?.role === "admin" && ( // ✅ Fixed: Check for admin
          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
        )}

        {user && (
          <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
