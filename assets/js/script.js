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

//   //listener to clear button
//   $("#clear-btn").on("click", function () {
//     console.log("clear");
//     localStorage.removeItem("Weather search history");
//     location.reload();
//   });

//   //listener to the buttons in the search history sidebar
//   $(document).on("click", ".list-group-item", function () {
//     inputSwitch = false;
//     listCity = $(this).text();
//     showWeather();
//   });

// listener for page load to display search history
// $(window).on("load", generateHistoryButtons)



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


// function to render all cards and buttons to the page at the same time
function renderItems(city, data, location) {
    console.log(`This is city`,city);
    console.log(`This is data`,data);
    console.log(`This is location`,location);
    
    generateTodayCard(location);
    
    // loop to iterate through the 3-hourly forecast array and generate a card every 24 hours
    let hourlyWeather = data.list
    for (let i = 0; i < hourlyWeather.length; i+=8) {
        generateForecastCard();
    };

    addToSearchHistory();
}

// function to render just todays' card
function generateTodayCard(){}

// function to render just forecast cards
function generateForecastCard(){}

// function to add most recently searched city to the search history
function addToSearchHistory(){
    // check whether theres any  city name history in local storge
    // if not, create a city names array, 
    // if yes, push current city name to existing LS array
    // then, call the generateHistoryButtons function to append new city to view
}

// function to render just history buttons
function generateHistoryButtons(){
    // check if anything is in  local storage and populate screen
    // if no, return
    // if yes, run a for loop on the history array from LS
    // append a card for each city
}


