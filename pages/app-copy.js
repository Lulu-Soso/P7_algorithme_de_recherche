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
// // Cette fonction prend un tableau d'options et une option à retirer en argument.
// // Elle filtre les éléments du tableau qui sont différents de l'option à retirer.
// // Elle renvoie le nouveau tableau d'options sans l'option retirée.
// function arrayRemove(options, optionToRemove) {
//     return options.filter((option) => option !== optionToRemove);
// }
//
// // Cette fonction asynchrone prend un tableau de recettes en entrée.
// async function initOptionLists(recipes) {
//
//     // Appeler la fonction asynchrone getIngredients() pour récupérer tous les ingrédients dans les recettes. Attendre que la promesse se résolve avant de continuer. etc..
//     await getIngredients(recipes)
//     await getAppliances(recipes)
//     await getUtensils(recipes)
// }
//
//
// // Cette fonction asynchrone prend un tableau de recettes en entrée
// async function displayRecipes(recipes) {
//     // Pour chaque recette dans le tableau de recettes, créer un élément de modèle de recette
//     recipes.forEach((recipe) => {
//
//         // Créer un nouvel élément HTML qui représente la carte de recette
//         const recipeModel = recipeFactory(recipe);
//
//         // Définir le contenu HTML de l'élément de carte de recette en utilisant le HTML généré par le modèle de recette
//         const recipeCardDOM = document.createElement("article");
//
//         // Ajouter l'élément de carte de recette à un conteneur de cartes existant dans le document HTML
//         recipeCardDOM.innerHTML = recipeModel.getRecipeCardDOM();
//
//         cardsContainer.appendChild(recipeCardDOM);
//     });
// }
//
//
// function initFilter() {
//
//     // Action de la barre de recherche
//     const inputSearch = document.querySelector(".search-header > input");
//     inputSearch.addEventListener('input', async (e) => {
//         e.preventDefault();
//         // Met à jour la propriété "search" de l'objet "filters" avec la valeur entrée dans la barre de recherche
//         filters.search = e.target.value.toLowerCase();
//
//         // Si la longueur de la chaîne de recherche est supérieure ou égale à 3 caractères ou égale à 0 (si l'utilisateur efface tout), affiche les recettes filtrées
//         if (filters.search.length >= 3 || filters.search.length === 0) {
//             await displayFilteredRecipes(filters);
//         }
//     })
//
//     /**
//      * Action de la recherche avancée
//      */
//     // Pour chaque liste d'options avancées, ajoute un écouteur d'événement pour les clics sur les éléments de la liste
//     optionLists.forEach(list => {
//         list.addEventListener('click', async e => {
//             if (e.target.tagName === 'LI') {
//                 const selectedOption = e.target.textContent;
//
//                 // Récupère le type d'option (ex: "ingrédients", "appareils") à partir de l'attribut "data-option-type" de la liste
//                 const optionType = list.dataset.optionType;
//
//                 // Si l'option sélectionnée n'est pas déjà présente dans le tableau des options du même type dans l'objet "filters", l'ajoute et affiche les recettes filtrées
//                 if (filters[`${optionType}Options`].indexOf(selectedOption) === -1) {
//                     const ul = document.getElementById(`ul-${optionType}s`)
//
//                     ul.innerHTML += `<li>${selectedOption}<button><span aria-label="bouton de suppression">x</span></button></li>`;
//
//                     filters[`${optionType}Options`].push(selectedOption);
//
//                     await displayFilteredRecipes(filters);
//                 }
//             }
//         });
//     });
//
//     // Définit une fonction pour mettre à jour les filtres en enlevant une option sélectionnée
//     const updateFilters = (optionType, selectedOption) => {
//         if (filters[`${optionType}Options`].indexOf(selectedOption) > -1) {
//             filters[`${optionType}Options`] = arrayRemove(filters[`${optionType}Options`], selectedOption);
//         }
//     };
//
//     // Pour chaque liste d'options sélectionnées, ajoute un écouteur d'événement pour les clics sur les boutons de suppression
//     selectedOptionLists.forEach(list => {
//         list.addEventListener('click', async e => {
//             if (e.target.tagName === 'SPAN') {
//                 // Récupère l'option sélectionnée à partir de l'élément parent du bouton de suppression
//                 const option = e.target.closest('li');
//                 const selectedOption = option.textContent.slice(0, -1);
//                 // Récupère le type d'option à partir de l'attribut "data-option-type" de la liste
//                 const optionType = list.dataset.optionType;
//
//                 // Enlève l'option de la liste et met à jour les filtres, puis affiche les recettes filtrées
//                 option.remove();
//
//                 updateFilters(optionType, selectedOption);
//                 await displayFilteredRecipes(filters)
//             }
//         });
//     });
// }
//
//
// // Définition d'une fonction asynchrone qui prend un objet de filtres en argument et renvoie une liste de recettes filtrée en fonction des filtres.
// async function filterRecipes(filters) {
//
//     // Appel d'une fonction asynchrone pour obtenir toutes les recettes.
//     const recipes = await getRecipes();
//
//     // Utilisation de la méthode filter sur le tableau des recettes pour appliquer les différents filtres.
//     return recipes.filter(recipe => {
//         // Création d'un tableau contenant le nom, la description et tous les ingrédients de la recette.
//         let searchFields = [recipe.name, recipe.description, ...recipe.ingredients.map(ingredient => ingredient.ingredient)];
//         // Création d'un ensemble contenant tous les ingrédients de la recette en minuscules.
//         let ingredientSet = new Set(recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()));
//         // Création d'un ensemble contenant tous les ustensiles de la recette en minuscules.
//         let utensilSet = new Set(recipe.ustensils.map(utensil => utensil.toLowerCase()));
//
//         // Filtrage des recettes en fonction des différents filtres.
//
// // Vérifie si au moins un des champs de recherche (nom, description, ingrédients) inclut la chaîne de recherche.
//         let searchMatch = searchFields.some(field => field.toLowerCase().includes(filters.search.toLowerCase()));
//
// // Vérifie si toutes les options d'ingrédient sont présentes dans la liste d'ingrédients de la recette.
//         let ingredientMatch = filters.ingredientOptions.every(option => ingredientSet.has(option.toLowerCase()));
//
// // Vérifie si l'option d'appareil est égale à l'appareil de la recette
//         let applianceMatch = filters.applianceOptions.every(option => option.toLowerCase() === recipe.appliance.toLowerCase());
//
// // Vérifie si toutes les options d'ustensiles sont présentes dans la liste d'ustensiles de la recette.
//         let utensilMatch = filters.utensilOptions.every(option => utensilSet.has(option.toLowerCase()));
//
//
//         // Renvoi d'un booléen qui indique si la recette correspond aux filtres.
//         return searchMatch && ingredientMatch && applianceMatch && utensilMatch;
//     });
// }
//
// // Cette fonction asynchrone prend un objet de filtres en entrée
// async function displayFilteredRecipes(filters) {
//     // Appeler la fonction asynchrone filterRecipes() avec les filtres pour récupérer un tableau de recettes filtrées. Attendre que la promesse se résolve avant de continuer.
//     let filteredRecipes = await filterRecipes(filters);
//
//     // Effacer le contenu HTML du conteneur de cartes avant d'afficher les nouvelles recettes filtrées
//     cardsContainer.innerHTML = "";
//
//     // Si le tableau de recettes filtrées est vide, afficher un message d'erreur
//     if (filteredRecipes.length === 0) {
//         cardsContainer.innerHTML = "<h2>Aucune recette ne correspond à votre critère… vous pouvez\n" +
//             "chercher « tarte aux pommes », « poisson », etc...</h2>";
//     } else {
//         // Sinon, afficher les recettes filtrées, initialiser les listes déroulantes des filtres, et filtrer les options de filtre en fonction de la recherche utilisateur.
//         await displayRecipes(filteredRecipes)
//         await initOptionLists(filteredRecipes)
//         filterOptionsBySearch(filteredRecipes)
//     }
// }
//
//
// // Fonction qui filtre et affiche les options d'un élément de formulaire.
// function displayFilteredOptions(inputOption, dataList) {
//
//     // Convertit la valeur de l'élément <input> en minuscules pour faciliter la comparaison.
//     const inputValue = inputOption.value.toLowerCase();
//
//     // Filtre la liste d'options pour ne garder que celles qui incluent la valeur de l'élément <input>.
//     const filteredList = Array.from(dataList).filter(
//         (option) => option.toLowerCase().includes(inputValue)
//     );
//
//     // Sélectionne l'élément <ul> suivant l'élément <input> pour y ajouter les options filtrées.
//     const ulOption = inputOption.nextElementSibling;
//
//     // Si la liste filtrée est vide, affiche un message "Aucun résultat".
//     if (filteredList.length === 0) {
//         ulOption.innerHTML = "<h2>Aucun résultat</h2>";
//     } else {
//         // Sinon, crée une chaîne HTML avec les options filtrées et l'ajoute à l'élément <ul>.
//         let optionsHTML = "";
//         for (const option of filteredList) {
//             optionsHTML += `<li>${option}</li>`;
//         }
//         ulOption.innerHTML = optionsHTML;
//     }
// }
//
//
// function filterOptionsBySearch(recipes) {
//
//     // Récupération des champs de recherche pour chaque catégorie
//     const inputIngredients = document.querySelector("#ingredients");
//     const inputAppliances = document.querySelector("#appliances");
//     const inputUtensils = document.querySelector("#utensils");
//
//     // Création des tableaux d'options uniques pour chaque catégorie
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
//     // Fonction pour mettre la première lettre d'une chaîne de caractères en majuscule
//     function capitalize(string) {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }
//
//     // Ajout d'écouteurs d'événements aux champs de recherche pour chaque catégorie
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
