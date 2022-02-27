const spanner = style =>{
    document.getElementById('spanner').style.display = style
}
const searchBtn = () =>{
    document.getElementById('display-result').textContent = ''
    document.getElementById('display-details').textContent = ''
    const searchFiled = document.getElementById('search-filed')
    const searchResult = searchFiled.value
    spanner('block')
    searchFiled.value = ''
    const error = document.getElementById('error')
    if(searchResult == ''){
        error.innerText = 'Enter a cocktail name'
        error.className = 'text-danger'
    }
    else{
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchResult}`
            fetch(url)
            .then(res => res.json())
            .then(data => {
                if(data.drinks == undefined){
                    error.innerText = `Nothing found '${searchResult}'`
                    error.className = 'text-danger'
                    spanner('none')
                }
                else{
                    error.innerText = `${data.drinks.length} result found '${searchResult}'`
                    error.className = 'text-success'
                    displaySearch(data.drinks)
                    spanner('none')
                }
            })
    }
}
const displaySearch = drinks =>{
    const displayResult = document.getElementById('display-result')
    drinks.forEach(drink => {
        const div = document.createElement('div')
        div.className = 'col'
        div.innerHTML = `
        <div class="card h-100">
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${drink.strDrink}</h5>
          <button onclick="displayDetails(${drink.idDrink})" class="text-white btn btn-success rounded-pill px-4">Details</button>
        </div>
      </div>
        `
        displayResult.appendChild(div)
        spanner('none')
    });
}
const displayDetails = id =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayInfo(data))
}
displayDetails()
const displayInfo = name =>{
    console.log(name)
    const displayInfo = document.getElementById('display-details')
    displayInfo.textContent = ''
    const div = document.createElement('div')
    div.className = 'col'
    div.innerHTML = `
    <div class="card h-100">
        <img src="${name.drinks[0].strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title">${name.drinks[0].strDrink}</h4>
          <h6 class="card-title">${name.drinks[0].strCategory}</h6>
          <p>${name.drinks[0].strInstructions}</p>
        </div>
      </div>
    `
    displayInfo.appendChild(div)
}