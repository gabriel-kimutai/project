document.addEventListener('DOMContentLoaded',function(){
    const search =document.getElementById('button');
    const input=document.getElementById('input');
    const resultContainer=document.getElementById('result-container');
   // add event listener to search button.
     button.addEventListener('click',function(){
     // making request to local db.json
     fetch("db.json")
   .then(response=>{
     // trows a new error when the request is not successful.
     // if..else statement that throws an error is the request to server was not succeeful.
     if(!response.ok){
       throw new Error('Network response was not ok');
     }
     else{
       return response.json();
     }})
     // this .then recives a parsed JSON data fromt the first .then.
   .then(data =>{
     // const data = response.json();
     const recipes =data.recipes;
     // the code lone below clear the result-contianer div that is to recieve the data from the server.
     resultContainer.innerHTML='';
   
     // note- add code line to filter data to inpu text.
     const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm));
     // creating palceholder and new elemnts for displayed data and .
     filteredRecipes.forEach(recipe => {
       const recipeContainer = document.createElement('div');
       recipeContainer.classList.add('recipe');
       // creating placeholders for the actual data when displayed.
       const recipeHtml=`
       <h2>${recipe.name}</h2>
       <ul>Ingredients: ${recipe.ingredients}</ul>
           <p>Instructions: ${recipe.instructions}</p>
             <p>PrepTime:${recipe.prepTime}</p>
              <p>CookTime:${recipe.cookTime}</p>
                <p>servings${recipe.servings}</p>`;
         //  populates the created div with the HTML content genrated for each recipe item.
           recipeContainer.innerHTML =recipeHtml;
           resultContainer.appendChild(recipeContainer)
     })
   })
     // catching an error and displaying the error
   .catch(error);{
     console.error('Error fetching and displaying data:',error);
       }
      })
   })