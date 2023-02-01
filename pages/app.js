import { changeInputColorForm } from "/scripts/header.js";
import { recipeFactory } from "/scripts/factories/recipe-factory.js";
import { dataApi } from "/scripts/utils/data-api.js";
import { closeDropdowns } from "/scripts/dropdown.js";
// import { createDropdownBehavior } from "/scripts/dropdown.js";

const { getRecipes} = dataApi();

async function displayRecipes(recipes) {
  const cardsContainer = document.querySelector(".cards-container");

  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCardDOM = document.createElement("article");
    recipeCardDOM.innerHTML = recipeModel.getRecipeCardDOM();
    cardsContainer.appendChild(recipeCardDOM);
  });
}

////////// Display all ingredients //////////
async function displayIngredientsList(ingredients) {
  const ulOptionIngredients = document.querySelector(".option-ingredients")

  ulOptionIngredients.innerHTML = ingredients
  .map(
    (ingred) =>
      `
      ${ingred.ingredients
        .map(
          (ingredientLi) =>
            `<li>${ingredientLi.ingredient}</li>`
        )
        .join("")}
    `
  )
  .join("");
}

////////// Display all appliances //////////
async function displayAppliancesList(appliances) {
  const ulOptionAppliances = document.querySelector(".option-appliances")

  ulOptionAppliances.innerHTML = appliances
  .map(
    (liAppliance) =>
      `
        <li>${liAppliance.appliance}</li>
    `
  )
  .join("");
}

////////// Display all appliances //////////
async function displayUtensilsList(utensils) {
  const ulOptionUtensils = document.querySelector(".option-utensils")

  ulOptionUtensils.innerHTML = utensils
  .map(
    (liUtensil) =>
      `
        <li>${liUtensil.ustensils}</li>
    `
  )
  .join("");
}

////////// Display selected items dropdown  //////////
async function displayItems() {
  const optionTypes = [
    { selector: ".option-ingredients", ulId: "#ul-ingredients", background: "#3282f7" },
    { selector: ".option-appliances", ulId: "#ul-appliances", background: "#68d9a4" },
    { selector: ".option-utensils", ulId: "#ul-utensils", background: "#ed6454" }
  ];

  optionTypes.forEach(({ selector, ulId, background }) => {
    const optionType = document.querySelector(selector);
    const ulType = document.querySelector(ulId);

    optionType.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const selected = event.target.textContent;
        const className = background ? `style="background:${background}"` : "";
        ulType.innerHTML += `<li ${className}>${selected}<button><span aria-label="bouton de suppression">x</span></button></li>`;
      }
    });
  });

  // delete item on span click
  document.addEventListener("click", (event) => {
    if (event.target.tagName === "SPAN") {
      event.target.parentElement.parentElement.remove();
    }
  });
}

////////// Display recipes by tag name //////////


async function displayRecipesBySearch() {
  const cardsContainer = document.querySelector(".cards-container");
  const inputSearch = document.querySelector(".search-header > input");

  const recipes = await getRecipes();
  // const recipesName = await getRecipesName();

  inputSearch.addEventListener("input", async (e) => {
    e.preventDefault();
    const searchValue = e.target.value.toLowerCase();

    const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchValue));

    if (filteredRecipes.length === 0) {
      cardsContainer.innerHTML = "<h2>Aucun résultat</h2>";
    } else {
      let cardsHTML = "";
      for (const recipe of filteredRecipes) {
        cardsHTML += `
          <div class="card">
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
          </div>
        `;
      }
      cardsContainer.innerHTML = cardsHTML;
    }
  });
}

async function init() {
  changeInputColorForm();
  // createDropdownBehavior();
  await closeDropdowns();
  displayRecipesBySearch();
  displayItems()

  getRecipes().then(displayRecipes);

  getRecipes().then(displayIngredientsList);
  getRecipes().then(displayAppliancesList);
  getRecipes().then(displayUtensilsList);

  // const { getRecipes } = dataApi();
  // const recipes = await getRecipes();
  // await displayRecipes(recipes);

  // await getRecipes(recipes);
  // await displayIngredientsList(recipes)
  // await displayAppliancesList(recipes)
  // await displayUtensilsList(recipes)

  // const recipesName = await getRecipesName();
  // displayRecipesBySearch(recipesName)
}

init().then(() => {});
