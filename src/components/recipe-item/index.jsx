import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context";
import { AuthContext } from "../../context/AuthContextCreation";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi";

export default function RecipeItem({ item }) {
  const { handleAddToFavorite, favoritesList } = useContext(GlobalContext);
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const isFavorite = favoritesList.some((fav) => fav.id === item.id);

  const handleFavoriteToggle = () => {
    if (!isAuth) {
      alert("Please log in to manage favorites.");
      return;
    }
    handleAddToFavorite(item);
  };

  return (
    <div className="w-80 bg-white border-2 border-[#FEE2E2] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex flex-col gap-4 relative group">
      {/* Bookmark Icon */}
      <button
        onClick={handleFavoriteToggle}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200"
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <HiBookmark className="text-[#16A34A] text-xl" />
        ) : (
          <HiOutlineBookmark className="text-[#1E293B] text-xl hover:text-[#16A34A]" />
        )}
      </button>

      {/* Image + Info */}
      <div
        className="cursor-pointer"
        onClick={() => {
          if (!isAuth) {
            alert("Please log in to view recipe details.");
            return;
          }
          navigate(`/recipe-item/${item.id}`);
        }}
      >
        <img
          src={item.image_url || "/placeholder.jpg"}
          alt={item.title}
          className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
        />
        <div className="mt-4">
          <span className="text-sm text-[#F97316] font-medium bg-[#FEE2E2] px-2 py-1 rounded-full">
            {item.publisher}
          </span>
          <h4 className="text-xl font-bold text-[#1E293B] mt-2 line-clamp-2 leading-tight">
            {item.title}
          </h4>
        </div>
      </div>

      {/* View Recipe Button */}
      <Link
        to={isAuth ? `/recipe-item/${item.id}` : "#"}
        onClick={(e) => {
          if (!isAuth) {
            e.preventDefault();
            alert("Please log in to view recipe details.");
          }
        }}
        className="mt-auto bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-center"
      >
        View Recipe
      </Link>
    </div>
  );
}