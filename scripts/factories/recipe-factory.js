export function recipeFactory(data) {
  const { name, time, ingredients, description, appliance, ustensils } = data;

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

  function getIngredientsDOM() {
    return ingredients.map(ingredient => `${ingredient.ingredient}`).join("");
  }

  function getAppliancesDOM() {
    return `${appliance}`;
  }

  function getUtensilsDOM() {
    return ustensils.map(utensil => `${utensil}`).join("");
  }

  return {
    name,
    time,
    ingredients,
    description,
    getRecipeCardDOM,
    getIngredientsDOM,
    getAppliancesDOM,
    getUtensilsDOM,
  };
}

