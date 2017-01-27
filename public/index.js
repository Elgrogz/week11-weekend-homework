// var url = "http://api.openweathermap.org/data/2.5/forecast?q=Edinburgh,uk&mode=json&appid=" + apikey;

var url = "http://api.weatherunlocked.com/api/resortforecast/1401?app_id=20805c07&app_key=afab5ce56629579eb9db2f259459f349"
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
  var forecasts = document.querySelector('#forecasts');
  for (forecast of data.forecast) {
    console.log(forecast.snow_mm);
    var dateToAdd = document.createElement('ul');
    dateToAdd.innerText = forecast.date;
    var timeToAdd = document.createElement('li');
    timeToAdd.innerText = forecast.time;
    var snowfall = document.createElement('li');
    snowfall.innerText = forecast.snow_mm + "mm of snow";
    dateToAdd.appendChild(timeToAdd);
    dateToAdd.appendChild(snowfall);
    forecasts.appendChild(dateToAdd);
  }
}

window.onload = function() {
  makeRequest(url, requestComplete);
};