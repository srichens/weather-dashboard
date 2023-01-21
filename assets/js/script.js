let APIKey = "9d7113f3af5d25571785a917bd91f773";
let searchCity;
let buttonCity;
let savedCity;
let newCity;
let searchFormEl = document.querySelector('#search-input');
let cityInputEl = document.querySelector('#city-input');
let citiesListEl = document.querySelector('.cities');
let citiesArr = [];
let fahrenheit;
let fahForecast;
let city = "Minneapolis";

setWeather();
function setWeather(){
  let defaultQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

  fetch(defaultQueryURL)

  .then(function (response) {
    if (response.ok) {      
      response.json().then(function (data) {       
        console.log(data); 
        fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32);        
        document.getElementById('city-select').innerHTML = data.name;
        document.getElementById('temp-select').innerHTML = "Temp: " + fahrenheit + '\u00B0' + ' F';
        document.getElementById('wind-select').innerHTML = "Wind: " + data.wind.speed + ' mph';
        document.getElementById('humid-select').innerHTML = "Humidity: " + data.main.humidity + '%';
        let iconWeather = data.weather[0].main;
       
       document.getElementById('icon').innerHTML = iconWeather;
       console.log(iconWeather);
      

       
        //console.log(iconEl.innerText);        
        //console.log(data.name);
        //console.log(data.weather[0].main);

       /* addIcon();
        function addIcon () {
        let iconWeather = data.weather[0].main;
        if (iconWeather == "Mist"){iconEl.addClass("fa-solid fa-cloud");}
        else return;

        }*/



      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
  
  let defaultForecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

  fetch(defaultForecastURL)

  .then(function (response) {
    if (response.ok) {      
      response.json().then(function (data) {       
        let dayOne = data.list[7];
        let dayTwo = data.list[15];
        let dayThree = data.list[23];
        let dayFour = data.list[31];
        let dayFive = data.list[39];
        let dayArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];
              
        for (i = 0; i < dayArray.length; i++) {  
          fahForecast = Math.round(((parseFloat(dayArray[i].main.temp)-273.15)*1.8)+32);                  
          document.getElementById('day' + [i] + 'T').innerHTML = "Temp: " + fahForecast + '\u00B0' + ' F';         
        }

        for (i = 0; i < dayArray.length; i++) {            
          document.getElementById('day' + [i] + 'W').innerHTML = "Wind: " + dayArray[i].wind.speed + ' mph';
        }

        for (i = 0; i < dayArray.length; i++) {
          document.getElementById('day' + [i] + 'H').innerHTML = "Humidity: " + dayArray[i].main.humidity + '%';
        }        
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });     
};       


let today = dayjs();

$('#today-date').text('(' + today.format('MMM D, YYYY') + ')');

let d0 = new Date(today);
d0.setDate(d0.getDate() + 1);
let dateFormat0 = new Date(d0);
let day0 = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(dateFormat0);

let d1 = new Date(today);
d1.setDate(d1.getDate() + 2);
let dateFormat1 = new Date(d1);
let day1 = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(dateFormat1);

let d2 = new Date(today);
d2.setDate(d2.getDate() + 3);
let dateFormat2 = new Date(d2);
let day2 = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(dateFormat2);

let d3 = new Date(today);
d3.setDate(d3.getDate() + 4);
let dateFormat3 = new Date(d3);
let day3 = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(dateFormat3);

let d4 = new Date(today);
d4.setDate(d4.getDate() + 5);
let dateFormat4 = new Date(d4);
let day4 = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(dateFormat4);

let nextDayArr = [day0, day1, day2, day3, day4];

for (i = 0; i < nextDayArr.length; i++) {
  document.getElementById('day' + [i] + 'D').innerHTML = nextDayArr[i];  
}

searchFormEl.addEventListener('submit', formSubmitCity)

function formSubmitCity (event) {
  event.preventDefault();
     
  searchCity = cityInputEl.value.trim();  
  console.log(searchCity);
   
  if (searchCity) {cityInputEl.value = "";    
    localStorage.setItem("savedCity", searchCity);
    let newCity = localStorage.getItem("savedCity");
    //console.log(newCity);

    citiesArr.push(newCity);
    //console.log(citiesArr);
    localStorage.setItem("allCities", JSON.stringify(citiesArr));
    let newCityArr = JSON.parse(localStorage.getItem("allCities"));
    //console.log(newCityArr);
    //console.log(newCityArr[0]);   
    
    let cityButton = document.createElement("button");
    let cityBtnText = document.createTextNode(newCity);
    cityButton.setAttribute("class", "new-city-button")

    for (i = 0; i < newCityArr.length; i++) {
      cityButton.setAttribute("id", newCityArr[i]);
    };   
    
    cityButton.appendChild(cityBtnText);          
    citiesListEl.appendChild(cityButton);

    let newCityButtonEl = $('.new-city-button');
    newCityButtonEl.on('click', renderButtonWeather);

    function renderButtonWeather () {
      let buttonCity = ($(this).attr('id'));
      console.log(buttonCity);
      console.log(typeof buttonCity);

      city = buttonCity;
      setWeather();
    };
  };

  city = searchCity;
  setWeather();   
};

 