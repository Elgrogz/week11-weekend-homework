var urlCairngormSnowDetails = "http://api.weatherunlocked.com/api/resortforecast/1401?app_id=20805c07&app_key=" + apikeyWeatherUnlocked; 

var urlGlenshee = "http://api.openweathermap.org/data/2.5/forecast?lat=56.887023&lon=-3.415439&appid=" + apikeyOpenWeatherMap;

var data = null;

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function() {
  if (this.status != 200) return;
  var jsonString = this.responseText;
  data = JSON.parse(jsonString);
  console.log(data);
  generateWeatherData();
}

var generateWeatherData = function() {
  var container = document.querySelector('#forecasts');
  var forecastData = [];
  for (var forecast of data.forecast) {
    forecastData.push({name:forecast.date + " " + forecast.time, data: [forecast.snow_mm]})
  }
  new ColumnChart(container, forecastData);
}

var initialize = function() {
  makeRequest(urlCairngormSnowDetails, requestComplete);

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