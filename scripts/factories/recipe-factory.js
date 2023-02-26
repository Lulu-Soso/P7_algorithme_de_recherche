export function recipeFactory(data) {
  const { name, time, ingredients, description, appliance, ustensils, recipes } = data;

  // const cardsContainer = document.querySelector(".cards-container");
  const ulOptionAppliances = document.querySelector(".option-appliances");
  const ulOptionIngredients = document.querySelector(".option-ingredients");
  const ulOptionUtensils = document.querySelector(".option-utensils");

  function getRecipeCardDOM() {
    const picture = `/assets/images/recipes-name/${name.replace(/ /g,"-")}.jpg`;

    return `
        <div class="card">
          <div class="div-img"><img src="${ picture}" alt="${name}" aria-label="Nom de la recette ${name}"></div>
          <div class="card-title">
            <h2>${name}</h2>
            <div class="time">
              <img src="/assets/images/hour.png" aria-label="image de temps de préparation" alt="image de temps de préparation">
              <h2>${time}</h2>
            </div>
          </div>
          <div class="card-content">
            <div class="left-content">
              <div class="text-content-left">
              ${ingredients
        .map(
            (ingredient) =>
                `<p>${ingredient.ingredient}: ${ ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</p>`
        )
        .join("")}
              </div>
            </div>
            <div class="right-content">
              <div class="text-content-right">
                <p>${description}</p>
              </div>
            </div>
          </div>
        </div>
      `;
  }

  function getIngredientsDOM() {    // Concatenate all the ingredients arrays from each recipe into a single array
    const uniqueIngredients = recipes.reduce((acc, recipe) => {
      return acc.concat(recipe.ingredients.map(ingredient => ingredient.ingredient));
    }, []);
// Use a set to get only unique values from the uniqueIngredients array and convert it back to an array
// Generate an HTML string with a list of <li> elements, each displaying a unique ingredient
    ulOptionIngredients.innerHTML = [...new Set(uniqueIngredients)].map(ingredient => `<li>${ingredient}</li>`).join("");
  }

  function getAppliancesDOM() {
    return `${appliance}`;
  }

  function getUtensilsDOM() {
    return ustensils.map(utensil => `${utensil}`).join("");
  }

  // function getFilteredOptionsByRecipe(filterFunction) {
  //   const filteredRecipes = recipes.filter(filterFunction);
  //   let cardsHTML = "";
  //   const uniqueIngredients = [];
  //   const uniqueAppliances = [];
  //   const uniqueUtensils = [];
  //   for (const recipe of filteredRecipes) {
  //     cardsHTML += recipe.getRecipeCardDOM();
  //     uniqueIngredients.push(...recipe.ingredients.map(ingredient => ingredient.ingredient));
  //     uniqueAppliances.push(recipe.appliance);
  //     uniqueUtensils.push(...recipe.ustensils);
  //   }
  //
  //   // Affiche les ingrédients uniques associés aux recettes filtrées dans la liste déroulante des ingrédients
  //   ulOptionIngredients.innerHTML = [...new Set(uniqueIngredients)].map(ingredient => `<li>${ingredient}</li>`).join("");
  //
  //   // Affiche les appareils uniques associés aux recettes filtrées dans la liste déroulante des appareils
  //   ulOptionAppliances.innerHTML = [...new Set(uniqueAppliances)].map(appliance => `<li>${appliance}</li>`).join("");
  //
  //   // Affiche les ustensiles uniques associés aux recettes filtrées dans la liste déroulante des ustensiles
  //   ulOptionUtensils.innerHTML = [...new Set(uniqueUtensils)].map(utensil => `<li>${utensil}</li>`).join("");
  // }

  return {
    name,
    time,
    ingredients,
    description,
    appliance,
    ustensils,
    recipes,
    getRecipeCardDOM,
    getIngredientsDOM,
    getAppliancesDOM,
    getUtensilsDOM,
    // getFilteredOptionsByRecipe
  };
}

