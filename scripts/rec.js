/*Each value will add to a running total of heat index. Ex. high humidity will return a higher number. Heat index will be between 0 and 100. Different ranges will result in a different clothing suggestion
*/
jQuery.getScript( "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" [ gettingJSON() ]);

var humidity;
var currentTemp;
var windSpeed;
var rain;
var heatIndexTotal = 0;
gettingJSON();
heatIndexTotal += weighTemp(currentTemp);
heatIndexTotal += weighHumidity(humidity);
heatIndexTotal += weighWind(windSpeed,currentTemp);
//heatIndexTotal += weighRain(rain);
var suggestion = suggest(heatIndexTotal);
printWeather();
function gettingJSON(){
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Philadelphia&units=imperial&APPID=d272907f403c9cc7140556f2320d4326",function(json){


        currentTemp = JSON.stringify(json["main"]["temp"]);
        humidity = JSON.stringify(json['main']['humidity'])
        tempmin.innerHTML += JSON.stringify(json["main"]["temp_min"]);
        tempmax.innerHTML += JSON.stringify(json["main"]["temp_max"]);
        windSpeed = JSON.stringify(json["wind"]["speed"]);
        
        });
    }

/*Potentially weigh humidity last using the other aspects to calculate how much it impacts the heat total???
*/
function weighHumidity(h,w){
    
    if (h <= 15){
        return -5;
    }
    if (h > 15 && h <= 30){
        return -3;
    }
    if (h > 30 && h <= 40){
        return -1.5;
    }
    if (h > 40 && h <= 50){
        return 0;
    }
    if (h > 50 && h <= 65){
        return 1;
    }
    if (h > 65 && h <= 75){
        return 2;
    }
    if (h > 75 && h <= 85){
        return 3.5;
    }
    if (h > 85 && h <= 100){
        return 5;
    }

function weighTemp(t){
    var base = t;
    return base;
}

function weighWind(w,t){
    var wind = w;
    var temp = t;
    exp = Math.pow(wind, .16)
    var chill = 35.74 + (.6215*temp) - (35.75*exp) + ((.4275*temp)*exp)
    var total = temp - chill;
    return total;
}

function weighRain(r){
    return;
}

function suggest(total){
    return;
}

function printWeather(){
    
}