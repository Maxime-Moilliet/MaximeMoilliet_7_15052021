import {recipes} from "./bdd.js";
import {createCardRecipe} from "./recipes.js";
import {listLi} from "./filter.js";

/**
 * create an array that groups together the recipes that correspond to values in State
 * remove all cards recipes
 * and create cards recipes === recipes in array
 * @param {array} state 
 */
function filterRecipes(state) {

    let recipesDisplay = [];
    recipes.forEach(recipe => {
        const recipeName = recipe.name;
        let recipeIngredients = [];
        const recipeDescription = recipe.description;
        const recipeAppliance = recipe.appliance;
        const recipeUstensils = recipe.ustensils;

        recipe.ingredients.forEach(ingredient => recipeIngredients = [...recipeIngredients, ingredient.ingredient]);

        const isContainAppliances = (el) => recipeAppliance.includes(el);
        const isContainUstensils = (el) => recipeUstensils.includes(el);
        const isCountainIngredients = (el) => recipeIngredients.includes(el);
        if(state.optionsFilter.appliances.every(isContainAppliances) &&
        state.optionsFilter.ustensils.every(isContainUstensils) &&
        state.optionsFilter.ingredients.every(isCountainIngredients)) {         

            if(state.filterText.length >= 3) {
                if (recipeName.indexOf(state.filterText) !== -1 || 
                recipeIngredients.findIndex(el => el.indexOf(state.filterText) !== -1) !== -1 ||
                recipeDescription.indexOf(state.filterText) !== -1) {       
                    recipesDisplay = [...recipesDisplay, recipe];
                } 
            } else {
                recipesDisplay = [...recipesDisplay, recipe];
            }

        }
    })

    const recipeContainer = document.querySelector('.recipes');
    recipeContainer.innerHTML = ""; 

    recipesDisplay.forEach(recipe => createCardRecipe(recipe));
    listLi(recipesDisplay);

    const messageError = document.querySelector('.noRecipes');
    if(recipesDisplay.length === 0) {
        messageError.style.display = "flex";
    } else {
        messageError.style.display = "none";
    }
}

export {filterRecipes}
