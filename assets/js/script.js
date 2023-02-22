var openWeatherApiKey = "03b49d06e4d62099ead824504a13a78b";
var apiURL = "https://api.openweathermap.org";
var searchHistory = [];
var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var todayContainer = document.getElementById("today");
var forecastContainer = document.getElementById("forecast");
var searchHistoryContainer = document.getElementById("history");

function renderItems(city,data) {
    //this is where i'll execute the functions that actually render the info to the page
}

// function to fetch coordinates from first API
function fetchCoordinates(search) {
    var fetchURL = `${apiURL}/geo/1.0/direct?q=${search}&limit=5&appid=${openWeatherApiKey}`;
    fetch(fetchURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if (!data[0]){
            // alert incase users enters unacceptable input
            alert("location not found");
        } else {
            // this is where i'm gonna run a function that adds this search to your search history
            fetchWeather(data[0]); 
        }
    })
    .catch(function(error){
        console.error(error);
    })
}

// function to fecth data based on results from previous function
function fetchWeather(location) {
    var {lat} = location;
    var {lon} = location;
    var city = location.name;
    var fetchURL = `${apiURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherApiKey}`;
    fetch(fetchURL) 
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // here's where i'm gonna call another function that renders the information the page
        renderItems(city, data);
        console.log(data);
    })
    .catch(function(error){
        console.error(error);
    })
}

function handleSearch(event) {
    if (!searchInput.value) {
        return;
    } 
    event.preventDefault()
    var search = searchInput.value.trim();
    fetchCoordinates(search);
    searchInput.value = "";

}
