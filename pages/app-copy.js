// import {dataApi} from "/scripts/utils/data-api.js";
// import {changeInputColorForm} from "/scripts/header.js";
// import {recipeFactory} from "/scripts/factories/recipe-factory.js";
// import {closeDropdowns} from "/scripts/dropdown.js";
//
// const {getRecipes, getIngredients, getAppliances, getUtensils} = dataApi();
//
// const cardsContainer = document.querySelector(".cards-container");
//
// const optionLists = document.querySelectorAll('.option-list');
// const selectedOptionLists = document.querySelectorAll('.selected-option-list');
//
// let filters = {
//     search: '',
//     ingredientOptions: [],
//     applianceOptions: [],
//     utensilOptions: []
// }
//
// // Suppression d'une option
// function arrayRemove(options, optionToRemove) {
//     return options.filter((option) => option !== optionToRemove);
// }
//
// async function initOptionLists(recipes) {
//     await getIngredients(recipes, filters.ingredientOptions)
//     await getAppliances(recipes, filters.applianceOptions)
//     await getUtensils(recipes, filters.utensilOptions)
// }
//
// async function displayRecipes(recipes) {
//     recipes.forEach((recipe) => {
//         const recipeModel = recipeFactory(recipe);
//         const recipeCardDOM = document.createElement("article");
//         recipeCardDOM.innerHTML = recipeModel.getRecipeCardDOM();
//         cardsContainer.appendChild(recipeCardDOM);
//     });
// }
//
// function initFilter() {
//
//     // Action de la barre de recherche
//     const inputSearch = document.querySelector(".search-header > input");
//     inputSearch.addEventListener('input', async (e) => {
//         e.preventDefault();
//         filters.search = e.target.value.toLowerCase();
//
//         // Filter
//         if (filters.search.length >= 3 || filters.search.length === 0) {
//             await displayFilteredRecipes(filters);
//         }
//     })
//
//     /**
//      * Action de la recherche avancée
//      */
//     // Sélectionner toutes les listes d'options
//     optionLists.forEach(list => {
//         // Ajouter un événement de clic à chaque liste d'options
//         list.addEventListener('click', async e => {
//             // Vérifier si l'élément cliqué est une balise <li>
//             if (e.target.tagName === 'LI') {
//                 // Récupérer l'option sélectionnée
//                 const selectedOption = e.target.textContent;
//
//                 // Récupérer le type d'option (ingrédients, appareils ou ustensiles)
//                 const optionType = list.dataset.optionType;
//
//                 // Vérifier si l'option sélectionnée n'a pas déjà été ajoutée aux filtres
//                 if (filters[`${optionType}Options`].indexOf(selectedOption) === -1) {
//                     // Ajouter l'option sélectionnée à la liste des filtres
//                     const ul = document.getElementById(`ul-${optionType}s`)
//                     ul.innerHTML += `<li>${selectedOption}<button><span aria-label="bouton de suppression">x</span></button></li>`;
//                     // e.target.className = "selected"
//                     // e.target.classList.add('selected');
//                     // console.log(e.target)
//
//                     filters[`${optionType}Options`].push(selectedOption);
//
//                     // Filtrer les recettes en fonction des options sélectionnées
//                     await displayFilteredRecipes(filters);
//                 }
//             }
//         });
//     });
//
//
//     const updateFilters = (optionType, selectedOption) => {
//         if (filters[`${optionType}Options`].indexOf(selectedOption) > -1) {
//             filters[`${optionType}Options`] = arrayRemove(filters[`${optionType}Options`], selectedOption);
//         }
//     };
//
//     selectedOptionLists.forEach(list => {
//         list.addEventListener('click', async e => {
//             if (e.target.tagName === 'SPAN') {
//                 const option = e.target.closest('li');
//                 const selectedOption = option.textContent.slice(0, -1);
//                 const optionType = list.dataset.optionType;
//
//                 option.remove();
//
//                 updateFilters(optionType, selectedOption);
//                 await displayFilteredRecipes(filters)
//             }
//         });
//     });
// }
//
// /************************************ Option-1 Native Loops ************************************/
// async function filterRecipes(filters) {
//     const recipes = await getRecipes();
//     let filteredRecipes = [];
//
//     for (let i = 0; i < recipes.length; i++) {
//         const recipe = recipes[i]
//         // console.log(recipe)
//
//         // Par défaut, il doit retourner la recette et ses options
//         let searchMatch = true;
//         let ingredientMatch = true;
//         let applianceMatch = true;
//         let utensilMatch = true;
//
//         // Récupération des ingredients de chaque recette
//         let ingredients = [];
//         for (let j = 0; j < recipe.ingredients.length; j++) {
//             const ingredient = recipe.ingredients[j];
//             ingredients.push(ingredient.ingredient.toLowerCase())
//             // console.log(ingredients)
//         }
//
//         /**
//          * RECHERCHE GLOBALE
//          */
//
//         // Filtrage de la valeur de la recherche par rapport aux noms de la recette, aux ingrédients et de la description
//         if (filters.search.length >= 3) {
//             // S'il y a une recherche, alors on retournera faux avant la vérification
//             searchMatch = false;
//
//             let searchFields = [recipe.name, recipe.description, ...ingredients]
//             // console.log(searchFields)
//
//             for (let j = 0; j < searchFields.length; j++) {
//                 const field = searchFields[j];
//                 // console.log(field)
//                 if (field.toLowerCase().includes(filters.search.toLowerCase())) {
//                     searchMatch = true
//                 }
//             }
//         }
//
//         /**
//          * FILTRE PAR INGREDIENT
//          */
//         if (filters.ingredientOptions.length > 0) {
//             ingredientMatch = false;
//
//             // Si les ingredients contiennent des options de filtre
//             let ingredientMatchs = [];
//
//             for (let j = 0; j < filters.ingredientOptions.length; j++) {
//                 const ingredientOption = filters.ingredientOptions[j];
//                 for (let k = 0; k < ingredients.length; k++) {
//                     const ingredient = ingredients[k];
//
//                     if (ingredientOption.toLowerCase() === ingredient) {
//                         ingredientMatchs.push(ingredient)
//                     }
//                 }
//             }
//             ingredientMatch = ingredientMatchs.length === filters.ingredientOptions.length;
//         }
//
//         /**
//          * FILTRE PAR APPAREIL
//          */
//         if (filters.applianceOptions.length > 0) {
//             applianceMatch = false;
//             for (let j = 0; j < filters.applianceOptions.length; j++) {
//                 const applianceOption = filters.applianceOptions[j];
//
//                 if (applianceOption.toLowerCase() === recipe.appliance.toLowerCase()) {
//                     applianceMatch = true
//                 }
//             }
//         }
//
//         /**
//          * FILTRE PAR USTENSILE
//          */
//         if (filters.utensilOptions.length > 0) {
//             utensilMatch = false;
//             // Récupération des ustensiles de chaque recette
//             let utensils = [];
//             for (let j = 0; j < recipe.ustensils.length; j++) {
//                 const utensil = recipe.ustensils[j];
//                 utensils.push(utensil.toLowerCase())
//             }
//
//             let utensilMatchs = [];
//             for (let k = 0; k < filters.utensilOptions.length; k++) {
//                 const utensilOption = filters.utensilOptions[k];
//                 for (let e = 0; e < utensils.length; e++) {
//                     const utensil = utensils[e];
//
//                     if (utensilOption.toLowerCase() === utensil) {
//                         utensilMatchs.push(utensil)
//                     }
//                 }
//             }
//             utensilMatch = utensilMatchs.length === filters.utensilOptions.length;
//         }
//
//         if (searchMatch && ingredientMatch && applianceMatch && utensilMatch) {
//             filteredRecipes.push(recipe);
//         }
//
//     }
//
//     return filteredRecipes
//
//     // return recipes.filter(recipe => {
//     //     let searchFields = [recipe.name, recipe.description, ...recipe.ingredients.map(ingredient => ingredient.ingredient)];
//     //     let ingredientSet = new Set(recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()));
//     //     let utensilSet = new Set(recipe.ustensils.map(utensil => utensil.toLowerCase()));
//     //
//     //     let searchMatch = searchFields.some(field => field.toLowerCase().includes(filters.search.toLowerCase()));
//     //     let ingredientMatch = filters.ingredientOptions.every(option => ingredientSet.has(option.toLowerCase()));
//     //     let applianceMatch = filters.applianceOptions.every(option => option.toLowerCase() === recipe.appliance.toLowerCase());
//     //     let utensilMatch = filters.utensilOptions.every(option => utensilSet.has(option.toLowerCase()));
//     //
//     //     return searchMatch && ingredientMatch && applianceMatch && utensilMatch;
//     // });
// }
// /************************************ End Option-1 Native Loops ************************************/
//
// async function displayFilteredRecipes(filters) {
//     let filteredRecipes = await filterRecipes(filters);
//     cardsContainer.innerHTML = "";
//
//     if (filteredRecipes.length === 0) {
//         cardsContainer.innerHTML = "<h2>Aucune recette ne correspond à votre critère… vous pouvez\n" +
//             "chercher « tarte aux pommes », « poisson », etc...</h2>";
//     } else {
//         await displayRecipes(filteredRecipes)
//         await initOptionLists(filteredRecipes)
//         filterOptionsBySearch(filteredRecipes)
//     }
// }
//
// function displayFilteredOptions(inputOption, dataList) {
//     const inputValue = inputOption.value.toLowerCase();
//     const filteredList = Array.from(dataList).filter(
//         (option) => option.toLowerCase().includes(inputValue)
//     );
//
//     const ulOption = inputOption.nextElementSibling;
//     if (filteredList.length === 0) {
//         ulOption.innerHTML = "<h2>Aucun résultat</h2>";
//     } else {
//         let optionsHTML = "";
//         for (const option of filteredList) {
//             optionsHTML += `<li>${option}</li>`;
//         }
//         ulOption.innerHTML = optionsHTML;
//     }
// }
//
// function filterOptionsBySearch(recipes) {
//     const inputIngredients = document.querySelector("#ingredients");
//     const inputAppliances = document.querySelector("#appliances");
//     const inputUtensils = document.querySelector("#utensils");
//
//     const ingredients = [...new Set(
//         recipes
//             .flatMap((recipe) =>
//                 recipe.ingredients.map((ingredient) => capitalize(ingredient.ingredient))
//             )
//     )];
//     const appliances = [...new Set(
//         recipes.map((recipe) => capitalize(recipe.appliance))
//     )];
//     const utensils = [...new Set(
//         recipes.flatMap((recipe) =>
//             recipe.ustensils.map((utensil) => capitalize(utensil))
//         )
//     )];
//
//     function capitalize(string) {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }
//
//     inputIngredients.addEventListener("input", () => {
//         displayFilteredOptions(inputIngredients, ingredients);
//     });
//
//     inputAppliances.addEventListener("input", () => {
//         displayFilteredOptions(inputAppliances, appliances);
//     });
//
//     inputUtensils.addEventListener("input", () => {
//         displayFilteredOptions(inputUtensils, utensils);
//     });
// }
//
//
// async function init() {
//     changeInputColorForm();
//     await closeDropdowns();
//
//     getRecipes().then((recipes) => {
//         initOptionLists(recipes)
//         displayRecipes(recipes)
//         filterOptionsBySearch(recipes)
//     });
//
//     initFilter();
// }
//
// init().then(() => {
// });