export async function RecipesDOM(recipes) {
    const cardsContainer = document.querySelector(".cards-container");
  
    recipes.length = 15;
  
    cardsContainer.innerHTML = recipes.map(
      (recipe) =>
        `
      <article>
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
      `
    ).join("");
  }