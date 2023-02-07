import { dataApi } from "/scripts/utils/data-api.js";
import { changeInputColorForm } from "/scripts/header.js";
import { recipeFactory } from "/scripts/factories/recipe-factory.js";
import { closeDropdowns } from "/scripts/dropdown.js";
import {dropdownFactory} from "../scripts/factories/dropdown-factory.js";
// import { createDropdownBehavior } from "/scripts/dropdown.js";

const { getRecipes, getUtensils, getAppliances} = dataApi();

async function displayRecipes(recipes) {
  const cardsContainer = document.querySelector(".cards-container");
  const ulOptionAppliances = document.querySelector(".option-appliances");
  const ulOptionIngredients = document.querySelector(".option-ingredients");
  const ulOptionUtensils = document.querySelector(".option-utensils");

  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCardDOM = document.createElement("article");
    recipeCardDOM.innerHTML = recipeModel.getRecipeCardDOM();
    cardsContainer.appendChild(recipeCardDOM);
  });

// Concatenate all the ingredients arrays from each recipe into a single array
  const uniqueIngredients = recipes.reduce((acc, recipe) => {
    return acc.concat(recipe.ingredients.map(ingredient => ingredient.ingredient));
  }, []);
// Use a set to get only unique values from the uniqueIngredients array and convert it back to an array
// Generate an HTML string with a list of <li> elements, each displaying a unique ingredient
  ulOptionIngredients.innerHTML = [...new Set(uniqueIngredients)].map(ingredient => `<li>${ingredient}</li>`).join("");

  const uniqueAppliances = [...new Set(recipes.map(recipe => recipe.appliance))];
  ulOptionAppliances.innerHTML = uniqueAppliances.map(appliance => `<li>${appliance}</li>`).join("");

// Concatenate all the utensils arrays from each recipe into a single array
  const uniqueUtensils = recipes.reduce((acc, recipe) => {
// Convert each utensil to uppercase and concatenate them
    return acc.concat(recipe.ustensils.map(utensil => utensil[0].toUpperCase() + utensil.slice(1)));
  }, []);

// Use a set to get only unique values from the uniqueUtensils array and convert it back to an array
// Generate an HTML string with a list of <li> elements, each displaying a unique utensil
  ulOptionUtensils.innerHTML = [...new Set(uniqueUtensils)].map(utensil => `<li>${utensil}</li>`).join("");
}

// function displayIngredients(ingredients) {
//   const ulOptionIngredients = document.querySelector(".option-ingredients");
//
//   ingredients.forEach((ingredient) => {
//     const recipeModel = recipeFactory(ingredient);
//     const ingredientListItem = document.createElement("li");
//     ingredientListItem.innerHTML = recipeModel.getIngredientsDOM();
//     ulOptionIngredients.appendChild(ingredientListItem);
//   });
// }

// function displayAppliances(appliance) {
//   const ulOptionAppliances = document.querySelector(".option-appliances");
//
//   appliance.forEach((appli) => {
//     const recipeModel = recipeFactory(appli);
//     const applianceListItem = document.createElement("li");
//     applianceListItem.innerHTML = recipeModel.getAppliancesDOM();
//     ulOptionAppliances.appendChild(applianceListItem);
//   });
// }

// function displayUtensils(utensils) {
//   const ulOptionUtensils = document.querySelector(".option-utensils");
//
//   utensils.forEach((utensil) => {
//     const recipeModel = recipeFactory(utensil);
//     const utensilListItem = document.createElement("li");
//     utensilListItem.innerHTML = recipeModel.getUtensilsDOM();
//     ulOptionUtensils.appendChild(utensilListItem);
//   });
// }




////////// Display all ingredients //////////
// async function displayIngredientsList(ingredients) {
//   const ulOptionIngredients = document.querySelector(".option-ingredients")
//
//   // Create a Set to store unique ingredient names
//   const ingredientSet = new Set();
//
//   // Set the innerHTML of the selected element to the result of mapping over the ingredients array
//   ulOptionIngredients.innerHTML = ingredients
//   .map(
//     (ingred) =>
//       `
//       ${ingred.ingredients
//         // For each ingredient object, filter out ingredients that are already in the ingredientSet
//         // Pour chaque objet d'ingrédient, filtrer les ingrédients qui sont déjà dans l'IngredientSet
//         .filter(ingredLi => !ingredientSet.has(ingredLi.ingredient))
//         .map(
//           (ingredLi) => {
//              // If it has not, add it to the ingredientSet and return a list item with its name
//             ingredientSet.add(ingredLi.ingredient);
//             return `<li>${ingredLi.ingredient}</li>`
//           }
//         )
//         .join("")}
//     `
//   )
//   .join("");
// }

////////// Display all appliances //////////
// async function displayAppliancesList(appliances) {
//   const ulOptionAppliances = document.querySelector(".option-appliances");
//
//   const applianceSet = new Set();
//
//   ulOptionAppliances.innerHTML = appliances
//     .map(liAppliance => {
//       if (!applianceSet.has(liAppliance.appliance)) {
//         applianceSet.add(liAppliance.appliance);
//         return `<li>${liAppliance.appliance}</li>`;
//       }
//     })
//     .filter(Boolean)
//     .join("");
// }

//////// Display all utensils //////////
// function displayUtensilsList(recipes) {
//   const ulOptionUtensils = document.querySelector(".option-utensils");
//
//   // Concatenate all the utensils arrays from each recipe into a single array
//   const uniqueUtensils = recipes.reduce((acc, recipe) => {
//     // Convert each utensil to uppercase and concatenate them
//     return acc.concat(recipe.ustensils.map(utensil => utensil[0].toUpperCase() + utensil.slice(1)));
//   }, []);
//
//   // Use a set to get only unique values from the uniqueUtensils array and convert it back to an array
//   // Generate an HTML string with a list of <li> elements, each displaying a unique utensil
//   ulOptionUtensils.innerHTML = [...new Set(uniqueUtensils)].map(utensil => `<li>${utensil}</li>`).join("");
// }

////////// Display selected items dropdown  //////////
async function displayItemsDropdowns() {
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
        console.log(event);
        const selected = event.target.textContent;
        const className = background ? `style="background:${background}"` : "";
        ulType.innerHTML += `<li ${className}>${selected}<button><span aria-label="bouton de suppression">x</span></button></li>`;
      }
    });

  });

  // delete item on span click
  document.addEventListener("click", (event) => {
    if (event.target.tagName === "SPAN") {
      console.log(event);
      event.target.parentElement.parentElement.remove();
    }
  });
}

////////// Display recipes by tag name //////////


async function displayRecipesBySearch() {
  const cardsContainer = document.querySelector(".cards-container");
  const inputSearch = document.querySelector(".search-header > input");

  const ulOptionAppliances = document.querySelector(".option-appliances");
  const ulOptionIngredients = document.querySelector(".option-ingredients");
  const ulOptionUtensils = document.querySelector(".option-utensils");

  const data = await getRecipes();
  const recipes = data.map(datum => recipeFactory(datum));
  console.log(data)

  inputSearch.addEventListener("input", async (e) => {
    e.preventDefault();
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.length >= 3) {
      const filteredRecipes = recipes.filter(recipe => (recipe.name.toLowerCase().includes(searchValue) ||
          recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchValue)) ||
          recipe.description.toLowerCase().includes(searchValue)));

      let cardsHTML = "";
      const uniqueIngredients = [];
      const uniqueAppliances = [];
      const uniqueUtensils = [];
      for (const recipe of filteredRecipes) {
        cardsHTML += recipe.getRecipeCardDOM();
        uniqueIngredients.push(...recipe.ingredients.map(ingredient => ingredient.ingredient));
        uniqueAppliances.push(recipe.appliance);
        uniqueUtensils.push(...recipe.ustensils);
      }

      ulOptionIngredients.innerHTML = [...new Set(uniqueIngredients)].map(ingredient => `<li>${ingredient}</li>`).join("");

      ulOptionAppliances.innerHTML = [...new Set(uniqueAppliances)].map(appliance => `<li>${appliance}</li>`).join("");

      ulOptionUtensils.innerHTML = [...new Set(uniqueUtensils)].map(utensil => `<li>${utensil}</li>`).join("");

      if (filteredRecipes.length === 0) {
        cardsContainer.innerHTML = "<h2>Aucune recette ne correspond à votre critère… vous pouvez\n" +
            "chercher « tarte aux pommes », « poisson », etc...</h2>";
      } else {
        cardsContainer.innerHTML = cardsHTML;
      }
    }
  });
}


// async function displayAppliancesBySearch() {
//   const ulOptionAppliances = document.querySelector(".option-appliances");
//   const inputAppliancesSearch = document.querySelector("#appliances");
//
//   const data = await getRecipes();
//   // Utilisez `Set` pour éliminer les doublons
//   const appliances = [...new Set(data.map(appliData => appliData.appliance))];
//
//   // Ajoutez un écouteur d'événement pour l'input de recherche
//   inputAppliancesSearch.addEventListener("input", async (e) => {
//     e.preventDefault();
//     // Récupérez la valeur saisie dans l'input
//     const searchValue = e.target.value.toLowerCase();
//
//     // Filtrez les appareils qui correspondent à la valeur de recherche
//     const filteredAppliances = appliances.filter(appliance => appliance.toLowerCase().includes(searchValue));
//
//     // Si aucun appareil n'a été trouvé, affichez un message
//     if (filteredAppliances.length === 0) {
//       ulOptionAppliances.innerHTML = "<h2>Aucun résultat</h2>";
//     } else {
//       let cardsHTML = "";
//       // Bouclez sur les appareils filtrés et créez une liste HTML
//       for (const appliance of filteredAppliances) {
//         cardsHTML += `<li>${appliance}</li>`;
//       }
//       ulOptionAppliances.innerHTML = cardsHTML;
//     }
//   });
// }

async function init() {
  changeInputColorForm();
  await closeDropdowns();
  await displayRecipesBySearch();
  // await displayAppliancesBySearch()
  await displayItemsDropdowns()

  getRecipes().then(displayRecipes);
  // getRecipes().then(displayIngredients);
  // getRecipes().then(displayAppliances);
  // getRecipes().then(displayUtensils);

  // getRecipes().then(displayIngredientsList);
  // getRecipes().then(displayAppliancesList);
  // getRecipes().then(displayUtensilsList);

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
