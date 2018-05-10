/*Each value will add to a running total of heat index. Ex. high humidity will return a higher number. Heat index will be between 0 and 100. Different ranges will result in a different clothing suggestion
*/
var humidity = 55;
var currentTemp = 87;
var minTemp;
var maxTemp;
var windSpeed = 2;
var rain = 0;
var heatIndexTotal;
getWeather();
heatIndexTotal += weighTemp(currentTemp);
heatIndexTotal += weighHumidity(humidity);
heatIndexTotal += weighWind(windSpeed);
heatIndexTotal += weighRain(rain);
var suggestion = suggest(heatIndexTotal);

function getWeather(){
    return;
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