import {recipes} from "./bdd.js"
import {listLi, OpenFilter} from "./filter.js";
import {handleChangeFilterText} from "./state.js";
import {filterRecipes} from "./filterRecipes.js";
import {State} from "./state.js";

// SerachBar 
const inputText = document.querySelector(".searchBar__input");
inputText.addEventListener("keyup", (e) => handleChangeFilterText(e));

// Filters
OpenFilter("ingredients");
OpenFilter("appliances");
OpenFilter("ustensils");

filterRecipes(State);
listLi(recipes);