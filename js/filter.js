import {State, addOptionsFilter, removeOptionsFilter} from "./state.js";


/**
 * Lisen event keyUp and click on Filter
 * @param {string} type 
 */
function OpenFilter(type) {
    const btnIcon = document.querySelectorAll(".btn-" + type + " .optionFilter__icon");
    const btnHead = document.querySelector(".btn-" + type + " .optionFilter__head-top");
    const btnContent = document.querySelector(".btn-" + type + " .optionFilter__head-down");
    const btnUl = document.querySelector(".btn-" + type + " .optionFilter__items");
    const input = document.getElementById("btnInput-" + type);
    btnIcon.forEach(el => el.addEventListener("click", () => {
        toggleBtn(btnContent, btnHead, btnUl);
        const lis = btnUl.querySelectorAll("ul li");
        lis.forEach((li) => {
            const span = li.querySelector("span");
            span.addEventListener("click", (e) => {
                addTag(e, type, span);    
            })
            input.addEventListener("keyup", (e) => changeDisplayLi(e, li, span));
        });
    }));
}

/**
 * Toggle list (filter)
 * @param {HTMLElement} btnContent 
 * @param {HTMLElement} btnHead 
 * @param {HTMLElement} btnUl 
 * @returns 
 */
function toggleBtn(btnContent, btnHead, btnUl) {
    return (btnContent.classList.toggle("active"), btnHead.classList.toggle("active"), btnUl.classList.toggle("active"))
}

/**
 * Change display Li if element search don't find text
 * @param {event} e 
 * @param {HTMLElement} li 
 * @param {HTMLElement} span 
 */
function changeDisplayLi(e, li, span) {
    span.innerHTML.indexOf(e.target.value) === -1 ? li.style.display = "none" : li.style.display = "block";
}

/**
 * lunch if user addTag in filter
 * @param {event} e 
 * @param {string} type 
 * @param {HTMLElement} span 
 */
function addTag(e, type, span) {
    const btnInput = document.querySelector(".optionFilter__input-" + type);
    const btnHead = document.querySelector(".btn-" + type + " .optionFilter__head-top");
    const btnContent = document.querySelector(".btn-" + type + " .optionFilter__head-down");
    const btnUl = document.querySelector(".btn-" + type + " .optionFilter__items");
    span.style.display = "none";
    if(!State.optionsFilter.ingredients.includes(span.innerHTML) || !State.optionsFilter.appliances.includes(span.innerHTML) || !State.optionsFilter.ustensils.includes(span.innerHTML)) {
        btnInput.value = "";
        toggleBtn(btnContent, btnHead, btnUl);
        addOptionsFilter(e, type);
        createTag(e, type);
    }
}

/**
 * On create a tag 
 * @param {event} e 
 * @param {type} type 
 */
function createTag(e, type) {
    const container = document.querySelector(".filters");
    const article = document.createElement("article");
    article.setAttribute("class", "filter filter-" + type);
    const p = document.createElement("p");
    p.setAttribute("class", "filter__name");
    p.innerHTML = e.target.innerHTML;
    const i = document.createElement("i");
    i.setAttribute("class", "far fa-times-circle filter__icon");
    i.setAttribute("data-name", e.target.innerHTML);
    article.appendChild(p);
    article.appendChild(i);
    container.prepend(article);
    i.addEventListener("click", (e) => removeTag(e, type));
}

/**
 * On remove a tag
 * @param {event} e 
 * @param {string} type 
 */
function removeTag(e, type) {
    removeOptionsFilter(e, type);
    const container = document.querySelector(".filters");
    container.removeChild(e.target.parentNode);
    const tags = document.querySelectorAll(".optionFilter__items ul li span")
    tags.forEach(tag => {
        if(tag.innerHTML === e.target.dataset.name) {
            tag.style.display = "block"
        }
    })
}

/**
 * create Li list
 * @param {bdd} recipesbdd 
 */
function listLi(recipesbdd) {
    const recipes = document.querySelectorAll(".recipe")
    const recipesVisible = [];
    const list = [];
    recipes.forEach(recipe => {
        const recipeTitle = recipe.querySelector(".recipe__title")
        if(recipe.style.display === "block") {
            recipesVisible.push(recipeTitle.innerHTML)
        }
    })
    recipesbdd.forEach(el => {
        if(recipesVisible.includes(el.name)) {
            list.push(el)
        }
    })
    if(list.length === 0) {
        recipesbdd.forEach(el => list.push(el))
    }
    buildLi(list, "ingredients")
    buildLi(list, "appliances")
    buildLi(list, "ustensils")
}

/**
 * Build Li in HTML DOM
 * @param {array} list 
 * @param {string} name 
 */
function buildLi(list, name) {
    const listLi = [];
    if(name === "ingredients") {
        list.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                if (!listLi.includes(ingredient.ingredient)) {
                    listLi.push(ingredient.ingredient);
                }
            })});
        } else if(name === "appliances") {
            list.forEach((recipe) => {
                if (!listLi.includes(recipe.appliance)) {
                    listLi.push(recipe.appliance);
                }
            });
        } else if(name === "ustensils") {
            list.forEach((recipe) => {
                recipe.ustensils.forEach((ustensil) => {
                    if (!listLi.includes(ustensil)) {
                        listLi.push(ustensil);
                    }
                });
            });
        }
    listLi.sort();
    const container = document.querySelector("#optionFilter__items-" + name)
    const ul = container.querySelector("#" + name + "")
    container.removeChild(ul)   
    const newUl = document.createElement("ul")
    newUl.setAttribute("id", name)
    container.appendChild(newUl)
    listLi.forEach(el => {
        if(State.optionsFilter.ingredients.includes(el) || State.optionsFilter.appliances.includes(el) || State.optionsFilter.ustensils.includes(el)) {
            return
        } 
        const span = document.createElement("span")
        span.innerHTML = el
        const li = document.createElement("li")
        li.appendChild(span)
        newUl.appendChild(li)
    })
}


export {OpenFilter, listLi};