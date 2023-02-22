//VARIABLES AND DOM ELEMENTS
//===========================================================================

var openWeatherApiKey = "03b49d06e4d62099ead824504a13a78b";
var apiURL = "https://api.openweathermap.org";
var searchHistory = [];
var searchInput = document.getElementById("search-input");
var todayContainer = document.getElementById("today");
var forecastContainer = document.getElementById("forecast");
var searchHistoryContainer = document.getElementById("history");


//EVENT LISTENERS
//===========================================================================

  //Listener for a click on the search button
  $("#search-button").on("click", function () {
    event.preventDefault();
    handleSearch();
  });


//DECLARING ALL FUNCTIONS
//===========================================================================

// function to handle the text that user's put into the search box
function handleSearch() {
    if (!searchInput.value) {
        return; // if user inputs nothing then exit the function
    } 
    //clean up the user's input with .trim and call the first API
    var search = searchInput.value.trim();
    fetchCoordinates(search);
    searchInput.value = ""; // clears the search box

}

// function to fetch coordinates from first API
function fetchCoordinates(search) {
    // var fetchURL = `${apiURL}/geo/1.0/direct?q=${search}&limit=5&appid=${openWeatherApiKey}`;
    var fetchURL = `${apiURL}/data/2.5/weather?q=${search}&limit=5&appid=${openWeatherApiKey}`;
    fetch(fetchURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if (data.cod == 404){
            // alert incase users enters unacceptable input
            alert("Oops! That city doesn't seem to exist");
        } else {
            // pass data to next function for the second API call
            fetchWeather(data); 
        }
    })
    .catch(function(error){
        console.error(error);
    })
}

// function to fecth data from 2nd API based on results from previous API call
function fetchWeather(location) {
    var {lat} = location.coord;
    var {lon} = location.coord;
    var city = location.name;
    var fetchURL = `${apiURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherApiKey}`;
    fetch(fetchURL) 
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // here's where i'm gonna call another function that renders the information the page
        renderItems(city, data, location);
    })
    .catch(function(error){
        console.error(error);
    })
}


function renderItems(city, data, location) {
    console.log(location);
    // generateTodayCard(location);
    //this is where i'll execute the functions that actually render the info to the page
    let hourlyWeather = data.list
    console.log(hourlyWeather);
    for (let i = 0; i < hourlyWeather.length; i+=8) {
        console.log(i);
        console.log(hourlyWeather[i]);
        // call function to generate card for each forecast
    };
    // generateHistoryButtons();
}

function generateTodayCard(){}
function generateForecastCard(){}
function generateHistoryButtons(){
    // check whether theres any  city name history in local storge
    // if not create a city names array, 
    // if yes push current city name to  existing array
    // then, generate buttons with a for loop on the history array 
}


