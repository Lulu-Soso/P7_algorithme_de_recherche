export function dropdownFactory(data) {
  const {ingredients, appliance, utensils } = data;
  // const ingredients = data.ingredients || [];
  // const appliances = data.appliance || [];
  // const utensils = data.ustensils || [];

  // console.log(appliances)

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
    return `
    ${appliance}
    `
  }

  function getUtensilsDOM() {
    const utensils = data.ustensils;
    return `
    ${utensils}
    `
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
