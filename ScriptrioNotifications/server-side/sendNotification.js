var http = require("http");
var log = require("log");

function getWeather(location) {
 
  var weatherService = "http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(location);
  var callResult = http.request({"url":weatherService});

  if (callResult && callResult.body) {
	  var weatherInfo = JSON.parse(callResult.body);
      return  {

        temperature: weatherInfo.main.temp,
        humidity: weatherInfo.main.humidity,
        main: weatherInfo.weather[0].main
      }
  } else {
    return null;
  }
}

function buildMessageContent(jsonContent) {
  
  var weatherInfo = JSON.stringify(jsonContent);
  var lastLocation = storage.global.lastCity;
  var location = storage.global.city;
  var content = "";
  console.log(location);
  if (location) {
    content = content + location + " on " + new Date() + ": " + weatherInfo;
  }
  
  if (lastLocation) {
    content = content + ". \nLast requested location: " + lastLocation + ". ";
  }
  
  return content;
}

try {
  //channel can be one of email or tweet
  var channel = request.parameters.channel;
  var location = request.parameters.location; 
  if (location) {
    storage.global.city = location;
  }
  
  var weatherInfo = getWeather(location);

  if (!weatherInfo) {
    return {"status": "failure", "errorDetail": "Unable to contact weather API in a timely manner. Please try again."}
  }
  var message = buildMessageContent(weatherInfo);

  // log to the console the message to be sent
  console.log("Message to be sent: " + message);
  console.log("Message length: " + message.length);

  // add to the script logs the message to be sent
  log.setLevel("info");
  log.info("Message to be sent: " + message);

  switch(channel) {
    case "email":
      sendMail("YOUR_EMAIL", "demo@scriptr.io", "Weather Info", message);
      break;
    case "tweet":
      var TWITTER_KEY = ""; // REPLACE WITH YOUR TWITTER APP CREDENTIALS
      var TWITTER_SECRET = "";
      var TWITTER_TOKEN = "";
      var TWITTER_TOKEN_SECRET = ""; 
      tweet(TWITTER_KEY, TWITTER_SECRET, TWITTER_TOKEN, TWITTER_TOKEN_SECRET, message);
      break;
  }

  return {"status": "success"};   				   				
} catch(e) {
  return {"status": "failure", "errorDetail": "An unexpected error occurred. Please try again."}
}
   				   				   				   				   				   				   							
