var urlCairngormSnowDetails = "http://api.weatherunlocked.com/api/resortforecast/1401?app_id=20805c07&app_key=" + apikeyWeatherUnlocked; 

var urlAviemoreWeatherDetails = "http://api.openweathermap.org/data/2.5/forecast?q=Aviemore,uk&mode=json&appid=" + apikeyOpenWeatherMap;

var cairngormSnowData = null;
var aviemoreWeatherData = null;

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var snowRequestComplete = function() {
  if (this.status != 200) return;
  var jsonString = this.responseText;
  cairngormSnowData = JSON.parse(jsonString);
  console.log(cairngormSnowData);
  
  var container = document.querySelector('#cairngorm-snow-forecast');
  var forecastData = [];
  for (var forecast of cairngormSnowData.forecast) {
    forecastData.push({name:forecast.date + " " + forecast.time, data: [forecast.snow_mm]})
  }
  new ColumnChart(container, forecastData);
}

var aviemoreRequestComplete = function() {
  if (this.status != 200) return;
  var jsonString = this.responseText;
  aviemoreWeatherData = JSON.parse(jsonString);
  console.log(aviemoreWeatherData);

  var container = document.querySelector('#aviemore-forecast');

  var weatherData = document.createElement('ul');
  var currentTemp = document.createElement('li');
  console.log(aviemoreWeatherData.list[0].main.temp);

  currentTemp.innerText = (aviemoreWeatherData.list[0].main.temp - 273.15).toFixed(2) + "°C";
  weatherData.appendChild(currentTemp);
  

  container.appendChild(weatherData);
  
}

var initialize = function() {
  makeRequest(urlCairngormSnowDetails, snowRequestComplete);
  makeRequest(urlAviemoreWeatherDetails, aviemoreRequestComplete);

  var mapDiv = document.querySelector("#main-map");
  var cairngorm = {lat: 57.133765, lng: -3.670272};
  var mainMap = new MapWrapper(mapDiv, cairngorm, 8);

  mainMap.addMarker(cairngorm, "Cairngorm Ski Centre");

};

window.onload = initialize;


// //attempt to get only dates
//   var forecastData = [];
//   for (var forecast of data.forecast) {
//     for (var i = 0; i < forecastData.length; i++) {
//       console.log(forecastData);
//         if (forecastData[i].name != forecast.date) { 
//         forecastData[i] === {name:forecast.date, data: [forecast.snow_mm]};
//       } else {
//       forecastData[i].data += forecast.snow_mm;
//     }
//   }
// }