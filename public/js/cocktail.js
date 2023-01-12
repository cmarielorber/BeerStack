const dailyRecipeEl = document.getElementById("dailyRecipe"); //get HTML Element where the recipe will go
let recipe; //define blank variable to be filled by fetch request later
//make fetch header options
let requestOptions = {
  method: "GET",
  redirect: "follow",
};

//wrap the main parts of the script in a function so it can be called with the HTML 'onclick' attribute
function getCocktailRecipe() {
  fetch(
    "https://cors-anywhere.herokuapp.com/www.thecocktaildb.com/api/json/v1/1/random.php?a=Alcoholic",
    requestOptions
  ) //fetch request to cocktail database
    .then((response) => response.json()) //parse response into JSON
    .then((result) => {
      recipe = result.drinks[0]; //saving only the first random recipe
      publishRecipe(recipe); //publish function that pushes the recipe to the HTML
    })
    .catch((error) => console.log("error", error));
}

//creates the HTML elements and adds the recipe content, then appends to the existing HTML
function publishRecipe(input) {
  dailyRecipeEl.innerHTML = null;
  let drinkName = input.strDrink;
  let drinkInstructions = input.strInstructions;

  const ingredientKeys = Object.keys(recipe).filter((key) =>
    key.includes("strIngredient")
  );
  const ingredientValues = ingredientKeys
    .map((key) => recipe[key])
    .filter((x) => x);
  const measurementKeys = Object.keys(recipe).filter((key) =>
    key.includes("strMeasure")
  );
  const measurementValues = measurementKeys
    .map((key) => recipe[key])
    .filter((x) => x);

  let headerDiv = document.createElement("div");
  let ingredientsDiv = document.createElement("div");
  ingredientsDiv.classList.add("drinkIngredients");
  let instructionsDiv = document.createElement("div");
  instructionsDiv.classList.add("drinkInstruction");
  headerDiv.innerHTML = `
    <h3 style="font-weight: bold;">${drinkName}</h3>
  `;
  let template = ``;
  for (let i = 0; i < ingredientValues.length; i++) {
    if (measurementValues[i] === undefined) {
      template += `
        <p>${ingredientValues[i]}</p>
      `;
    } else {
      template += `
        <p>${measurementValues[i] + " " + ingredientValues[i]}</p>
      `;
    }
  }
  ingredientsDiv.innerHTML = template;
  instructionsDiv.innerHTML = `
    <p class="container" style="margin-bottom: 0;">${drinkInstructions}</p>
  `;

  dailyRecipeEl.appendChild(headerDiv);
  dailyRecipeEl.appendChild(ingredientsDiv);
  dailyRecipeEl.appendChild(instructionsDiv);
}

getCocktailRecipe();
