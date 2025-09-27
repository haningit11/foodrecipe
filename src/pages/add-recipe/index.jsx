"use client";

import { useState, useContext } from "react";
import { GlobalContext } from "../../context";
import { HiOutlineTrash } from "react-icons/hi";

export default function AddRecipe() {
  const { userRecipes, setUserRecipes } = useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publisher, setPublisher] = useState("");
  const [instructions, setInstructions] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !instructions) return;

    const newRecipe = {
      id: Date.now().toString(),
      title,
      image_url: imageUrl.trim() || "/placeholder.jpg",
      publisher: publisher.trim() || "My Kitchen",
      instructions,
    };

    setUserRecipes([...userRecipes, newRecipe]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);

    setTitle("");
    setImageUrl("");
    setPublisher("");
    setInstructions("");
  };

  const handleRemove = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      const updated = userRecipes.filter((r) => r.id !== id);
      setUserRecipes(updated);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8 text-[#1E293B] text-center">Add Your Recipe</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-[#FEE2E2]"
        >
          <input
            type="text"
            placeholder="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-4 rounded-xl border-2 border-[#FEE2E2] focus:outline-none focus:border-[#16A34A] transition"
            required
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="p-4 rounded-xl border-2 border-[#FEE2E2] focus:outline-none focus:border-[#16A34A] transition"
          />
          <input
            type="text"
            placeholder="Publisher (optional)"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="p-4 rounded-xl border-2 border-[#FEE2E2] focus:outline-none focus:border-[#16A34A] transition"
          />
          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={6}
            className="p-4 rounded-xl border-2 border-[#FEE2E2] focus:outline-none focus:border-[#16A34A] resize-none transition"
            required
          />
          <button
            type="submit"
            className="bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold py-4 px-8 rounded-xl text-lg transition"
          >
            Add Recipe
          </button>
        </form>

        {showToast && (
          <p className="text-center mt-6 text-[#16A34A] font-semibold text-lg">
            ✅ Your recipe has been added successfully!
          </p>
        )}

        {userRecipes.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-[#1E293B] text-center">My Added Recipes</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {userRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="w-80 bg-white border-2 border-[#FEE2E2] rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col gap-4"
                >
                  <img
                    src={recipe.image_url || "/placeholder.jpg"}
                    alt={recipe.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div>
                    <span className="text-sm text-[#F97316] font-medium bg-[#FEE2E2] px-3 py-1 rounded-full">
                      {recipe.publisher}
                    </span>
                    <h3 className="text-xl font-bold text-[#1E293B] mt-2 line-clamp-2">{recipe.title}</h3>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <button
                      onClick={() => setSelectedRecipe(recipe)}
                      className="text-sm px-4 py-2 rounded-lg bg-[#16A34A] text-white hover:bg-[#15803D] transition font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRemove(recipe.id)}
                      title="Delete Recipe"
                      className="text-[#EF4444] text-xl hover:text-[#DC2626] transition p-2"
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedRecipe && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 text-2xl text-[#EF4444] hover:text-[#DC2626] font-bold"
              >
                ✕
              </button>

              <h2 className="text-3xl font-bold mb-6 text-[#1E293B] text-center pr-8">{selectedRecipe.title}</h2>

              <img
                src={selectedRecipe.image_url || "/placeholder.jpg"}
                alt={selectedRecipe.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              <div className="prose prose-lg max-w-none">
                <h3 className="text-xl font-semibold text-[#1E293B] mb-4">Instructions</h3>
                <p className="text-[#1E293B] text-lg whitespace-pre-line leading-relaxed">
                  {selectedRecipe.instructions}
                </p>
              </div>

              <p className="mt-6 text-sm text-[#F97316] font-medium text-right bg-[#FEE2E2] px-3 py-1 rounded-full inline-block">
                Publisher: {selectedRecipe.publisher}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}