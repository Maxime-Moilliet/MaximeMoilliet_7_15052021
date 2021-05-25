import {filterRecipes} from "./filterRecipes.js";
import {listLi} from "./filter.js";
import {recipes} from "./bdd.js";

const State = {
  filterText: "",
  optionsFilter: {
    ingredients: [],
    appliances: [],
    ustensils: [],
  },
};

/**
 * add an element in optionFilter state
 * @param {event} e 
 * @param {string} type 
 */
function addOptionsFilter(e, type) {
    switch(type) {
        case "ingredients":
            State.optionsFilter.ingredients.push(e.target.innerHTML);
            break;
        case "appliances":
            State.optionsFilter.appliances.push(e.target.innerHTML);
            break;
        case "ustensils":
            State.optionsFilter.ustensils.push(e.target.innerHTML);
            break;
        default: 
            throw new Error("type inconnu impossible d'ajouter une option");
    }
    filterRecipes(State);
    listLi(recipes);
}

/**
 * remove and element in optionFilter state
 * @param {event} e 
 * @param {string} type 
 */
function removeOptionsFilter(e, type) {
    let idx = null;
    switch(type) {
        case "ingredients":
            idx = State.optionsFilter.ingredients.findIndex(el => el === e.target.dataset.name);
            State.optionsFilter.ingredients.splice(idx, 1);
            break;
        case "appliances":
            idx = State.optionsFilter.appliances.findIndex(el => el === e.target.dataset.name);
            State.optionsFilter.appliances.splice(idx, 1);
            break;
        case "ustensils":
            idx = State.optionsFilter.ustensils.findIndex(el => el === e.target.dataset.name);
            State.optionsFilter.ustensils.splice(idx, 1);
            break;
        default :
            throw new Error("type inconnu impossible de supprimer une option")
    }
    filterRecipes(State);
    listLi(recipes);
}

/**
 * change value in FilterText state 
 * @param {event} e 
 */
function handleChangeFilterText(e) {
    if(e.target.value.length >= 3) {
        State.filterText = e.target.value;
    } else {
        State.filterText = "";
        const recipesCards = document.querySelectorAll(".recipe");
        recipesCards.forEach(recipe => recipe.style.display = "block");
    }
    listLi(recipes);
    filterRecipes(State);
}

export {
    State,
    addOptionsFilter,
    removeOptionsFilter,
    handleChangeFilterText
};