/*Each value will add to a running total of heat index. Ex. high humidity will return a higher number. Heat index will be between 0 and 100. Different ranges will result in a different clothing suggestion
*/
jQuery();
jQuery.getScript( "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" [ gettingJSON() ]);

var humidity;
var currentTemp;
var minTemp;
var maxTemp;
var windSpeed;
var rain;
var heatIndexTotal;
gettingJSON();
//heatIndexTotal += weighTemp(currentTemp);
//heatIndexTotal += weighHumidity(humidity);
//heatIndexTotal += weighWind(windSpeed);
//heatIndexTotal += weighRain(rain);
//var suggestion = suggest(heatIndexTotal);
printWeather();
function gettingJSON(){
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Philadelphia&units=imperial&APPID=d272907f403c9cc7140556f2320d4326",function(json){


        var temperature = document.getElementById('tempoutput')
        temperature.innerHTML += JSON.stringify(json["main"]["temp"]);
        var humidity = document.getElementById('humidoutput');
        humidity.innerHTML+= JSON.stringify(json['main']['humidity'])
        var tempmin = document.getElementById('tempminoutput')
        tempmin.innerHTML += JSON.stringify(json["main"]["temp_min"]);
        var tempmax = document.getElementById('tempmaxoutput')
        tempmax.innerHTML += JSON.stringify(json["main"]["temp_max"]);
        var windspeed = document.getElementById('windspeedoutput')
        windspeed.innerHTML += JSON.stringify(json["wind"]["speed"]);
        
        });
    }

/*Potentially weigh humidity last using the other aspects to calculate how much it impacts the heat total???
*/
function weighHumidity(h,w){
    
    if (w >= 70){
        
    }
    return;
}

function weighTemp(t){
    return;
}

function weighWind(w){
    return;
}

function weighRain(r){
    return;
}

function suggest(total){
    return;
}

function printWeather(){

}