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
    // const appliance = data.appliance;
    return `
    ${appliance}
    `
  }

  function getUtensilsDOM() {
    const utensils = data.ustensils;
    // const utensils = [].concat(...data.map(item => item.ustensils));
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
