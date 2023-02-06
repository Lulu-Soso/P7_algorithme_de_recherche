import { dataApi } from "/scripts/utils/data-api.js";
import { changeInputColorForm } from "/scripts/header.js";
import { recipeFactory } from "/scripts/factories/recipe-factory.js";
import { closeDropdowns } from "/scripts/dropdown.js";
import {dropdownFactory} from "../scripts/factories/dropdown-factory.js";
// import { createDropdownBehavior } from "/scripts/dropdown.js";

const { getRecipes, getUtensils, getAppliances} = dataApi();

async function displayRecipes(recipes) {
  const cardsContainer = document.querySelector(".cards-container");

  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCardDOM = document.createElement("article");
    recipeCardDOM.innerHTML = recipeModel.getRecipeCardDOM();
    cardsContainer.appendChild(recipeCardDOM);
  });
}

// async function displayIngredients(ingredients) {
//   const ulOptionIngredients = document.querySelector(".option-ingredients");
//
//   ingredients.forEach((ingredient) => {
//     const ingredientModel = dropdownFactory(ingredient);
//     const ingredientDOM = document.createElement("li");
//     ingredientDOM.innerHTML = ingredientModel.getIngredientsDOM();
//     ulOptionIngredients.appendChild(ingredientDOM);
//   });
// }

// async function displayAppliances(appliances) {
//   const ulOptionAppliances = document.querySelector(".option-appliances");
//   // Create a set to store unique appliances
//   const applianceSet = new Set();
//
//   // Loop through each appliance
//   appliances.forEach((appli) => {
//     // Check if the appliance already exists in the set
//     if (!applianceSet.has(appli.appliance)) {
//       // If not, add the appliance to the set
//       applianceSet.add(appli.appliance);
//       const applianceModel = dropdownFactory(appli);
//       const applianceDOM = document.createElement("li");
//       applianceDOM.innerHTML = applianceModel.getAppliancesDOM();
//       ulOptionAppliances.appendChild(applianceDOM);
//     }
//   })
// }


// async function displayUtensils(utensils) {
//   const ulOptionUtensils = document.querySelector(".option-utensils");
//
//   utensils.forEach((utensil) => {
//     const utensilModel = dropdownFactory(utensil);
//     const utensilDOM = document.createElement("li");
//     utensilDOM.innerHTML = utensilModel.getUtensilsDOM();
//     ulOptionUtensils.appendChild(utensilDOM);
//   });
// }

////////// Display all ingredients //////////
async function displayIngredientsList(ingredients) {
  const ulOptionIngredients = document.querySelector(".option-ingredients")

  // Create a Set to store unique ingredient names
  const ingredientSet = new Set();

  // Set the innerHTML of the selected element to the result of mapping over the ingredients array
  ulOptionIngredients.innerHTML = ingredients
  .map(
    (ingred) =>
      `
      ${ingred.ingredients
        // For each ingredient object, filter out ingredients that are already in the ingredientSet
        // Pour chaque objet d'ingrédient, filtrer les ingrédients qui sont déjà dans l'IngredientSet
        .filter(ingredLi => !ingredientSet.has(ingredLi.ingredient))
        .map(
          (ingredLi) => {
             // If it has not, add it to the ingredientSet and return a list item with its name
            ingredientSet.add(ingredLi.ingredient);
            return `<li>${ingredLi.ingredient}</li>`
          }
        )
        .join("")}
    `
  )
  .join("");
}

////////// Display all appliances //////////
async function displayAppliancesList(appliances) {
  const ulOptionAppliances = document.querySelector(".option-appliances");

  const applianceSet = new Set();

  ulOptionAppliances.innerHTML = appliances
    .map(liAppliance => {
      if (!applianceSet.has(liAppliance.appliance)) {
        applianceSet.add(liAppliance.appliance);
        return `<li>${liAppliance.appliance}</li>`;
      }
    })
    .filter(Boolean)
    .join("");
}

// async function displayAppliancesList(appliances) {
//   let ulOptionAppliances = document.querySelector(".option-appliances");
//   const inputAppliancesSearch = document.querySelector("#appliances");
//
//   const applianceSet = new Set();
//
//   // ulOptionAppliances.innerHTML = appliances
//   //     .map(liAppliance => {
//   //       if (!applianceSet.has(liAppliance.appliance)) {
//   //         applianceSet.add(liAppliance.appliance);
//   //         return `<li>${liAppliance.appliance}</li>`;
//   //       }
//   //     })
//   //     .filter(Boolean)
//   //     .join("");
//
//
//   inputAppliancesSearch.addEventListener("input", (e) => {
//     const searchValue = e.target.value.toLowerCase();
//
//     const filteredAppliances = appliances.filter(recipe => recipe.appliance.toLowerCase().includes(searchValue));
//     console.log(filteredAppliances)
//     // ulOptionAppliances = filteredAppliances
//     filteredAppliances.forEach((appli) => {
//     const applianceModel = dropdownFactory(appli);
//     const applianceDOM = document.createElement("li");
//     applianceDOM.innerHTML = applianceModel.getAppliancesDOM();
//     ulOptionAppliances.appendChild(applianceDOM);
//     })
//
//   })
//
// }

////////// Display all utensils //////////
// function displayUtensilsList(utensils) {
//   const ulOptionUtensils = document.querySelector(".option-utensils");
//   const utensilSet = new Set();
//   const uniqueUtensils = utensils
//   console.log(uniqueUtensils)
//     .filter(utensil => {
//       if (!utensilSet.has(utensil.ustensils)) {
//         utensilSet.add(utensil.ustensils);
//         return true;
//       }
//       return false;
//     })
//     .map(utensil => utensil.ustensils);
//
//   ulOptionUtensils.innerHTML = uniqueUtensils
//     .map(utensil => `<li>${utensil}</li>`)
//     .join("");
// }

//////// Display all utensils //////////
function displayUtensilsList(recipes) {
  const ulOptionUtensils = document.querySelector(".option-utensils");

  // Concatenate all the utensils arrays from each recipe into a single array
  const uniqueUtensils = recipes.reduce((acc, recipe) => {
    // Convert each utensil to uppercase and concatenate them
    return acc.concat(recipe.ustensils.map(utensil => utensil[0].toUpperCase() + utensil.slice(1)));
  }, []);

  // Use a set to get only unique values from the uniqueUtensils array and convert it back to an array
  // Generate an HTML string with a list of <li> elements, each displaying a unique utensil
  ulOptionUtensils.innerHTML = [...new Set(uniqueUtensils)].map(utensil => `<li>${utensil}</li>`).join("");
}



// function displayUtensilsList(utensils) {
//   const ulOptionUtensils = document.querySelector(".option-utensils");
//   const utensilSet = new Set();
//   const uniqueUtensils = utensils
//       .filter(utensil => {
//         if (!utensilSet.has(utensil.ustensils)) {
//           utensilSet.add(utensil.ustensils);
//           return true;
//         }
//         return false;
//       })
//       .map(utensil => utensil.ustensils);
//
//   ulOptionUtensils.innerHTML = uniqueUtensils
//       .map(utensil => {
//         if (typeof utensil === "string") {
//           return `<li>${utensil.charAt(0).toUpperCase() + utensil.slice(1)}</li>`;
//         }
//         console.error(`${utensil} is not a string.`);
//       })
//       .join("");
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

      if (filteredRecipes.length === 0) {
        cardsContainer.innerHTML = "<h2>Aucune recette ne correspond à votre critère… vous pouvez\n" +
            "chercher « tarte aux pommes », « poisson », etc...</h2>";
      } else {
        let cardsHTML = "";
        for (const recipe of filteredRecipes) {
          cardsHTML += recipe.getRecipeCardDOM();
        }
        cardsContainer.innerHTML = cardsHTML;
      }
    }
  });
}


async function displayAppliancesBySearch() {
  const ulOptionAppliances = document.querySelector(".option-appliances");
  const inputAppliancesSearch = document.querySelector("#appliances");

  const data = await getRecipes();
  // Utilisez `Set` pour éliminer les doublons
  const appliances = [...new Set(data.map(appliData => appliData.appliance))];

  // Ajoutez un écouteur d'événement pour l'input de recherche
  inputAppliancesSearch.addEventListener("input", async (e) => {
    e.preventDefault();
    // Récupérez la valeur saisie dans l'input
    const searchValue = e.target.value.toLowerCase();

    // Filtrez les appareils qui correspondent à la valeur de recherche
    const filteredAppliances = appliances.filter(appliance => appliance.toLowerCase().includes(searchValue));

    // Si aucun appareil n'a été trouvé, affichez un message
    if (filteredAppliances.length === 0) {
      ulOptionAppliances.innerHTML = "<h2>Aucun résultat</h2>";
    } else {
      let cardsHTML = "";
      // Bouclez sur les appareils filtrés et créez une liste HTML
      for (const appliance of filteredAppliances) {
        cardsHTML += `<li>${appliance}</li>`;
      }
      ulOptionAppliances.innerHTML = cardsHTML;
    }
  });
}

async function init() {
  changeInputColorForm();
  await closeDropdowns();
  await displayRecipesBySearch();
  await displayAppliancesBySearch()
  await displayItemsDropdowns()

  getRecipes().then(displayRecipes);
  // getRecipes().then(displayIngredients);
  // getRecipes().then(displayAppliances);
  // getRecipes().then(displayUtensils);

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
