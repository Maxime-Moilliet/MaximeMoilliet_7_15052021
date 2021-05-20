import {recipes} from "./bdd.js"
import {listLi, OpenFilter} from "./filter.js";
import {handleChangeFilterText} from "./state.js";
import {createCardRecipe} from "./recipes.js";

// SerachBar 
const inputText = document.querySelector(".searchBar__input");
inputText.addEventListener("keyup", (e) => handleChangeFilterText(e));

// Filters
OpenFilter("ingredients");
OpenFilter("appliances");
OpenFilter("ustensils");

// Recipes cards and Li list (ingredients...)
createCardsRecipes(recipes)
function createCardsRecipes(recipes) {
    recipes.forEach(recipe => createCardRecipe(recipe));
}
listLi(recipes);

