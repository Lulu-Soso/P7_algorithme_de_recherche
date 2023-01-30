import { changeInputColorForm } from "/scripts/header.js";
// import { recipeFactory } from "/scripts/factories/recipe-factory.js";
import { dataApi } from "/scripts/utils/data-api.js";
import { closeAllDropdowns } from "/scripts/dropdown.js";

const { getRecipes} = dataApi();

////////// Display all recipes //////////
async function displayAllRecipes(recipes) {
  const cardsContainer = document.querySelector(".cards-container");

  recipes.length = 15;

  cardsContainer.innerHTML = recipes
    .map(
      (recipe) =>
        `
    <article>
      <a href="#" aria-label="article de recette">
        <div class="card">
          <div class="div-img"></div>
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
              ${recipe.ingredients
                .map(
                  (ingredient) =>
                    `<p>${ingredient.ingredient}: ${
                      ingredient.quantity ? ingredient.quantity : ""
                    } ${ingredient.unit ? ingredient.unit : ""}</p>`
                )
                .join("")}
              </div>
            </div>
            <div class="right-content">
              <div class="text-content-right">
                <p>${recipe.description}</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </article>
      `
    )
    .join("");
}

////////// Display all ingredients //////////
async function displayIngredientsList(recipes) {
  const ulOptionIngredients = document.querySelector(".option-ingredients")

  ulOptionIngredients.innerHTML = recipes
  .map(
    (recipe) =>
      `
      ${recipe.ingredients
        .map(
          (ingredient) =>
            `<li onmouseover="show('Lait de coco')" onmouseout="hide()">${ingredient.ingredient}</li>`
        )
        .join("")}
    `
  )
  .join("");
}

////////// Display all appliances //////////
async function displayAppliancesList(recipes) {
  const ulOptionAppliances = document.querySelector(".option-appliances")

  ulOptionAppliances.innerHTML = recipes
  .map(
    (recipe) =>
      `
        <li onmouseover="show('Lait de coco')" onmouseout="hide()">${recipe.appliance}</li>

    `
  )
  .join("");
}

////////// Display all appliances //////////
async function displayUtensilsList(recipes) {
  const ulOptionUtensils = document.querySelector(".option-utensils")

  ulOptionUtensils.innerHTML = recipes
  .map(
    (recipe) =>
      `
        <li onmouseover="show('Lait de coco')" onmouseout="hide()">${recipe.ustensils}</li>
    `
  )
  .join("");
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
  closeAllDropdowns();
  displayRecipesBySearch();

  const recipes = await getRecipes();
  await displayAllRecipes(recipes);
  await displayIngredientsList(recipes)
  await displayAppliancesList(recipes)
  await displayUtensilsList(recipes)
}

init().then(() => {});
