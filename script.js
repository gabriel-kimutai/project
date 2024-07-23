document.addEventListener('DOMContentLoaded', async function() {
  // Assign DOM Elements to variables for later use
  const inputBox = document.getElementById('input')
  const searchButton = document.getElementById('button')
  const resultContainer = document.getElementById('results-container')


  let recipes = null
  
  // Try and fetch the recipes from `db.json` using fetch()
  try {
    const response = await fetch('db.json')
    if (!response.ok) {
      // Throw error incase the fetch failed
      throw new Error("failed to fetch resource")
    } else {
      // Assign the response data to recipes variable after conversion to JSON
      data = await response.json()
      recipes = data.recipes
    }
  } catch (error) {
    // Catch any errors encountered during the fetch
    console.error("resource fetch error: ", error)
  }

  // Listen for `click` event on the button then perform recipe search
  searchButton.addEventListener('click', function() {
    // Clear the result container 
    resultContainer.innerHTML = ''
    
    // Get the search term from the input box
    let searchTerm = inputBox.value

    // Alert in case of empty search term
    if (searchTerm === '') {
      alert("Empty search term")
    }

    // Filter the recipes with respect to the search term provied by user
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchTerm);
    })

    // Alert if the search term is not found within the database
    if (filteredRecipes.length === 0) {
      alert('Recipe not found')
      return
    }

    // Create DOM element in readiness to present to the user
    filteredRecipes.forEach(recipe => {
      const recipeContainer = document.createElement('div');
      recipeContainer.classList.add('recipe');
      const ingredientList = document.createElement('ul')
      
      recipe.ingredients.forEach((ingredient) => {
        let ingredientListItem = document.createElement('li')
        ingredientListItem.innerHTML = `${ingredient.name}, ${ingredient.quantity}`
        ingredientList.appendChild(ingredientListItem)
      })
      // Creating placeholders for the actual data when displayed.
      const recipeHtml = `
            <h2>${recipe.name}</h2>
            <span>Ingredients:</span>
            ${ingredientList.innerHTML}
            <p id='instructions'>Instructions: ${recipe.instructions}</p>
            <p>PrepTime:${recipe.prepTime}</p>
            <p>CookTime:${recipe.cookTime}</p>
            <p>servings${recipe.servings}</p>`;
      //  populates the created div with the HTML content genrated for each recipe item.
      recipeContainer.innerHTML = recipeHtml;
      resultContainer.appendChild(recipeContainer)
    })
  })

})
