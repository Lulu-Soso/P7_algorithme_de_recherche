export function dropdownFactory(data) {
  const ingredients = data.ingredients || [];
  const appliances = data.appliances || [];
  const utensils = data.ustensils || [];

  function getIngredientsDOM() {
    ingredients
      .map(
        (data) =>
          `
      ${data.ingredients
        .map((pIngredient) => `<p>${pIngredient.ingredient}</p>`)
        .join("")}
    `
      )
      .join("");
  }

  function getAppliancesDOM() {
    const ulOptionAppliances = document.querySelector(".option-appliances");

    ulOptionAppliances.innerHTML = appliances
      .map(
        (liAppliance) =>
          `
        <li>${liAppliance.appliance}</li>
    `
      )
      .join("");
  }

  function getUtensilsDOM() {
    const ulOptionUtensils = document.querySelector(".option-utensils");

    ulOptionUtensils.innerHTML = utensils
      .map(
        (liUtensil) =>
          `
        <li>${liUtensil.ustensils}</li>
    `
      )
      .join("");
  }

  return {
    ingredients,
    appliances,
    utensils,
    getIngredientsDOM,
    getAppliancesDOM,
    getUtensilsDOM
  };
}
