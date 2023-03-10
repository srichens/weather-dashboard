let APIKey = "9d7113f3af5d25571785a917bd91f773";
// I set the default city to Minneapolis when the page is loaded, 
// so that a city shows up right away without having to use a location service
let city = "Minneapolis";
// this variable will hold the converted temp from the weather api data
let fahrenheit;
//I added fonts from Font Weather that had cute weather icons
let iconWeather;
let iconAdd;
let fahForecast;
let searchFormEl = document.querySelector('#search-input');
let cityInputEl = document.querySelector('#city-input');
let searchCity;
let newCity;
let citiesArr = [];
let citiesListEl = document.querySelector('.cities');
let buttonCity;

let today = dayjs();
// I used jquery here, since that is what we used with dayjs in class
$('#today-date').text('(' + today.format('MMM D, YYYY') + ')');

//I really wanted to get the forecast dates into some sort of loop, but it ended up being too complicated
//This just takes the current date and adds the appropriate number of days for each day block
//I searched and found the new Date()/setDate/getDate method, but that had all time and date data, so had to
//convert the format with the Intl.DateTimeFormat, which I also found my a google search - we did not go over it in class
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

setWeather();

// this function pulls the weather from  Open Weather Map, which we were instructed to use
// I followed the format from a function we used in class.

function setWeather(){
  
  // This first url fetches the current weather and puts it in the header
  let defaultQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

  fetch(defaultQueryURL)

  .then(function (response) {
    if (response.ok) {      
      response.json().then(function (data) {       
        console.log(data); 
        //targets the corresponding elements in the html paragraphs to render the weather data with conversions where needed
        fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32);        
        document.getElementById('city-select').innerHTML = data.name;
        document.getElementById('temp-select').innerHTML = "Temp: " + fahrenheit + '\u00B0' + ' F';
        document.getElementById('wind-select').innerHTML = "Wind: " + data.wind.speed + ' mph';
        document.getElementById('humid-select').innerHTML = "Humidity: " + data.main.humidity + '%';
       
        addIcon ();

        //this function adds an icon that corresponds to the weather conditions; I used Font Awesome icons and added color and
        //shading to make them more interesting.
        function addIcon() {
          iconWeather = data.weather[0].main;       

          iconAdd = document.getElementById('curr-icon');
      
          if (iconWeather == 'Clouds') {
            console.log("The weather is Clouds.");
            iconAdd.classList = "fa-solid fa-cloud";
          } else if (iconWeather == 'Clear') {
            console.log("The weather is Clear."); 
            iconAdd.classList = "fa-solid fa-sun";
          } else if (iconWeather == 'Snow') {
            console.log("The weather is Snow.");
            iconAdd.classList = "fa-solid fa-snowflake"; 
          } else if (iconWeather == 'Rain' || iconWeather =='Drizzle') {
            console.log("The weather is Rain or Drizzle.");
            iconAdd.classList = "fa-solid fa-cloud-showers-heavy";
          } else if (iconWeather == 'Thunderstorm') {
            console.log("The weather is Thunderstorm."); 
            iconAdd.classList = "fa-solid fa-cloud-bolt";
          } else if (iconWeather == 'Tornado') {
            console.log("The weather is Tornado.");
            iconAdd.classList = "fa-solid fa-tornado"; 
          } else {
            console.log("the weather is some sort of fog or smoke or haze"); 
            iconAdd.classList = "fa-solid fa-smog";
          }
        }     
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
  
  // this is a different url from Open Weather that is just a five day forecast
  // I was able to figure out loops to get all the weather info in the day blocks   
  let defaultForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

  fetch(defaultForecastURL)
  
  .then(function (response) {
    if (response.ok) {      
      response.json().then(function (data) {       
        // The forecast data included eight hours for each day. I chose the eighth hour, since it had the highest temp of the day
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
        
        for (i = 0; i <dayArray.length; i++) {
          if (dayArray[i].weather[0].main == 'Clouds') {
            console.log("The weather is Clouds.");
            document.getElementById('day' + [i] + 'I').classList = "fa-solid fa-cloud";
          } else if (dayArray[i].weather[0].main == 'Clear') {
            console.log("The weather is Clear.");
            document.getElementById('day' + [i] + 'I').classList ="fa-solid fa-sun";
          } else if (dayArray[i].weather[0].main ==  'Snow') {
            console.log("The weather is Snow."); 
            document.getElementById('day' + [i] + 'I').classList = "fa-solid fa-snowflake";
          } else if (dayArray[i].weather[0].main == 'Rain' || dayArray[i].weather[0].main == 'Drizzle') {
            console.log("The weather is Rain or Drizzle.");
            document.getElementById('day' + [i] + 'I').classList = "fa-solid fa-cloud-showers-heavy";
          } else if (dayArray[i].weather[0].main ==  'Thunderstorm') {
            console.log("The weather is Thunderstorm.");
            document.getElementById('day' + [i] + 'I').classList = "fa-solid fa-cloud-bolt";
          } else if (dayArray[i].weather[0].main == 'Tornado') {
            console.log("The weather is Tornado.");
            document.getElementById('day' + [i] + 'I').classList = "fa-solid fa-tornado";
          } else {
            console.log("the weather is some sort of fog or smoke or haze");
            document.getElementById('day' + [i] + 'I').classList = "fa-solid fa-smog";
          } 
        }
       
      });
    } else {
      alert('Error: ' + response.statusText);
    }    
  });     
};       

// This is the event listener for the search button when entering a city you want the weather for
searchFormEl.addEventListener('submit', formSubmitCity)

function formSubmitCity (event) {
  event.preventDefault();
     
  searchCity = cityInputEl.value.trim();  
  console.log(searchCity);
  
  // this saves the search input into local storage so there is a search history.
  // each searched city is turned into a button that is appended below the search button
  if (searchCity) {cityInputEl.value = "";    
    localStorage.setItem("savedCity", searchCity);
    newCity = localStorage.getItem("savedCity");    

    citiesArr.push(newCity);
   
    localStorage.setItem("allCities", JSON.stringify(citiesArr));
    let newCityArr = JSON.parse(localStorage.getItem("allCities"));
       
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

    // the cities in the search history needed to be buttons that could render their weather again when clicked;
    // this function does that  - I set the city name as the button's ID, so that is pulled and set as the city and pushed
    // back into the set weather function
    function renderButtonWeather () {
      buttonCity = ($(this).attr('id'));
      console.log(buttonCity);
      console.log(typeof buttonCity);

      city = buttonCity;
      setWeather();
    };
  };

  // this takes the initial search input and sets the weather for that city
  city = searchCity;
  setWeather();   

};

 