import { recipes } from "./recipes.js";

//DOM Elements
const recipesBox = document.getElementById("recipesBox");
const researchBoxIngredients = document.getElementById("researchBox--ingredients");
const researchBoxDevices = document.getElementById("researchBox--devices");
const researchBoxUtensils = document.getElementById("researchBox--utensils");
const researchBoxIngredientsExpanded = document.getElementById("researchBox--ingredients__expanded");
const ingredientsBox = document.getElementById("ingredientsBox");
const closeIngredients = document.getElementById("closeIngredients");
const researchInputIngredients = document.getElementById("research__input__ingredients");
const researchBoxDevicesExpanded = document.getElementById("researchBox--devices__expanded");
const devicesBox = document.getElementById("devicesBox");
const closeDevices = document.getElementById("closeDevices");
const researchInputDevices = document.getElementById("research__input__devices");
const researchBoxUtensilsExpanded = document.getElementById("researchBox--utensils__expanded");
const utensilsBox = document.getElementById("utensilsBox");
const closeUtensils = document.getElementById("closeUtensils");
const researchInputUtensils = document.getElementById("research__input__utensils");

//Events
researchBoxIngredients.addEventListener("click", openResearchBoxIngredientsExpanded);
closeIngredients.addEventListener("click", closeResearchBoxIngredientsExpanded);
researchInputIngredients.addEventListener("keyup", getCorrespondingIngredients);
researchBoxDevices.addEventListener("click", openResearchBoxDevicesExpanded);
closeDevices.addEventListener("click", closeResearchBoxDevicesExpanded);
researchInputDevices.addEventListener("keyup", getCorrespondingDevices);
researchBoxUtensils.addEventListener("click", openResearchBoxUtensilsExpanded);
closeUtensils.addEventListener("click", closeResearchBoxUtensilsExpanded);
researchInputUtensils.addEventListener("keyup", getCorrespondingUtensils);

//Variables
let researchConstraints = {
    "research" : "",
    "ingredients" : [],
    "devices" : [],
    "utensils" : []
};
let ingredients = [];
let devices = [];
let utensils = [];

//Functions
function makeRecipeCard(recipe) {
    //DOM Elements
    const recipeCard = document.createElement("article");
    const recipeCardImg = document.createElement("div");
    const recipeCardDescription = document.createElement("div");
    const recipeCardDescriptionHeader = document.createElement("div");
    const recipeCardDescriptionHeaderTitle = document.createElement("h2");
    const recipeCardDescriptionHeaderTimeBox = document.createElement("div");
    const recipeCardDescriptionHeaderTimeBoxTime = document.createElement("p");
    const recipeCardDescriptionIngredients = document.createElement("div");
    const recipeCardDescriptionRecipe = document.createElement("p");

    //Classes
    recipeCard.classList.add("recipeCard");
    recipeCard.classList.add("smoothBorder");
    recipeCardImg.classList.add("recipeCard__img");
    recipeCardDescription.classList.add("recipeCard__description");
    recipeCardDescriptionHeader.classList.add("recipeCard__description__header");
    recipeCardDescriptionHeaderTitle.classList.add("recipeCard__description__header__title");
    recipeCardDescriptionHeaderTimeBox.classList.add("recipeCard__description__header__timeBox");
    recipeCardDescriptionHeaderTimeBoxTime.classList.add("recipeCard__description__header__timeBox__time");
    recipeCardDescriptionIngredients.classList.add("recipeCard__description__ingredients");
    recipeCardDescriptionRecipe.classList.add("recipeCard__description__recipe");

    //Content
    recipeCardDescriptionHeaderTitle.innerText = recipe.name;
    recipeCardDescriptionHeaderTimeBox.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>';
    recipeCardDescriptionHeaderTimeBoxTime.innerText = recipe.time + " min";
    recipeCardDescriptionRecipe.innerText = recipe.description;

    //Nodes
    recipesBox.appendChild(recipeCard);
    recipeCard.appendChild(recipeCardImg);
    recipeCard.appendChild(recipeCardDescription);
    recipeCardDescription.appendChild(recipeCardDescriptionHeader);
    recipeCardDescriptionHeader.appendChild(recipeCardDescriptionHeaderTitle);
    recipeCardDescriptionHeader.appendChild(recipeCardDescriptionHeaderTimeBox);
    recipeCardDescriptionHeaderTimeBox.appendChild(recipeCardDescriptionHeaderTimeBoxTime);
    recipeCardDescription.appendChild(recipeCardDescriptionIngredients);
    recipeCardDescription.appendChild(recipeCardDescriptionRecipe);

    for (let i = 0;i < recipe.ingredients.length;i++) {
        //DOM Elements
        const recipeCardDescriptionIngredientsIngredient = document.createElement("div");
        const recipeCardDescriptionIngredientsIngredientName = document.createElement("p");
        const recipeCardDescriptionIngredientsIngredientQuantity = document.createElement("p");

        //Classes
        recipeCardDescriptionIngredientsIngredient.classList.add("recipe__card__description__ingredients__ingredient");
        recipeCardDescriptionIngredientsIngredientName.classList.add("recipe__card__description__ingredients__ingredient__name");
        recipeCardDescriptionIngredientsIngredientQuantity.classList.add("recipe__card__description__ingredients__ingredient__quantity");

        //Content
        
        if (recipe.ingredients[i].quantity != undefined) {
            recipeCardDescriptionIngredientsIngredientName.innerText = recipe.ingredients[i].ingredient + " :";
            if (recipe.ingredients[i].unit != undefined) {
                recipeCardDescriptionIngredientsIngredientQuantity.innerText = recipe.ingredients[i].quantity + " " + recipe.ingredients[i].unit;
            } else {
                recipeCardDescriptionIngredientsIngredientQuantity.innerText = recipe.ingredients[i].quantity;
            }
        } else {
            recipeCardDescriptionIngredientsIngredientName.innerText = recipe.ingredients[i].ingredient;
        }

        //Nodes
        recipeCardDescriptionIngredients.appendChild(recipeCardDescriptionIngredientsIngredient);
        recipeCardDescriptionIngredientsIngredient.appendChild(recipeCardDescriptionIngredientsIngredientName);
        recipeCardDescriptionIngredientsIngredient.appendChild(recipeCardDescriptionIngredientsIngredientQuantity);
    }
}

function makeAllRecipes(){
    for(let i = 0; i < recipes.length; i++) {
        makeRecipeCard(recipes[i]);
    }
}

function getIngredients() {
    for (let i = 0; i < recipes.length; i++) {
        for (let y = 0; y < recipes[i].ingredients.length; y++) {
            let ingredientExist = false;
            for (let j = 0; j < ingredients.length; j++) {
                if (recipes[i].ingredients[y].ingredient == ingredients[j]) {
                    ingredientExist = true;
                }
            }
            if (!(ingredientExist)) {
                ingredients.push(recipes[i].ingredients[y].ingredient);
            }
        }
    }
    ingredients.sort();
}

function getDevices() {
    for (let i = 0; i < recipes.length; i++) {
        let deviceExist = false;
        for (let j = 0; j < devices.length; j++) {
            if (recipes[i].appliance == devices[j]) {
                deviceExist = true;
            }
        }
        if (!(deviceExist)) {
            devices.push(recipes[i].appliance);
        }
    }
    devices.sort();
}

function getUtensils() {
    for (let i = 0; i < recipes.length; i++) {
        for (let y = 0; y < recipes[i].utensils.length; y++) {
            let utensilExist = false;
            for (let j = 0; j < utensils.length; j++) {
                if (recipes[i].utensils[y] == utensils[j]) {
                    utensilExist = true;
                }
            }
            if (!(utensilExist)) {
                utensils.push(recipes[i].utensils[y]);
            }
        }
    }
    utensils.sort();
}

function makeIngredientsList() {
    for (let i = 0; i < ingredients.length; i++) {
        addIngredient(ingredients[i]);
    }
}

function addIngredient(ingredient) {
    const ingredientBox = document.createElement("div");
    ingredientBox.classList.add("ingredientBox");
    ingredientBox.innerText = ingredient;
    ingredientsBox.appendChild(ingredientBox);
    ingredientBox.addEventListener("click", function() {
        closeResearchBoxIngredientsExpanded();
    });
}

function openResearchBoxIngredientsExpanded() {
    researchBoxIngredientsExpanded.style.display = "flex";
    researchBoxIngredients.style.display = "none";
    closeResearchBoxDevicesExpanded();
    closeResearchBoxUtensilsExpanded();
}

function closeResearchBoxIngredientsExpanded() {
    researchBoxIngredientsExpanded.style.display = "none";
    researchBoxIngredients.style.display = "flex";
}

function getCorrespondingIngredients() {
    ingredientsBox.innerHTML = "";
    for (let i = 0; i < ingredients.length; i++) {
        let string = ingredients[i].toLowerCase();
        let substring = researchInputIngredients.value.toLowerCase();
        if (string.includes(substring)) {
            addIngredient(ingredients[i]);
        }
    }
}

function makeDevicesList() {
    for (let i = 0; i < devices.length; i++) {
        addDevice(devices[i]);
    }
}

function addDevice(device) {
    const deviceBox = document.createElement("div");
    deviceBox.classList.add("deviceBox");
    deviceBox.innerText = device;
    devicesBox.appendChild(deviceBox);
    deviceBox.addEventListener("click", function() {
        closeResearchBoxDevicesExpanded();
    });
}

function openResearchBoxDevicesExpanded() {
    researchBoxDevicesExpanded.style.display = "flex";
    researchBoxDevices.style.display = "none";
    closeResearchBoxIngredientsExpanded();
    closeResearchBoxUtensilsExpanded();
}

function closeResearchBoxDevicesExpanded() {
    researchBoxDevicesExpanded.style.display = "none";
    researchBoxDevices.style.display = "flex";
}

function getCorrespondingDevices() {
    devicesBox.innerHTML = "";
    for (let i = 0; i < devices.length; i++) {
        let string = devices[i].toLowerCase();
        let substring = researchInputDevices.value.toLowerCase();
        if (string.includes(substring)) {
            addDevice(devices[i]);
        }
    }
}

function makeUtensilsList() {
    for (let i = 0; i < utensils.length; i++) {
        addUtensil(utensils[i]);
    }
}

function addUtensil(utensil) {
    const utensilBox = document.createElement("div");
    utensilBox.classList.add("utensilBox");
    utensilBox.innerText = utensil;
    utensilsBox.appendChild(utensilBox);
    utensilBox.addEventListener("click", function() {
        closeResearchBoxUtensilsExpanded();
    });
}

function openResearchBoxUtensilsExpanded() {
    researchBoxUtensilsExpanded.style.display = "flex";
    researchBoxUtensils.style.display = "none";
    closeResearchBoxIngredientsExpanded();
    closeResearchBoxDevicesExpanded();
}

function closeResearchBoxUtensilsExpanded() {
    researchBoxUtensilsExpanded.style.display = "none";
    researchBoxUtensils.style.display = "flex";
}

function getCorrespondingUtensils() {
    utensilsBox.innerHTML = "";
    for (let i = 0; i < utensils.length; i++) {
        let string = utensils[i].toLowerCase();
        let substring = researchInputUtensils.value.toLowerCase();
        if (string.includes(substring)) {
            addUtensil(utensils[i]);
        }
    }
}

function initialization() {
    makeAllRecipes();
    getIngredients();
    getDevices()
    getUtensils();
    makeIngredientsList();
    makeDevicesList();
    makeUtensilsList();
}

initialization();