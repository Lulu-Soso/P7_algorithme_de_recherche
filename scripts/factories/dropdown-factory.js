export function dropdownFactory(recipes) {
  const {ingredients, appliance, utensils } = recipes;

  function getIngredientsDOM() {
    return `
    ${ingredients
        .map(
            (ingredient) =>
                `${ingredient.ingredient}`
        )
        .join("")}
    `
  }

  function getAppliancesDOM() {
    // const appliance = data.appliance;
    return `
    ${appliance}
    `
  }

  function getUtensilsDOM() {
    const utensils = recipes.ustensils;
    return utensils.join(", ");
  }

  return {
    ingredients,
    appliance,
    utensils,
    getIngredientsDOM,
    getAppliancesDOM,
    getUtensilsDOM
  };
}
