import { changeInputColorForm } from "/scripts/header.js";
// import { recipeFactory } from "/scripts/factories/recipe-factory.js";
import { dataApi } from "/scripts/utils/data-api.js";
import { closeDropdowns } from "/scripts/dropdown.js";
// import { createDropdownBehavior } from "/scripts/dropdown.js";

const { getRecipes} = dataApi();

////////// Display all recipes //////////
async function displayAllRecipes(recipes) {
  const cardsContainer = document.querySelector(".cards-container");
  
  // recipes.length = 15;
  
  cardsContainer.innerHTML = recipes.map(
    (recipe) => {
      const picture = `/assets/images/recipes-name/${recipe.name.replace(/ /g, '-')}.jpg`;
      return `
      <article>
        <div class="card">
          <div class="div-img"><img src="${ picture }" alt="${recipe.name}" aria-label="Nom de la recette ${recipe.name}"></div>
          <div class="card-title">
            <h2>${recipe.name}</h2>
            <div class="time">
              <img src="/assets/images/hour.png" aria-label="image de temps de préparation" alt="image de temps de préparation">
              <h2>${recipe.time}</h2>
            </div>
          </div>
          <div class="card-content">
            <div class="left-content">
              <div class="text-content-left">
              ${recipe.ingredients.map(ingredient => 
                `<p>${ingredient.ingredient}: ${(ingredient.quantity ? ingredient.quantity : "")} ${(ingredient.unit ? ingredient.unit : "")}</p>`
              ).join("")}
              </div>
            </div>
            <div class="right-content">
              <div class="text-content-right">
                <p>${recipe.description}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
      `;
    }
  ).join("");
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
async function displayRecipesBySearch(recipes) {
  const cardsContainer = document.querySelector(".cards-container");
  const inputSearch = document.querySelector("input");

  if (recipes.name === null) {
    console.log(recipes.name);
    cardsContainer.innerHTML = "<h2>Aucun résultat</h2>";
  } else {
    inputSearch.addEventListener("input", (e) => {
      console.log(e.target.value);
    });
  }
}


async function init() {
  changeInputColorForm();
  // createDropdownBehavior();
  await closeDropdowns();
  displayRecipesBySearch();
  displayItems()

  const recipes = await getRecipes();
  await displayAllRecipes(recipes);
  await displayIngredientsList(recipes)
  await displayAppliancesList(recipes)
  await displayUtensilsList(recipes)
}

init().then(() => {});
