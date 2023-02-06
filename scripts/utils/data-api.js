export function dataApi() {
  const URL = "data/data.json";
  const appliances = []
  const fetchData = async () => {
    let response = await fetch(URL);
    let data = await response.json();
    const recipes = [...data];
    const recipesName = data.map(item => item.name).flat();
    const appliances = data.map(item => item.appliance).flat();
    const ingredientsName = data.map(item => item.ingredients.map(ingredient => `<p>${ingredient.ingredient}</p>`))  // recent version js
    const ingredients = data.map(item => item.ingredients.map(ingredient => `<p>${ingredient.ingredient}: ${ingredient.quantity}${ingredient.unit}</p>`))
    const utensils = data.map(item => item.ustensils).flat();
    const description = data.map(item => item.description).flat()

    // console.log(recipes);
    // console.log(appliances);
    // console.log(recipesName);
    // console.log(ingredients);
    // console.log(utensils);
    // console.log(description)
    return {
      recipes: recipes,
      recipesName: recipesName,
      ingredientsName: ingredientsName,
      ingredients: ingredients,
      appliances: appliances,
      utensils: utensils,
      description: description
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

  const getAppliances = async () => {
    return (await fetchData()).appliances;
  };

  const getUtensils = async () => {
    return (await fetchData()).utensils;
  };

  const getDescriptions = async () => {
    return (await fetchData()).description;
  };

  return {
    fetchData,
    getRecipes,
    getIngredients,
    getIngredientsName,
    getRecipesByName,
    getAppliances,
    getUtensils,
    getDescriptions
  };
}
