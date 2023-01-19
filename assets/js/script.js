let APIKey = "9d7113f3af5d25571785a917bd91f773";
let searchCity;

let searchFormEl = document.querySelector('#search-input');
let cityInputEl = document.querySelector('#city-input');
let citiesListEl = document.querySelector('.cities');
let citiesArr = [];



searchFormEl.addEventListener('submit', formSubmitCity)

function formSubmitCity (event) {
    event.preventDefault();
     
    searchCity = cityInputEl.value.trim();

   
    
    console.log(searchCity);
   
   if (searchCity) {cityInputEl.value = "";
    localStorage.setItem("savedCity", searchCity);
    let newCity = localStorage.getItem("savedCity");
    console.log(newCity);
   
    let cityButton = document.createElement("button");
    let cityBtnText = document.createTextNode(newCity);
    cityButton.appendChild(cityBtnText);
    
    citiesListEl.appendChild(cityButton);}

    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIKey;

    fetch(queryURL)

    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          console.log(data.main.temp);
          console.log(data.wind.speed);
          console.log(data.main.humidity);
          //displayRepos(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
   

   

  
  
   
  };

