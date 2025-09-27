import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import {
  HiBookmark,
  HiOutlineBookmark,
  HiArrowLeft,
} from "react-icons/hi";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    userRecipes,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);
  const isFavorite = favoritesList?.some((fav) => fav.id === id);

  useEffect(() => {
    const localRecipe = userRecipes.find((r) => r.id === id);
    if (localRecipe) {
      setRecipeDetailsData(localRecipe);
      setLoading(false);
      return;
    }

    async function fetchDetails() {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        if (data?.meals?.length) {
          const meal = data.meals[0];
          const mapped = {
            id: meal.idMeal.toString(),
            title: meal.strMeal,
            image_url: meal.strMealThumb,
            publisher: meal.strArea || "Unknown Kitchen",
            instructions: meal.strInstructions,
          };
          setRecipeDetailsData(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch recipe details:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id, userRecipes, setRecipeDetailsData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16A34A] mx-auto mb-4"></div>
          <p className="text-[#1E293B] font-medium">Loading recipe details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#1E293B] hover:text-[#16A34A] transition-colors"
          >
            <HiArrowLeft className="text-xl" />
            <span className="font-medium">Back</span>
          </button>

          <button
            onClick={() => handleAddToFavorite(recipeDetailsData)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-[#FEE2E2] hover:border-[#16A34A] transition-colors"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <>
                <HiBookmark className="text-[#16A34A] text-xl" />
                <span className="text-[#16A34A] font-medium">Saved</span>
              </>
            ) : (
              <>
                <HiOutlineBookmark className="text-[#1E293B] text-xl" />
                <span className="text-[#1E293B] font-medium">Save Recipe</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={recipeDetailsData.image_url || "/placeholder.jpg"}
            alt={recipeDetailsData.title}
            className="w-full h-80 object-cover rounded-t-2xl"
          />

          <div className="p-8">
            <div className="mb-4">
              <span className="text-sm text-[#F97316] font-medium bg-[#FEE2E2] px-3 py-1 rounded-full">
                {recipeDetailsData.publisher}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-6 text-[#1E293B]">
              {recipeDetailsData.title}
            </h1>

            <div className="bg-[#FAFAF9] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#1E293B] mb-4">
                Instructions
              </h3>
              {recipeDetailsData.instructions
                .split("\n")
                .filter((line) => line.trim() !== "")
                .map((line, index) => (
                  <p
                    key={index}
                    className="mb-3 text-[#1E293B] text-lg leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}