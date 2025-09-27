"use client";

import { useState } from "react";
import { generateLocalRecipe } from "../../utils/localRecipeGenerator..js";
import {
  HiSparkles,
  HiRefresh,
  HiClock,
  HiUsers,
} from "react-icons/hi";
import { FaRobot } from "react-icons/fa";

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [cookingTime, setCookingTime] = useState("30");
  const [servings, setServings] = useState("4");
  const [generatedRecipes, setGeneratedRecipes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const generateRecipe = async () => {
    if (!ingredients.trim()) return;
    setIsGenerating(true);

    const recipe = generateLocalRecipe({
      ingredients,
      dietaryRestrictions,
      cookingTime,
      servings,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setGeneratedRecipes((prev) => [...prev, recipe]);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaRobot className="text-3xl text-[#16A34A]" />
            <h1 className="text-4xl font-bold text-[#1E293B]">AI Recipe Generator</h1>
            <FaRobot className="text-3xl text-[#16A34A]" />
          </div>
          <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
            Tell our robot chef what ingredients you have, and it’ll cook up a personalized recipe just for you!
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-[#FEE2E2] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Recipe Preferences</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">
                  Available Ingredients *
                </label>
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="chicken, tomatoes, onions, garlic, herbs..."
                  className="w-full p-3 border-2 border-[#FEE2E2] rounded-lg focus:border-[#16A34A] outline-none resize-none h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">
                  Dietary Restrictions
                </label>
                <input
                  type="text"
                  value={dietaryRestrictions}
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                  placeholder="vegetarian, gluten-free, dairy-free..."
                  className="w-full p-3 border-2 border-[#FEE2E2] rounded-lg focus:border-[#16A34A] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">
                    <HiClock className="inline mr-1" />
                    Cooking Time (min)
                  </label>
                  <select
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                    className="w-full p-3 border-2 border-[#FEE2E2] rounded-lg focus:border-[#16A34A] outline-none"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">
                    <HiUsers className="inline mr-1" />
                    Servings
                  </label>
                  <select
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    className="w-full p-3 border-2 border-[#FEE2E2] rounded-lg focus:border-[#16A34A] outline-none"
                  >
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="4">4 people</option>
                    <option value="6">6 people</option>
                    <option value="8">8 people</option>
                  </select>
                </div>
              </div>

              <button
                onClick={generateRecipe}
                disabled={!ingredients.trim() || isGenerating}
                className="w-full bg-[#16A34A] hover:bg-[#15803D] disabled:bg-[#CBD5E1] disabled:text-[#94A3B8] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating Recipe... Your robot chef is cooking!
                  </>
                ) : (
                  <>
                    <HiSparkles />
                    Generate Recipe
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Generated Recipes Section */}
        {generatedRecipes.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-[#1E293B] text-center">My Generated Recipes</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {generatedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="w-80 bg-white border-2 border-[#FEE2E2] rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col gap-4"
                >
                  <img
                    src="/images/chicken-ai.jpg"
                    alt={recipe.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div>
                    <span className="text-sm text-[#1E293B] font-medium bg-[#E0F2FE] px-3 py-1 rounded-full flex items-center gap-1">
                      🤖 AI Chef
                    </span>
                    <h3 className="text-xl font-bold text-[#1E293B] mt-2 line-clamp-2">{recipe.title}</h3>
                  </div>

                  <div className="text-sm text-[#64748B] mt-2">
                    <p>⏱ {recipe.cookTime} min</p>
                    <p>🍽 {recipe.servings} servings</p>
                  </div>

                  <div className="flex justify-center mt-auto">
                    <button
                      onClick={() => setSelectedRecipe(recipe)}
                      className="text-sm px-4 py-2 rounded-lg bg-[#16A34A] text-white hover:bg-[#15803D] transition font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal for Recipe Details */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 text-2xl text-[#EF4444] hover:text-[#DC2626] font-bold"
              >
                ✕
              </button>

              <div className="text-center text-5xl mb-4">🤖</div>
              <h2 className="text-3xl font-bold mb-6 text-[#1E293B] text-center pr-8">{selectedRecipe.title}</h2>

                       <img
                src="/images/chicken-ai.jpg"
                alt={selectedRecipe.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              <div className="prose prose-lg max-w-none">
                <h3 className="text-xl font-semibold text-[#1E293B] mb-4">Instructions</h3>
                <ol className="text-[#1E293B] text-lg whitespace-pre-line leading-relaxed space-y-2">
                  {selectedRecipe.instructions.map((step, index) => (
                    <li key={index}>
                      <strong className="text-[#16A34A] mr-2">{index + 1}.</strong> {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 bg-[#F1F5F9] p-4 rounded-xl">
                <h4 className="text-lg font-semibold text-[#1E293B] mb-2">Nutrition (per serving)</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-[#64748B]">
                  <div>Calories: {selectedRecipe.nutrition.calories}</div>
                  <div>Protein: {selectedRecipe.nutrition.protein}g</div>
                  <div>Carbs: {selectedRecipe.nutrition.carbs}g</div>
                  <div>Fat: {selectedRecipe.nutrition.fat}g</div>
                </div>
              </div>

              <p className="mt-6 text-sm text-[#16A34A] font-medium text-right bg-[#DCFCE7] px-3 py-1 rounded-full inline-block">
                Cook Time: {selectedRecipe.cookTime} min • Servings: {selectedRecipe.servings}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

             