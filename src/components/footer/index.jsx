import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextCreation";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const { isAuth } = useContext(AuthContext);

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="/images/logo-main.png"
            alt="FoodRecipe Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="text-xl font-bold text-[#16A34A] tracking-tight">
            FoodRecipe
          </span>
        </NavLink>

        {/* Links (Conditionally Rendered) */}
        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          <li>
            <NavLink
              to="/"
              className="text-gray-700 hover:text-[#16A34A] transition-colors"
            >
              Home
            </NavLink>
          </li>

          {isAuth && (
            <>
              <li>
                <NavLink
                  to="/favorites"
                  className="text-gray-700 hover:text-[#16A34A] transition-colors"
                >
                  Favorites
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-recipe"
                  className="text-gray-700 hover:text-[#16A34A] transition-colors"
                >
                  Add Recipe
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recipe-generator"
                  className="text-gray-700 hover:text-[#16A34A] transition-colors"
                >
                  AI Generator
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Socials */}
        <div className="flex items-center gap-5 text-gray-600">
          <a
            href="#"
            className="hover:text-[#16A34A] transition-colors"
            aria-label="Facebook"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="#"
            className="hover:text-[#16A34A] transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="#"
            className="hover:text-[#16A34A] transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter size={18} />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white text-center text-sm text-gray-600 py-3 border-t border-gray-200">
        © {new Date().getFullYear()} FoodRecipe. All rights reserved.
      </div>
    </footer>
  );
}
