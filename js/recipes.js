/**
 * Build recipe card in HTML DOM
 * @param {Element bdd} recipe 
 */
function createCardRecipe(recipe) {
    const recipeId = recipe.name.split(" ").join('-')
    const card = document.createElement("article");
    card.setAttribute("class", "recipe")
    card.innerHTML = `<div class="recipe__img"></div>
        <div class="recipe__head">
            <h2 class="recipe__title" id=${recipeId}>${recipe.name}</h2>
            <p class="recipe__time"><i class="far fa-clock recipe__icon"></i>${recipe.time} min</p>
        </div>
        <div class="recipe__body">
            <ul>
            </ul>
            <p class="recipe__description">
                ${recipe.description}
            </p>
        </div>`
    const container = document.querySelector(".recipes");
    container.appendChild(card);
    createRecipeListIngredients(recipe, card);
}

/**
 * Build list ingredient in card recipe
 * @param {Element bdd} recipe 
 * @param {HTMLElement} card 
 */
function createRecipeListIngredients(recipe, card) {
    const cardIngredients = card.querySelector("ul");
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.setAttribute("class", "recipe__ingredients");
        if(ingredient.quantity && ingredient.unit) {
            li.innerHTML = `<span class="recipe__ingredient">${ingredient.ingredient}</span>: ${ingredient.quantity} ${ingredient.unit}`;
        } else if(ingredient.quantity) {
            li.innerHTML = `<span class="recipe__ingredient">${ingredient.ingredient}</span>: ${ingredient.quantity}`;
        } else {
            li.innerHTML = `<span class="recipe__ingredient">${ingredient.ingredient}</span>`;
        }
        cardIngredients.appendChild(li);
    })
}

export {createCardRecipe};