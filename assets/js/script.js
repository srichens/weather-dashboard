let APIKey = "9d7113f3af5d25571785a917bd91f773";
let city;
let searchFormEl = document.querySelector('#search-input');
let cityInputEl = document.querySelector('#city-input');
let citiesListEl = document.querySelector('.cities');
let citiesArr = [];



searchFormEl.addEventListener('submit', formSubmitCity)

function formSubmitCity (event) {
    event.preventDefault();
     
    let searchCity = cityInputEl.value.trim();
    
    console.log(searchCity);
   
   if (searchCity) {cityInputEl.value = "";
    localStorage.setItem("savedCity", searchCity);
    let newCity = localStorage.getItem("savedCity");
    console.log(newCity);
   
    let cityButton = document.createElement("button");
    let cityBtnText = document.createTextNode(newCity);
    cityButton.appendChild(cityBtnText);
    
    citiesListEl.appendChild(cityButton);}
    //cityButton.setAttribute("name", "savedCity")

   

  
  
   /* if (username) {
      getUserRepos(username);
  
      repoContainerEl.textContent = '';
      nameInputEl.value = '';
    } else {
      alert('Please enter a GitHub username');
    }*/
  };

