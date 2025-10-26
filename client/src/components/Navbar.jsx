// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 py-3 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        MERN<span className="text-gray-800">Blog</span>
      </Link>

      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
