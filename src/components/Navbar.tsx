// components/Navbar.tsx
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-bold text-xl ${isActive ? "text-primary" : "text-gray-700"}`
          }
        >
          Logo
        </NavLink>

        <div className="ml-auto flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-primary ${
                isActive ? "text-primary font-medium underline" : "text-primary"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `hover:text-primary ${
                isActive ? "text-primary font-medium underline" : "text-primary"
              }`
            }
          >
            Favourite
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
