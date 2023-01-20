let APIKey = "9d7113f3af5d25571785a917bd91f773";
let searchCity;

let searchFormEl = document.querySelector('#search-input');
let cityInputEl = document.querySelector('#city-input');
let citiesListEl = document.querySelector('.cities');
let citiesArr = [];
let fahrenheit;
let fahForecast;
let today = dayjs();
//let today = new Date();
//console.log(today);
$('#today-date').text(today.format('MMM D, YYYY'));

/*let dayOneEl = getElementById('day0D').innerHTML
dayOneEl = today++;*/
/*let daysEl = document.querySelector('.days');
console.log(daysEl.children[0].getAttribute('id'));
let dayChildEl = daysEl.children[0].getAttribute('id');
console.log(dayChildEl);
let childDateEl = dayChildEl.children[0].innerHTML;
console.log(childDateEl);*/

/*for (let i = 0; i < 5; i++) {
let nextDayArr = nextDayArr.push[i];
let day[i] = new Date(today);
day[i].setDate(day[i].getDate() + 1);
}*/
let day0 = new Date(today);
day0.setDate(day0.getDate() + 1);
console.log(day0);

let day1 = new Date(today);
day1.setDate(day1.getDate() + 2);
console.log(day1);

let day2 = new Date(today);
day2.setDate(day2.getDate() + 3);
console.log(day2);

let day3 = new Date(today);
day3.setDate(day3.getDate() + 4);
console.log(day3);

let day4 = new Date(today);
day4.setDate(day4.getDate() + 5);
console.log(day4);

let nextDayArr = [day0, day1, day2, day3, day4];

console.log(nextDayArr);

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
          document.getElementById('wind-select').innerHTML = "Wind: " + data.wind.speed + ' mph';
          document.getElementById('humid-select').innerHTML = "Humidity: " + data.main.humidity + '%';

          
          
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
            document.getElementById('day' + [i] + 'W').innerHTML = "Wind: " + dayArray[i].wind.speed + ' mph';
          }

          for (i = 0; i < dayArray.length; i++) {
            document.getElementById('day' + [i] + 'H').innerHTML = "Humidity: " + dayArray[i].main.humidity + '%';
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

