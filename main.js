const addIngredientButton = document.querySelector("#submitI");
const addIngredientForm = document.querySelector("#addI");
const showCal = document.querySelector("#showCal");
const slider = document.querySelector("#calories");
const ingredients = document.querySelector("#ingredients");
const showRecipeButton = document.querySelector("#showrecipe");
const list = document.createElement("ol");
const content = document.querySelector("#content");

async function sendIngredient(e) {
  e.preventDefault();
  const ingredient = addIngredientForm.value;
  const response = await fetch("http://localhost:5000/ingredients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredient }),
  });
  initialIngredients();
}

async function initialIngredients() {
  const ingredients = await fetch("http://localhost:5000/ingredients");
  const { payload } = await ingredients.json();
  renderList(payload);
}

async function getRecipes() {
  content.innerHTML = "";
  const ourIngredients = await fetch("http://localhost:5000/ingredients");
  const ingredientData = await ourIngredients.json();
  const ingredients = ingredientData.payload;
  console.log(ingredients);
  const ourRecipes = await fetch("http://localhost:5000/recipes");
  const recipeData = await ourRecipes.json();
  const recipes = recipeData.payload;
  console.log("second");
  const recipesToRender = recipes.filter((recipe) => {
    console.log(recipe.name);
    for (let i = 0; i < ingredients.length; i++) {
      console.log(ingredients[i].name);
      if (recipe.keywords.includes(ingredients[i].name)) {
        //   recipesToRender.push(recipe)
        return recipe;
      }
    }
  });

  renderRecipes(recipesToRender);
}

function renderList(array) {
  list.innerHTML = "";
  array.forEach((item) => {
    const li = document.createElement("li");
    const deleteLi = document.createElement("button");
    deleteLi.innerText = "D";
    li.innerText = item.name;
    li.appendChild(deleteLi);
    list.appendChild(li);
  });
  ingredients.appendChild(list);
}
function renderRecipes(array) {
  array.forEach((item) => {
    const recipeDiv = document.createElement("div");
    const recipeName = document.createElement("h4");
    const recipeIngredients = document.createElement("p");
    const recipeMethod = document.createElement("p");
    const recipeCalories = document.createElement("span");
    recipeName.classList.add("recipename");
    recipeIngredients.classList.add("recipeingredients");
    recipeMethod.classList.add("recipemethod");
    recipeCalories.classList.add("recipecalories");
    recipeName.innerText = item.name;
    recipeIngredients.innerText = item.ingredients;
    recipeMethod.innerText = item.method;
    recipeCalories.innerText = item.calories;

    recipeName.appendChild(recipeCalories);

    recipeDiv.appendChild(recipeName);
    recipeDiv.appendChild(recipeIngredients);
    recipeDiv.appendChild(recipeMethod);
    content.appendChild(recipeDiv);
  });
}

addIngredientButton.addEventListener("click", sendIngredient);
showRecipeButton.addEventListener("click", getRecipes);

// slider.addEventListener('change', (e) => {
// 	showCal.innerText = e.target.value;
// });
showCal.innerHTML = slider.value;
slider.oninput = function () {
  showCal.innerHTML = this.value;
};

initialIngredients();
