// import { changeInputColorForm } from "/scripts/header.js";
// import { recipeFactory } from "/scripts/factories/recipe-factory.js";
// import { dataApi } from "/scripts/utils/data-api.js";
// import { closeDropdowns } from "/scripts/dropdown.js";

// const { getRecipes } = dataApi();

// async function displayRecipes(recipes) {
//   const cardsContainer = document.querySelector(".cards-container");

//   recipes.forEach((recipe) => {
//     const recipeModel = recipeFactory(recipe);
//     const recipeCardDOM = document.createElement("article");
//     recipeCardDOM.innerHTML = recipeModel.getRecipeCardDOM();
//     cardsContainer.appendChild(recipeCardDOM);
//   });
// }


// ////////// Display all ingredients //////////
// async function displayIngredientsList(ingredients) {
//   const ulOptionIngredients = document.querySelector(".option-ingredients")

//   // Create a Set to store unique ingredient names
//   const ingredientSet = new Set();

//   ulOptionIngredients.innerHTML = ingredients
//   .map(
//     (ingred) =>
//       `
//       ${ingred.ingredients
//         // For each ingredient object, filter out ingredients that are already in the ingredientSet
//         // Pour chaque objet d'ingrédient, filtrez les ingrédients qui sont déjà dans l'IngredientSet
//         .filter(ingredLi => !ingredientSet.has(ingredLi.ingredient))
//         .map(
//           (ingredLi) => {
//              // If it has not, add it to the applianceSet and return a list item with its name
//             ingredientSet.add(ingredLi.ingredient);
//             return `<li><p>${ingredLi.ingredient}</p></li>`
//           }
//         )
//         .join("")}
//     `
//   )
//   .join("");
// }

// ////////// Display all appliances //////////
// async function displayAppliancesList(appliances) {
//   const ulOptionAppliances = document.querySelector(".option-appliances");

//   // Create a Set to store unique appliance names
//   const applianceSet = new Set();

//   // Set the innerHTML of the selected element to the result of mapping over the appliances array
//   ulOptionAppliances.innerHTML = appliances
//     .map(liAppliance => {
//       // Check if the appliance name has already been added to the applianceSet
//       if (!applianceSet.has(liAppliance.appliance)) {
//         // If it has not, add it to the applianceSet and return a list item with its name
//         applianceSet.add(liAppliance.appliance);
//         return `<li><p>${liAppliance.appliance}</p></li>`;
//       }
//     })
//     .filter(Boolean)
//     .join("");
// }


// ////////// Display all appliances //////////
// async function displayUtensilsList(utensils) {
//   const ulOptionUtensils = document.querySelector(".option-utensils")

//   ulOptionUtensils.innerHTML = utensils
//   .map(
//     (liUtensil) =>
//       `
//         <li><p>${liUtensil.ustensils}</p></li>
//     `
//   )
//   .join("");
// }

// ////////// Display selected items dropdown  //////////
// async function displayItems() {
//   const optionTypes = [
//     { selector: ".option-ingredients", ulId: "#ul-ingredients", background: "#3282f7" },
//     { selector: ".option-appliances", ulId: "#ul-appliances", background: "#68d9a4" },
//     { selector: ".option-utensils", ulId: "#ul-utensils", background: "#ed6454" }
//   ];

//   optionTypes.forEach(({ selector, ulId, background }) => {
//     const optionType = document.querySelector(selector);
//     const ulType = document.querySelector(ulId);

//     optionType.addEventListener("click", (event) => {
//       if (event.target.tagName === "LI") {
//         const selected = event.target.textContent;
//         const className = background ? `style="background:${background}"` : "";
//         ulType.innerHTML += `<li ${className}>${selected}<button><span aria-label="bouton de suppression">x</span></button></li>`;
//       }
//     });
//   });

//   // delete item on span click
//   document.addEventListener("click", (event) => {
//     if (event.target.tagName === "SPAN") {
//       event.target.parentElement.parentElement.remove();
//     }
//   });
// }

// // ////////// Display recipes by tag name //////////
// async function displayRecipesBySearch() {
//   const cardsContainer = document.querySelector(".cards-container");
//   const inputSearch = document.querySelector(".search-header > input");

//   const data = await getRecipes();
//   const recipes = data.map(datum => recipeFactory(datum));

//   inputSearch.addEventListener("input", async (e) => {
//     e.preventDefault();
//     const searchValue = e.target.value.toLowerCase();

//     const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchValue));

//     if (filteredRecipes.length === 0) {
//       cardsContainer.innerHTML = "<h2>Aucun résultat</h2>";
//     } else {
//       let cardsHTML = "";
//       for (const recipe of filteredRecipes) {
//         cardsHTML += recipe.getRecipeCardDOM();
//       }
//       cardsContainer.innerHTML = cardsHTML;
//     }
//   });
// }


// async function init() {
//   changeInputColorForm();
//   await closeDropdowns();
//   displayItems()

//   getRecipes().then(displayRecipes);
//   getRecipes().then(displayRecipesBySearch);

//   getRecipes().then(displayIngredientsList);
//   getRecipes().then(displayAppliancesList);
//   getRecipes().then(displayUtensilsList);
// }

// init().then(() => {});
