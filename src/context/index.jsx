import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GlobalContext = createContext();

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchParam}`
      );

      if (res.ok) {
        const data = await res.json();

        if (data?.meals) {
          const mappedRecipes = data.meals.map((meal) => ({
            id: meal.idMeal.toString(),
            title: meal.strMeal,
            image_url: meal.strMealThumb,
            publisher: meal.strArea || "Unknown Kitchen",
          }));

          const filteredUserRecipes = userRecipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(searchParam.toLowerCase())
          );

          const combinedRecipes = [...filteredUserRecipes, ...mappedRecipes];
          setRecipeList(combinedRecipes);
          setLoading(false);
          setSearchParam("");
          navigate("/");
          return;
        }
      }
    } catch (e) {
      console.log("API failed:", e.message);
    }

    setRecipeList([]);
    setLoading(false);
    setSearchParam("");
  }

  function handleAddToFavorite(getCurrentItem) {
    const exists = favoritesList.some(
      (item) => item.id === getCurrentItem.id
    );

    if (exists) {
      const updated = favoritesList.filter(
        (item) => item.id !== getCurrentItem.id
      );
      setFavoritesList(updated);
    } else {
      setFavoritesList([...favoritesList, getCurrentItem]);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        loading,
        setLoading,
        recipeList,
        setRecipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        favoritesList,
        handleAddToFavorite,
        userRecipes,
        setUserRecipes,
        handleSubmit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext };