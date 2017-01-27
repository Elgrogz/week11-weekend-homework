var url = "http://api.openweathermap.org/data/2.5/forecast?q=Edinburgh,uk&mode=json&appid=" + apikey;
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
}

window.onload = function() {
  console.log("Hello");
  makeRequest(url, requestComplete);
};