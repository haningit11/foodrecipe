"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";
import {
  HiOutlineSparkles,
  HiOutlineFire,
  HiHeart,
  HiOutlineSearch,
  HiOutlineEmojiSad,
} from "react-icons/hi";

export default function Home() {
  const {
    recipeList,
    setRecipeList,
    loading,
    setLoading,
    searchParam,
    setSearchParam,
  } = useContext(GlobalContext);

  const [noResults, setNoResults] = useState(false);
  const searchInputRef = useRef(null);

  const fallbackRecipes = [
    {
      id: "53038",
      title: "Mustard Champ",
      image_url:
        "https://www.themealdb.com/images/media/meals/o7p9581608589317.jpg",
      publisher: "Irish Kitchen",
    },
  ];

  // Fetch default recipes
  useEffect(() => {
    async function fetchDefaults() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=meat"
        );
        if (!res.ok) throw new Error("Network error");

        const data = await res.json();

        if (data?.meals?.length) {
          const mapped = data.meals.map((meal) => ({
            id: meal.idMeal,
            title: meal.strMeal,
            image_url: meal.strMealThumb,
            publisher: meal.strArea || "Unknown Kitchen",
          }));
          setRecipeList(mapped);
          setNoResults(false);
        } else {
          setRecipeList(fallbackRecipes);
          setNoResults(false);
        }
      } catch (err) {
        console.warn("API failed, using fallback:", err.message);
        setRecipeList(fallbackRecipes);
      } finally {
        setLoading(false);
      }
    }

    if (!recipeList || recipeList.length === 0) {
      fetchDefaults();
    }
  }, [fallbackRecipes, recipeList, setLoading, setRecipeList]);

  // Handle search
  async function onSearch(e) {
    e.preventDefault();
    if (!searchParam.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchParam}`
      );
      const data = await res.json();

      if (data?.meals?.length) {
        const mapped = data.meals.map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image_url: meal.strMealThumb,
          publisher: meal.strArea || "Unknown Kitchen",
        }));
        setRecipeList(mapped);
        setNoResults(false);
      } else {
        setRecipeList([]);
        setNoResults(true);
      }
    } catch (err) {
      console.error(err);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16A34A] mx-auto mb-4"></div>
          <p className="text-[#1E293B] font-medium">
            Loading delicious recipes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#16A34A] via-[#22C55E] to-[#15803D] text-white overflow-hidden">
        {/* Floating blurred shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#22C55E]/40 blur-3xl animate-floatSlow"></div>
          <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-[#15803D]/40 blur-3xl animate-floatSlow delay-5000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-28 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Discover <span className="text-[#FEE2E2]">Delicious</span> Recipes
          </h1>
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Fresh flavors, healthy ingredients, and easy-to-cook dishes — explore your next favorite meal.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={onSearch}
            className="relative max-w-xl mx-auto flex items-center bg-white rounded-full shadow-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl focus-within:ring-4 focus-within:ring-[#FEE2E2]"
          >
            <input
              ref={searchInputRef}
              type="text"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              placeholder="Search recipes..."
              className="flex-1 px-6 py-4 text-[#1E293B] placeholder-gray-400 outline-none text-lg"
            />
            <button
              type="submit"
              className="px-6 py-4 bg-[#FEE2E2] hover:bg-[#FECACA] text-[#16A34A] transition-colors"
            >
              <HiOutlineSearch className="w-6 h-6" />
            </button>
          </form>

          {/* Feature badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full flex items-center gap-2 shadow-md transition-transform hover:scale-105">
              <HiOutlineSparkles className="text-white text-lg" />
              Fresh Ingredients
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full flex items-center gap-2 shadow-md transition-transform hover:scale-105">
              <HiOutlineFire className="text-white text-lg" />
              Easy Cooking
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full flex items-center gap-2 shadow-md transition-transform hover:scale-105">
              <HiHeart className="text-white text-lg" />
              Healthy Options
            </span>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="py-12 container mx-auto px-4">
        {!noResults && recipeList && recipeList.length > 0 ? (
          <>
            <h2 className="text-3xl font-bold text-[#1E293B] text-center mb-8">
              Popular Recipes
            </h2>
            <div className="flex flex-wrap justify-center gap-10">
              {recipeList.map((item) => (
                <RecipeItem key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : noResults ? (
          <div className="text-center mt-20">
            <HiOutlineEmojiSad className="text-6xl text-[#EF4444] mx-auto mb-4" />
            <p className="text-2xl font-bold text-[#1E293B] mb-2">
              No recipes found
            </p>
            <p className="text-[#1E293B] opacity-70">
              Try searching for another dish or ingredient.
            </p>
          </div>
        ) : (
          <div className="text-center mt-20">
            <HiOutlineFire className="text-6xl text-[#F97316] mb-4" />
            <p className="lg:text-4xl text-xl text-[#1E293B] font-extrabold mb-2">
              Nothing to show
            </p>
            <p className="text-[#1E293B] opacity-70">
              Start by searching for a delicious recipe above
            </p>
          </div>
        )}
      </div>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-floatSlow {
          animation: floatSlow 12s ease-in-out infinite;
        }
        .delay-5000 {
          animation-delay: 5s;
        }
      `}</style>
    </div>
  );
}
