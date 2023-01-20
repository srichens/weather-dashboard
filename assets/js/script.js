let APIKey = "9d7113f3af5d25571785a917bd91f773";
let searchCity;

let searchFormEl = document.querySelector('#search-input');
let cityInputEl = document.querySelector('#city-input');
let citiesListEl = document.querySelector('.cities');
let citiesArr = [];
let fahrenheit;
let fahForecast;



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
          fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32);
          console.log(fahrenheit);
          document.getElementById('city-select').innerHTML = data.name;
          document.getElementById('temp-select').innerHTML = "Temp: " + fahrenheit + '\u00B0' + ' F';
          document.getElementById('wind-select').innerHTML = "Wind: " + data.wind.speed;
          document.getElementById('humid-select').innerHTML = "Humidity: " + data.main.humidity;

          
          
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
   
    let forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + APIKey;

    fetch(forecastURL)

    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          let dayOne = data.list[7];
          let dayTwo = data.list[15];
          let dayThree = data.list[23];
          let dayFour = data.list[31];
          let dayFive = data.list[39];
          let dayArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];
          

          for (i = 0; i < dayArray.length; i++) {
            document.getElementById('day' + [i] + 'D').innerHTML = dayArray[i].dt_txt;  
          }

          for (i = 0; i < dayArray.length; i++) {  
            fahForecast = Math.round(((parseFloat(dayArray[i].main.temp)-273.15)*1.8)+32);
            console.log(fahrenheit);         
            document.getElementById('day' + [i] + 'T').innerHTML = "Temp: " + fahForecast + '\u00B0' + ' F';         
          }

          for (i = 0; i < dayArray.length; i++) {            
            document.getElementById('day' + [i] + 'W').innerHTML = "Wind: " + dayArray[i].wind.speed;
          }

          for (i = 0; i < dayArray.length; i++) {
            document.getElementById('day' + [i] + 'H').innerHTML = "Humidity: " + dayArray[i].main.humidity;
          }


          /*console.log(data.list[7].dt_txt);
          console.log(data.list[7].main.temp);
          console.log(data.list[7].wind.speed);
          console.log(data.list[7].main.humidity);
          document.getElementById('day1D').innerHTML = data.list[7].dt_txt;
          document.getElementById('day1T').innerHTML = "Temp: " + data.list[7].main.temp;
          document.getElementById('day1W').innerHTML = "Wind: " + data.list[7].wind.speed;
          document.getElementById('day1H').innerHTML = "Humidity: " + data.list[7].main.humidity;*/
          
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })

   

  
  
   
  };

