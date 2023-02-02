export function dataApi() {
  const URL = "data/data.json";

  const fetchData = async () => {
    let response = await fetch(URL);
    let data = await response.json();
    const recipes = [...data];
    const recipesName = data.map(item => item.name).flat();
    const ingredientsName = data.map(item => item.ingredients.map(ingredient => `<p>${ingredient.ingredient}</p>`))  // recent version js
    const ingredients = data.map(item => item.ingredients.map(ingredient => `<p>${ingredient.ingredient}: ${ingredient.quantity}${ingredient.unit}</p>`))
    const utensils = [].concat(...data.map(item => item.ustensils)); // old version js

    console.log(recipes);
    console.log(recipesName);
    // console.log(ingredients);
    console.log(utensils);
    return {
      recipes: recipes,
      recipesName: recipesName,
      ingredientsName: ingredientsName,
      ingredients: ingredients,
      utensils: utensils
    };
  };

  const getRecipes = async () => {
    return (await fetchData()).recipes;
  };

  const getRecipesByName = async () => {
    return (await fetchData()).recipesName;
  };

  const getIngredients = async () => {
    return (await fetchData()).ingredients;
  };

  const getIngredientsName = async () => {
    return (await fetchData()).ingredientsName;
  };

  const getUtensils = async () => {
    return (await fetchData()).utensils;
  };

  return {
    fetchData,
    getRecipes,
    getIngredients,
    getIngredientsName,
    getRecipesByName,
    getUtensils,
  };
}
