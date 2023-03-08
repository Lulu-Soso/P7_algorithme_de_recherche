export function dataApi() {
    const URL = "data/data.json";
    const fetchData = async () => {
        let response = await fetch(URL);
        let data = await response.json();
        const recipes = [...data];

        // console.log(recipes);
        return {
            "recipes": recipes
        };
    };

    const getRecipes = async () => {
        return (await fetchData()).recipes;
    };

    const getIngredients = async (recipes, selectedIngredients) => {
        const ulOptionIngredients = document.querySelector(".option-ingredients");
        // Concatenate all the ingredients arrays from each recipe into a single array
        const uniqueIngredients = [...new Set(recipes.reduce((acc, recipe) => {
            return acc.concat(recipe.ingredients.map((ingredient) => capitalize(ingredient.ingredient)));
        }, []))];

        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        // Use a set to get only unique values from the uniqueIngredients array and convert it back to an array
        // Generate an HTML string with a list of <li> elements, each displaying a unique ingredient
        ulOptionIngredients.innerHTML = [...new Set(uniqueIngredients)].map(ingredient => {
            const selected = selectedIngredients.includes(ingredient)
            return  `<li class="${selected ? 'selected' : ''}">${ingredient}</li>`
        }).join("");

    };

    const getAppliances = async (recipes, selectedAppliances) => {
        const ulOptionAppliances = document.querySelector(".option-appliances");

        const uniqueAppliances = [...new Set(recipes.map((recipe) => capitalize(recipe.appliance)))];

        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        ulOptionAppliances.innerHTML = uniqueAppliances.map(appliance => {
            const selected = selectedAppliances.includes(appliance)
            return `<li class="${selected ? 'selected' : ''}">${appliance}</li>`
        }).join("");
    };

    const getUtensils = async (recipes, selectedUtensils) => {
        const ulOptionUtensils = document.querySelector(".option-utensils");

        // Concatenate all the utensils arrays from each recipe into a single array
        const uniqueUtensils = recipes.reduce((acc, recipe) => {
            // Convert each utensil to uppercase and concatenate them
            return acc.concat(recipe.ustensils.map((utensil) => capitalize(utensil)));
        }, []);

        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        // Use a set to get only unique values from the uniqueUtensils array and convert it back to an array
        // Generate an HTML string with a list of <li> elements, each displaying a unique utensil
        ulOptionUtensils.innerHTML = [...new Set(uniqueUtensils)].map(utensil => {
            const selected = selectedUtensils.includes(utensil)
            return `<li class="${selected ? 'selected' : ''}">${utensil}</li>`
        }).join("");
    };

    return {
        fetchData,
        getRecipes,
        getIngredients,
        getAppliances,
        getUtensils
    };
}
