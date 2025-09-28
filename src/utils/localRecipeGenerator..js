

export function generateLocalRecipe({ ingredients, cookingTime, servings }) {
  const ingList = ingredients
    .split(",")
    .map((ing) => ing.trim())
    .filter(Boolean);

  const mainIngredient = ingList[0] || "Mystery Ingredient";

  const title = `${mainIngredient} Surprise Delight`;

  const instructions = [
    `Wash and prep all ingredients.`,
    `Heat a pan and add ${mainIngredient}.`,
    `Add remaining ingredients and stir well.`,
    `Simmer for ${cookingTime} minutes.`,
    `Adjust seasoning to taste.`,
    `Serve hot for ${servings} people.`,
  ];

  const nutrition = {
    calories: Math.floor(Math.random() * 200) + 300,
    protein: Math.floor(Math.random() * 20) + 10,
    carbs: Math.floor(Math.random() * 30) + 20,
    fat: Math.floor(Math.random() * 15) + 5,
  };

  return {
    id: Date.now().toString(),
    title,
    image_url: "/images/chicken-ai.jpg",
    publisher: "Your AI Chef",
    cookTime: cookingTime,
    servings,
    ingredients: ingList,
    instructions,
    nutrition,
  };
}