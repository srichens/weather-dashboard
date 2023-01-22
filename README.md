# Weather Dashboard
Bootcamp Week 6 Challenge

## This week's bootcamp challenge for Server Side APIs was to create a weather app from scratch with the following criteria:
1. Includes a dashboard that shows current weather and a five-day forecast, as well as an input field with search button to pull up specific cities when entered.

2. The current weather and forecasted weather includes city name, an icon representing weather conditions, the temperature, humidity, and wind speed.

3. When a city is searched, it appears in a search history. You can then click the button on cities in the search history, and that will pull up the weather and forecast for that city again.

[Link to deployed web page](https://srichens.github.io/weather-dashboard/)

![Screenshot 2023-01-22 at 5 29 00 PM](https://user-images.githubusercontent.com/117301473/213946300-11f3baf2-5958-4cea-89f0-9822501c489c.png)

## Some Highlights of My Process (there are also comments in the javascript):
1. I did not use a CSS Framework, so I started by laying out the page with flex boxes after setting up a basic html. I did most of the CSS styling at the end, so I left borders on the flex boxes until I had the wrapping and sizing for smaller screens figured out:

![Screenshot 2023-01-20 at 7 03 55 PM](https://user-images.githubusercontent.com/117301473/213943352-fe822ad7-27a7-4a2c-9e7e-1d9cada1c700.png)

2. I at first thought of using the dates from the Open Weather Map data, but because of the unix format of the weather data, it seemed easier to use dayjs and add a day for each forecast day. It didn't end up being so easy, but I did find a method to pull consecutive days. And I still had to convert that time data to a different format, so maybe pulling the data from the weather data wouldn't have been any more difficult. I also had to google to convert the temp to fahrenheit.

3. Adding the weather icons was fun, but also much more work than I anticipated. I found the specific weather data I wanted to use, looked up all of the variations that Open Weather Map had, and then used if statements for all the categories to add the icons. I also added color and shadows to the icons to make them look a little 3D.

4. I figured out pretty quickly that I wanted to list the search history by appending buttons; that seemed logical. It took a little longer to pull the info from the appended buttons so the weather could be rendered again, since the data wasn't in the html and it was hard to visualize. But I eventually figured it out by creating IDs when appending the buttons, and it worked great.

5. I started out with THREE different setWeather functions: one for the default city when the page is loaded, one for the city that is searched, and one for the cities in the search history. I was estatic when I figured out how to pass them all through one setWeather function; have a universal variable "city", take each stored or inputted city data, set it equal to city, and pass it through. Very simple in the end, but I was proud of myself.

6. I was also proud of myself for figuring out the loops to render the data for the five forcast days. I've had trouble with loops, but one day in office hours, the TA simplified someone else's loop, and I suddenly understood it (well, I understood it better, anyway).

## Things I Would Add or Fix if I Had More Time:
1. I did not use the latitude/longitude URL from Open Weather. I started with just the city one, because that seemed easier, and then it seemed too complicated to change it. So I think it's just pulling up the #1 search output for each city name. So it's not specific enough. Minneapolis, MN is the only Minneapolis it's pulling up.

2. If someone types in something in the wrong format in the city search (like adds a state), the button still appends with whatever was entered. The error message needs to have some sort of clear button function, but that just got too complicated for me.

3. I used jquery a couple of times because the situations were similar to exercises we did in class, but I should have made it all javascript to be consistent.
