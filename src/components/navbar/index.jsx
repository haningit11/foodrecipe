import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextCreation";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { isAuth, user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-[#16A34A] font-semibold"
      : "text-[#1E293B] hover:text-[#16A34A] transition duration-300";

  return (
    <nav className="bg-[#FAFAF9] shadow-md relative z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center relative">
          <img
            src="/images/logo-main.png"
            alt="FoodRecipe Logo"
            className="h-14 w-auto object-contain"
          />
          <span className="ml-2 text-2xl font-extrabold text-[#16A34A] relative -top-1 -left-4">
            FoodRecipe
          </span>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-6">
          <li><NavLink to="/" className={linkStyle}>Home</NavLink></li>
          {isAuth && (
            <>
              <li><NavLink to="/favorites" className={linkStyle}>Favorites</NavLink></li>
              <li><NavLink to="/add-recipe" className={linkStyle}>Add Recipe</NavLink></li>
              <li><NavLink to="/recipe-generator" className={linkStyle}>AI Generator</NavLink></li>
            </>
          )}
        </ul>

        {/* Desktop Auth / User Menu */}
        <div className="hidden lg:flex items-center gap-3 relative">
          {isAuth ? (
            <>
              {/* User Icon + Name */}
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <FaUserCircle className="text-3xl text-red-600 hover:text-red-700 transition-colors" />
                <span className="text-[#1E293B] font-medium">{user?.name}</span>
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-40 bg-white border rounded-md shadow-lg z-50">
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                      navigate("/");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <NavLink
              to="/login"
              className="px-5 py-2 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium transition-colors"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-3xl text-[#1E293B]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md border-t border-gray-200">
          <ul className="flex flex-col items-start gap-4 px-6 py-4">
            <li>
              <NavLink to="/" onClick={() => setMenuOpen(false)} className={linkStyle}>
                Home
              </NavLink>
            </li>
            {isAuth && (
              <>
                <li>
                  <NavLink to="/favorites" onClick={() => setMenuOpen(false)} className={linkStyle}>
                    Favorites
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/add-recipe" onClick={() => setMenuOpen(false)} className={linkStyle}>
                    Add Recipe
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/recipe-generator" onClick={() => setMenuOpen(false)} className={linkStyle}>
                    AI Generator
                  </NavLink>
                </li>
              </>
            )}
            <li>
              {isAuth ? (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                    navigate("/");
                  }}
                  className="w-full text-left px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center px-5 py-2 rounded-md bg-[#16A34A] hover:bg-[#15803D] text-white font-medium transition-colors"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
