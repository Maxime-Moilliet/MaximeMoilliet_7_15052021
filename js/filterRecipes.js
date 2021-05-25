import {recipes} from "./bdd.js";

/**
 * create an array that groups together the recipes that correspond to values in State
 * display none all cards recipes
 * and change display cards === recipes in array
 * @param {array} state 
 */
function filterRecipes(state) {

    const start = Date.now();

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

    const cards = document.querySelectorAll('.recipe');
    cards.forEach(el => el.style.display = "none");

    let cardsDisplay = [];
    recipesDisplay.forEach(recipe => {
        const recipeName = recipe.name.split(" ").join("-");
        const el = document.querySelector(`#${recipeName}`);
        cardsDisplay = [...cardsDisplay, el];
    })
    cardsDisplay.map(el => el !== null ? el.parentNode.parentNode.style.display = "block" : "none");

    const messageError = document.querySelector('.noRecipes');
    if(cardsDisplay.length === 0) {
        messageError.style.display = "flex";
    } else {
        messageError.style.display = "none";
    }

    const millis = Date.now() - start;
    console.log('durée d\'exécution de l\'algorithme en ms : ' + millis);
}

export {filterRecipes}
