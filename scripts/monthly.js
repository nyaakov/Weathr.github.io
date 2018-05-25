var month_list = [["January", 31], ["February", 28], ["March", 31], ["April", 30], ["May", 31],
                 ["June", 30], ["July", 31], ["August", 31],["September", 30],["October", 31],["November", 30],["December", 31]];


var d;

window.onload = function(){
    d = getDate();
    setMonth(d[1]);
    setYear(d[2]);
    var secs = 0;
    var id = setInterval(function(){
        secs++;
      if(secs> 1){
        clearInterval(id);
        createDays();
    }
   }, 1000);
   gettingJSON();
}

function gettingJSON(){
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&units=imperial&APPID=d272907f403c9cc7140556f2320d4326",function(json){

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
        temperature.innerHTML += '&#176 F';
        humidity.innerHTML += '%';
        tempmin.innerHTML += '&#176 F';
        tempmax.innerHTML += '&#176 F';
        windspeed.innerHTML += ' mph';
        document.getElementById('box').style.display = 'block';

    });
}

function readTextFile(){
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open('GET', "date.txt", false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

function createDays(){
    // lots of editing to this -- should add days from last month
    var monthYear = currentMonthYear();
    var days = document.getElementById('days');
    var day = new Date(monthYear[1], monthYear[0], 1).getDay();
    var temp = "";
    var text = readTextFile();
    temp += "<tr>";

    for (var i = 0; i < day; i++){
        temp += "<td class='day'>" + (i+1) + "</td>";
    }

    var sevens = i-1;

    for (var k = 0; k < month_list[monthYear[0]][1]; k++){
        sevens += 1;
        if (sevens % 7 == 0){
            temp += "</tr><tr>";
        }
        var day_str = (k+1) + "";
        if (k < 9){
            day_str = "0" + day_str;
        }

        var month_str = (monthYear[0]+1) + "";
        if (monthYear[0] < 9){
            month_str = "0" + month_str;
        }
        temp += text.replace('1', k+1).replace('0x0', monthYear[1] + "-" + month_str + "-" + day_str);

    }

    day = new Date(monthYear[1], monthYear[0], month_list[monthYear[0]][1]).getDay();
    for (var j = 0; j < 6-day; j++){
        temp += "<td class='day'>" + (j+1) + "</td>";
    }

    temp += "</tr>";
    days.innerHTML = temp;
}

function currentMonthYear(){
    var month = document.getElementById('month-name').innerHTML;
    var year = document.getElementById('year').innerHTML;
    var m;

    for (m = 0; m < 12; m++){
        if (month_list[m][0] == month){
            return [m, year];
        }
    }
}

function changeMonth(dir){
    var month = document.getElementById('month-name').innerHTML;
    var year = document.getElementById('year').innerHTML;
    var m;

    for (m = 0; m < 12; m++){
        if (month_list[m][0] == month){
            break;
        }
    }

    if (dir == 1){
        if (m == 11){
            setMonth(0);
            setYear(parseInt(year)+1);
        } else {
            setMonth(m+1)
        }
    } else {
        if (m == 0){
            setMonth(11);
            setYear(parseInt(year)-1);
        } else {
            setMonth(m-1);
        }
    }

    createDays();
    listUpcomingEvents();
}

function setMonth(m){
    document.getElementById("month-name").innerHTML = month_list[m][0];
}

function setYear(y){
    document.getElementById("year").innerHTML = y;
}

 function getDate(){
     var current = new Date();
     var d = current.getDate();
     var m = current.getMonth();
     var y = current.getFullYear();
     return [d, m, y];
 }
