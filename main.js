const addIngredientButton = document.querySelector('#submitI');
const addIngredientForm = document.querySelector('#addI');
const showCal = document.querySelector('#showCal');
const slider = document.querySelector('#calories');
const ingredients = document.querySelector('#ingredients');
const showRecipeButton = document.querySelector('#showrecipe');
const list = document.createElement('ol');

async function sendIngredient(e) {
	e.preventDefault();
	const ingredient = addIngredientForm.value;
	const response = await fetch('http://localhost:5000/ingredients', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ingredient }),
	});
	initialIngredients();
}
async function initialIngredients() {
	const ingredients = await fetch('http://localhost:5000/ingredients');
	const { payload } = await ingredients.json();
	renderList(payload);
}
async function getRecipes() {
	const recipes = await fetch('http://localhost:5000/recipes');
	const { payload } = await recipes.json();
	renderRecipes(payload);
}
function renderList(array) {
	list.innerHTML = '';
	array.forEach((item) => {
		const li = document.createElement('li');
		li.innerText = item.name;
		list.appendChild(li);
	});
	ingredients.appendChild(list);
}
function renderRecipes(array) {
	array.forEach((item) => {
		const recipeDiv = document.createElement('div');
		const recipeName = document.createElement('h4');
		const recipeIngredients = document.createElement('p');
		const recipeMethod = document.createElement('p');
		const recipeCalories = document.createElement('span');
		recipeName.innerText = item;
	});
}

addIngredientButton.addEventListener('click', sendIngredient);
showRecipeButton.addEventListener('click', sendIngredient);

// slider.addEventListener('change', (e) => {
// 	showCal.innerText = e.target.value;
// });
showCal.innerHTML = slider.value;
slider.oninput = function () {
	showCal.innerHTML = this.value;
};

initialIngredients();
