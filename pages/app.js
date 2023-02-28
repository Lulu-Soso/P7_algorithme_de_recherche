import {dataApi} from "/scripts/utils/data-api.js";
import {changeInputColorForm} from "/scripts/header.js";
import {recipeFactory} from "/scripts/factories/recipe-factory.js";
import {closeDropdowns} from "/scripts/dropdown.js";

const {getRecipes, getIngredients, getAppliances, getUtensils} = dataApi();

const cardsContainer = document.querySelector(".cards-container");

const optionLists = document.querySelectorAll('.option-list');
const selectedOptionLists = document.querySelectorAll('.selected-option-list');

let filters = {
    search: '',
    ingredientOptions: [],
    applianceOptions: [],
    utensilOptions: []
}

// Suppression d'une option
function arrayRemove(options, optionToRemove) {
    return options.filter((option) => option !== optionToRemove);
}

async function initOptionLists(recipes) {
    await getIngredients(recipes, filters.ingredientOptions)
    await getAppliances(recipes, filters.applianceOptions)
    await getUtensils(recipes, filters.utensilOptions)
}

async function displayRecipes(recipes) {
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = document.createElement("article");
        recipeCardDOM.innerHTML = recipeModel.getRecipeCardDOM();
        cardsContainer.appendChild(recipeCardDOM);
    });
}

function initFilter() {

    // Action de la barre de recherche
    const inputSearch = document.querySelector(".search-header > input");
    inputSearch.addEventListener('input', async (e) => {
        e.preventDefault();
        filters.search = e.target.value.toLowerCase();

        // Filter
        if (filters.search.length >= 3 || filters.search.length === 0) {
            await displayFilteredRecipes(filters);
        }
    })

    /**
     * Action de la recherche avancée
     */
    // Sélectionner toutes les listes d'options
    optionLists.forEach(list => {
        // Ajouter un événement de clic à chaque liste d'options
        list.addEventListener('click', async e => {
            // Vérifier si l'élément cliqué est une balise <li>
            if (e.target.tagName === 'LI') {
                // Récupérer l'option sélectionnée
                const selectedOption = e.target.textContent;

                // Récupérer le type d'option (ingrédients, appareils ou ustensiles)
                const optionType = list.dataset.optionType;

                // Vérifier si l'option sélectionnée n'a pas déjà été ajoutée aux filtres
                if (filters[`${optionType}Options`].indexOf(selectedOption) === -1) {
                    // Ajouter l'option sélectionnée à la liste des filtres
                    const ul = document.getElementById(`ul-${optionType}s`)
                    ul.innerHTML += `<li>${selectedOption}<button><span aria-label="bouton de suppression">x</span></button></li>`;
                    // e.target.className = "selected"
                    // e.target.classList.add('selected');
                    // console.log(e.target)

                    filters[`${optionType}Options`].push(selectedOption);

                    // Filtrer les recettes en fonction des options sélectionnées
                    await displayFilteredRecipes(filters);
                }
            }
        });
    });


    const updateFilters = (optionType, selectedOption) => {
        if (filters[`${optionType}Options`].indexOf(selectedOption) > -1) {
            filters[`${optionType}Options`] = arrayRemove(filters[`${optionType}Options`], selectedOption);
        }
    };

    selectedOptionLists.forEach(list => {
        list.addEventListener('click', async e => {
            if (e.target.tagName === 'SPAN') {
                const option = e.target.closest('li');
                const selectedOption = option.textContent.slice(0, -1);
                const optionType = list.dataset.optionType;

                option.remove();

                updateFilters(optionType, selectedOption);
                await displayFilteredRecipes(filters)
            }
        });
    });
}

async function filterRecipes(filters) {
    const recipes = await getRecipes();

    return recipes.filter(recipe => {
        let searchFields = [recipe.name, recipe.description, ...recipe.ingredients.map(ingredient => ingredient.ingredient)];
        let ingredientSet = new Set(recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()));
        let utensilSet = new Set(recipe.ustensils.map(utensil => utensil.toLowerCase()));

        let searchMatch = searchFields.some(field => field.toLowerCase().includes(filters.search.toLowerCase()));
        let ingredientMatch = filters.ingredientOptions.every(option => ingredientSet.has(option.toLowerCase()));
        let applianceMatch = filters.applianceOptions.every(option => option.toLowerCase() === recipe.appliance.toLowerCase());
        let utensilMatch = filters.utensilOptions.every(option => utensilSet.has(option.toLowerCase()));

        return searchMatch && ingredientMatch && applianceMatch && utensilMatch;
    });
}

async function displayFilteredRecipes(filters) {
    let filteredRecipes = await filterRecipes(filters);
    cardsContainer.innerHTML = "";

    if (filteredRecipes.length === 0) {
        cardsContainer.innerHTML = "<h2>Aucune recette ne correspond à votre critère… vous pouvez\n" +
            "chercher « tarte aux pommes », « poisson », etc...</h2>";
    } else {
        await displayRecipes(filteredRecipes)
        await initOptionLists(filteredRecipes)
        filterOptionsBySearch(filteredRecipes)
    }
}

function displayFilteredOptions(inputOption, dataList) {
    const inputValue = inputOption.value.toLowerCase();
    const filteredList = Array.from(dataList).filter(
        (option) => option.toLowerCase().includes(inputValue)
    );

    const ulOption = inputOption.nextElementSibling;
    if (filteredList.length === 0) {
        ulOption.innerHTML = "<h2>Aucun résultat</h2>";
    } else {
        let optionsHTML = "";
        for (const option of filteredList) {
            optionsHTML += `<li>${option}</li>`;
        }
        ulOption.innerHTML = optionsHTML;
    }
}

function filterOptionsBySearch(recipes) {
    const inputIngredients = document.querySelector("#ingredients");
    const inputAppliances = document.querySelector("#appliances");
    const inputUtensils = document.querySelector("#utensils");

    const ingredients = [...new Set(
        recipes
            .flatMap((recipe) =>
                recipe.ingredients.map((ingredient) => capitalize(ingredient.ingredient))
            )
    )];
    const appliances = [...new Set(
        recipes.map((recipe) => capitalize(recipe.appliance))
    )];
    const utensils = [...new Set(
        recipes.flatMap((recipe) =>
            recipe.ustensils.map((utensil) => capitalize(utensil))
        )
    )];

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    inputIngredients.addEventListener("input", () => {
        displayFilteredOptions(inputIngredients, ingredients);
    });

    inputAppliances.addEventListener("input", () => {
        displayFilteredOptions(inputAppliances, appliances);
    });

    inputUtensils.addEventListener("input", () => {
        displayFilteredOptions(inputUtensils, utensils);
    });
}


async function init() {
    changeInputColorForm();
    await closeDropdowns();

    getRecipes().then((recipes) => {
        initOptionLists(recipes)
        displayRecipes(recipes)
        filterOptionsBySearch(recipes)
    });

    initFilter();
}

init().then(() => {
});