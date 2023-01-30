export function dataApi() {
  const URL = "data/data.json";

  const fetchData = async () => {
    let response = await fetch(URL);
    let data = await response.json();
    const recipes = [...data];
    const recipesName = data.name;
    const ingredientsList = data.map(item => item.ingredients).flat();  // recent version js
    const ingredients = data.map(item => item.ingredients.map(ingredient => `<p>${ingredient.ingredient}: ${ingredient.quantity}${ingredient.unit}</p>`))
    const utensils = [].concat(...data.map(item => item.ustensils)); // old version js

    // console.log(recipes);
    // console.log(recipesName);
    // console.log(ingredients);
    // console.log(utensils);
    return {
      recipes: recipes,
      recipesName: recipesName,
      ingredientsList: ingredientsList,
      ingredients: ingredients,
      utensils: utensils
    };
  };

  const getRecipes = async () => {
    return (await fetchData()).recipes;
  };

  const getRecipesName = async () => {
    return (await fetchData()).recipesName;
  };

  const getIngredients = async () => {
    return (await fetchData()).ingredients;
  };

  const getIngredientsList = async () => {
    return (await fetchData()).ingredientsList;
  };

  const getUtensils = async () => {
    return (await fetchData()).utensils;
  };

  return {
    fetchData,
    getRecipes,
    getIngredients,
    getIngredientsList,
    getRecipesName,
    getUtensils,
  };
}
