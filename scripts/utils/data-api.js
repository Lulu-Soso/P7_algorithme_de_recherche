export function dataApi() {
  const URL = "data/data.json";
  const fetchData = async () => {
    let response = await fetch(URL);
    let data = await response.json();
    const recipes = [...data];
    const appliances = data.map(item => item.appliance).flat();
    const ingredients = data.map(item => item.ingredients.map(ingredient => `<p>${ingredient.ingredient}: ${ingredient.quantity}${ingredient.unit}</p>`))
    const utensils = data.map(item => item.ustensils).flat();

    // console.log(recipes);
    // console.log(appliances);
    // console.log(ingredients);
    // console.log(utensils);
    return {
      "recipes": recipes,
      "ingredients": ingredients,
      "appliances": appliances,
      "utensils": utensils,
    };
  };

  const getRecipes = async () => {
      return (await fetchData()).recipes;
  };

    const getIngredients = async (recipes) => {
        const ulOptionIngredients = document.querySelector(".option-ingredients");
        // Concatenate all the ingredients arrays from each recipe into a single array
        const uniqueIngredients = recipes.reduce((acc, recipe) => {
            return acc.concat(recipe.ingredients.map((ingredient) => capitalize(ingredient.ingredient)));
        }, []);

        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        // Use a set to get only unique values from the uniqueIngredients array and convert it back to an array
        // Generate an HTML string with a list of <li> elements, each displaying a unique ingredient
        ulOptionIngredients.innerHTML = [...new Set(uniqueIngredients)]
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("");
    };

    const getAppliances = async (recipes) => {
        const ulOptionAppliances = document.querySelector(".option-appliances");

        const uniqueAppliances = [...new Set(recipes.map((recipe) => capitalize(recipe.appliance)))];

        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        ulOptionAppliances.innerHTML = uniqueAppliances
            .map((appliance) => `<li>${appliance}</li>`)
            .join("");
    };

    const getUtensils = async (recipes) => {
        const ulOptionUtensils = document.querySelector(".option-utensils");

        // Concatenate all the utensils arrays from each recipe into a single array
        const uniqueUtensils = recipes.reduce((acc, recipe) => {
            // Convert each utensil to uppercase and concatenate them
            return acc.concat(recipe.ustensils.map((utensil) => capitalize(utensil)));
        }, []);

        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        // Use a set to get only unique values from the uniqueUtensils array and convert it back to an array
        // Generate an HTML string with a list of <li> elements, each displaying a unique utensil
        ulOptionUtensils.innerHTML = [...new Set(uniqueUtensils)]
            .map((utensil) => `<li>${utensil}</li>`)
            .join("");
    };

  return {
    fetchData,
    getRecipes,
    getIngredients,
    getAppliances,
    getUtensils
  };
}
