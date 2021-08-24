const addIngredientButton = document.querySelector('#submitI');
const addIngredientForm = document.querySelector('#addI');
const showCal = document.querySelector('#showCal');
const slider = document.querySelector('#calories');
const ingredients = document.querySelector('#ingredients');
const showRecipeButton = document.querySelector('#showrecipe');
const list = document.createElement('ol');
const content = document.querySelector('#content');

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

let recipesToRender = [];
async function getRecipes() {
	content.innerHTML = '';
	const ourIngredients = await fetch('http://localhost:5000/ingredients');
	const ingredientData = await ourIngredients.json();
	const ingredients = ingredientData.payload;
	const ourRecipes = await fetch('http://localhost:5000/recipes');
	const recipeData = await ourRecipes.json();
	const recipes = recipeData.payload;

	let calories = parseInt(slider.value);
	console.log(calories);
	recipesToRender = recipes.filter((recipe) => {
		for (let i = 0; i < ingredients.length; i++) {
			if (recipe.keywords.includes(ingredients[i].name) && recipe.calories < calories) {
				return recipe;
			}
		}
	});

	renderRecipes(recipesToRender);
}
// make routers
function renderList(array) {
	list.innerHTML = '';
	for (let i = 0; i < array.length; i++) {
		const li = document.createElement('li');
		const deleteLi = document.createElement('button');
		deleteLi.innerText = '🗑';
		deleteLi.addEventListener('click', deleteIngredient);
		li.innerText = i + 1 + '. ' + array[i].name;
		li.setAttribute('dataid', array[i].id);
		li.appendChild(deleteLi);
		li.classList.add('listitem');
		list.appendChild(li);
	}
	// array.forEach((item) => {});
	ingredients.appendChild(list);
}

async function deleteIngredient(e) {
	let id = e.target.parentNode.attributes.dataid.value;
	console.log(id);
	fetch(`http://localhost:5000/ingredients/${id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	});
	initialIngredients();
}

function renderRecipes(array) {
	array.forEach((item) => {
		const recipeDiv = document.createElement('div');
		const recipeName = document.createElement('h4');
		const divIngImg = document.createElement('div');
		const recipeIngredients = document.createElement('p');
		const recipeMethod = document.createElement('p');
		const recipeCalories = document.createElement('span');
		const recipeImage = document.createElement('img');

		recipeImage.classList.add('recipeimage');
		recipeName.classList.add('recipename');
		recipeIngredients.classList.add('recipeingredients');
		recipeMethod.classList.add('recipemethod');
		recipeCalories.classList.add('recipecalories');
		divIngImg.classList.add('sidebyside');

		recipeImage.src = item.image;
		recipeName.innerText = item.name;
		recipeIngredients.innerText = item.ingredients;
		recipeMethod.innerText = item.method;
		recipeCalories.innerText = item.calories;

		recipeName.appendChild(recipeCalories);
		divIngImg.appendChild(recipeIngredients);
		divIngImg.appendChild(recipeImage);
		recipeDiv.appendChild(recipeName);
		recipeDiv.appendChild(divIngImg);
		recipeDiv.appendChild(recipeMethod);
		content.appendChild(recipeDiv);
	});
}

addIngredientButton.addEventListener('click', sendIngredient);
showRecipeButton.addEventListener('click', getRecipes);

// slider.addEventListener('change', (e) => {
// 	showCal.innerText = e.target.value;
// });
showCal.innerHTML = slider.value;
slider.oninput = function () {
	showCal.innerHTML = this.value;
};

initialIngredients();
