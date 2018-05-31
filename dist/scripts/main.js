// API ID
var appId = "4a13d740e65361ebccf80a2931049051";

// Manipulation Variables
var output = document.getElementById('output');
var cityState = document.getElementById('cityState');
var dayTime = document.getElementById('dayTime');
var weatherImg = document.getElementById('weatherImg');
var temp = document.getElementById('temp');
var weatherCondition = document.getElementById('weatherCondition');
var tempK = document.getElementById('temperatureOutputK');
var tempF = document.getElementById('temperatureOutputF');
var tempC = document.getElementById('temperatureOutputC');
var zipInput = document.getElementById('zipInput');
var windSpeed = document.getElementById('windSpeed');
var humidity = document.getElementById('humidity');

var geoError = document.getElementById('geoError');

// Error Variables
var error = document.getElementById('error');
var errorMessage = document.getElementById('errorMessage');

var kelvin;

var apiRequest;

navigator.geolocation.getCurrentPosition(getWeather, geoLocationError);


function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function getWeather(position) {
	var lat = precisionRound(position.coords.latitude, 1);
	var lon = precisionRound(position.coords.longitude, 1);
	var url = "http://api.openweathermap.org/data/2.5/weather?lat=<lat>&lon=<lon>&appid=<appid>"
	url = url.replace("<lat>", lat);
	url = url.replace("<lon>", lon);
	url = url.replace("<appid>", appId);

	apiThrower(url);
/*	apiRequest = new XMLHttpRequest();
	apiRequest.onload = catchResponse;
	apiRequest.onerror = httpRequestOnError;
	apiRequest.open('get', url, true);
	apiRequest.send();

	error.style.display = 'block';
	errorMessage.innerHTML = apiRequest.statusText;*/
}

function apiThrower(url)
{
	apiRequest = new XMLHttpRequest();
	apiRequest.onload = catchResponse;
	apiRequest.onerror = httpRequestOnError;
	apiRequest.open('get', url, true);
	apiRequest.send();

	//error.style.display = 'block';
	errorMessage.innerHTML = apiRequest.statusText;
}

function httpRequestOnError()
{
	errorMessage.innerHTML = 'There was a problem reaching the weather API. Try again later';
	error.style.display = 'block';
}

function geoLocationError() {
	geoError.style.display = 'block';
}

function geoLocationErrorFix() {
	var url = "http://api.openweathermap.org/data/2.5/weather?zip=<zipCode>&us&appid=<appId>";
	url = url.replace("<zipCode>", zipInput.value);
	url = url.replace("<appId>", appId);
	geoError.style.display = 'none';
	apiThrower(url);
}

function getDate()
{
	var currentDate = Date();
	currentDate = currentDate.split(" ");
	return (currentDate[0] + ", " + currentDate[1] + " " + currentDate[2] + ", " +currentDate[3]);
}

function catchResponse()
{
	if(apiRequest.statusText === "OK")
	{
		var response = JSON.parse(apiRequest.responseText);
		error.style.display = 'none';
		dayTime.innerHTML = getDate();
		cityState.innerHTML = response.name;
		weatherCondition.innerHTML = response.weather[0].main;
		kelvin = response.main.temp;

		windSpeed.innerHTML = "Wind Speed: " + response.wind.speed + "mph";
		humidity.innerHTML = "Humidity: " + response.main.humidity + "%";


		convertKtoF();
		displayImg(response.weather[0].id);

		output.style.display = 'block';
	}
	else
	{
		error.style.display = 'block';
		errorMessage.innerHTML = apiRequest.statusText;

	}
}

// Functions to change Kelvin into celsius or farenheit
function convertKtoF()
{
	temp.innerHTML = Math.round((kelvin * 9/5) - 459.67) + '&deg';
}

function convertKtoC()
{
	temp.innerHTML = Math.round(kelvin - 273.15) + '&deg';
}

function backToK()
{
	temp.innerHTML = Math.round(kelvin);
}

function displayImg(id)
{
	if(id == 800)
	{
		weatherImg.src='https://png.icons8.com/windows/50/000000/sun.png';
	}
	else if(id >= 801 && id <= 804)
	{
		weatherImg.src='https://png.icons8.com/windows/50/000000/partly-cloudy-day.png';
	}
	else if(id >= 300 && id <= 531)
	{
		weatherImg.src='https://png.icons8.com/windows/50/000000/rainy-weather.png';
	}
	else if(id >= 200 && id <= 232)
	{
		weatherImg.src='https://png.icons8.com/windows/50/000000/storm.png';
	}
	else if(id >= 600 && id <= 622)
	{
		weatherImg.src='https://png.icons8.com/windows/50/000000/snow.png';
	}
	else if(id >= 701 && id <=781)
	{
		weatherImg.src='https://png.icons8.com/windows/50/000000/fog-day.png';
	}
	else
	{
		weatherImg.src='https://png.icons8.com/windows/50/000000/question-mark.png';
	}
}



