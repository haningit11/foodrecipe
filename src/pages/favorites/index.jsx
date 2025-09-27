import { useContext } from "react";
import RecipeItem from "../../components/recipe-item";
import { GlobalContext } from "../../context";
import { HiOutlineBookmark } from "react-icons/hi";

export default function Favorites() {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="min-h-screen py-12 container mx-auto px-4 flex flex-col items-center">
      {favoritesList && favoritesList.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-10">
          {favoritesList.map((item) => (
            <RecipeItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center animate-fadeIn">
          {/* Cute icon */}
          <HiOutlineBookmark className="text-[#F87171] text-7xl mb-6 animate-bounce" />

          {/* Main message */}
          <p className="text-3xl lg:text-5xl font-extrabold text-[#1E293B] mb-4">
            No favorites yet!
          </p>

          {/* Suggestion text */}
          <p className="text-lg lg:text-xl text-gray-600 max-w-md mb-6">
            Start exploring recipes and add your favorite dishes here. Your culinary journey awaits!
          </p>

          {/* Optional CTA button */}
          <a
            href="/"
            className="px-6 py-3 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium transition-colors"
          >
            Explore Recipes
          </a>
        </div>
      )}
    </div>
  );
}
