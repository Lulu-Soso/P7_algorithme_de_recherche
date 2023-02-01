export function recipeFactory(data) {
  const { name, time, ingredients, description } = data;

  function getRecipeCardDOM() {
    const article = document.createElement("article");

    const cardRecipe = document.createElement("div");
    cardRecipe.classList.add("card");

    const divImg = document.createElement("div");
    divImg.classList.add("div-img");

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");

    const h2Title = document.createElement("h2");
    h2Title.textContent = name;

    const timeRecipe = document.createElement("div");
    timeRecipe.classList.add("time");
    const imgTime = document.createElement("img");
    imgTime.setAttribute("src", "/assets/images/hour.png");
    imgTime.setAttribute("alt", "image du temps de préparation");
    imgTime.setAttribute("arial-label", "image du temps de préparation");
    const h2Time = document.createElement("h2");
    h2Time.textContent = time;

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const leftContent = document.createElement("div");
    leftContent.classList.add("left-content");
    const textContentLeft = document.createElement("div");
    textContentLeft.classList.add("text-content-left");

    const rightContent = document.createElement("div");
    rightContent.classList.add("right-content");
    const textContentRight = document.createElement("div");
    textContentRight.classList.add("text-content-right");
    textContentRight.textContent = description;

    article.appendChild(cardRecipe);

    cardRecipe.appendChild(divImg);
    cardRecipe.appendChild(cardTitle);
    cardRecipe.appendChild(cardContent);

    cardTitle.appendChild(h2Title);
    cardTitle.appendChild(timeRecipe);

    timeRecipe.appendChild(imgTime);
    timeRecipe.appendChild(h2Time);

    cardContent.appendChild(leftContent);
    cardContent.appendChild(rightContent);

    leftContent.appendChild(textContentLeft);
    rightContent.appendChild(textContentRight);

    ingredients.forEach(ingredient => {
      const pIngredient = document.createElement("p");
      pIngredient.textContent = `${ingredient.ingredient}: ${(ingredient.quantity ? ingredient.quantity : "")} ${(ingredient.unit ? ingredient.unit : "")}`;
      textContentLeft.appendChild(pIngredient);
    });

    return article;
  }

  return {
    name,
    time,
    ingredients,
    description,
    getRecipeCardDOM
  };
}
