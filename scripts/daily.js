var month_list = [["January", 31], ["February", 28], ["March", 31], ["April", 30], ["May", 31],
                 ["June", 30], ["July", 31], ["August", 31],["September", 30],["October", 31],["November", 30],["December", 31]];


var d;
window.onload = function(){
    displayEvents();
    d = getDate(); /*day month year*/
    console.log(d[0]);
    var theDate = document.getElementById("date");
    setMonth(d[1]);
    setYear(d[2]);
    var monthName = document.getElementById("month-name").innerHTML;
    theDate.innerHTML =  d[1] + "/" + d[0] + "/" + d[2];
    var theDateWord = document.getElementById("dateWord");
    theDateWord.innerHTML = monthName + " "+ d[0]+ ", "+ d[2];
    var secs = 0;
    var id = setInterval(function(){
        secs++;
      if(secs> 1){
        clearInterval(id);
        createDays();
        changeit(parseInt(new Date().getDate()+1));
    }
   }, 1000);
   gettingJSON();
   loadNotifications();
}

function changeit(day){
  var dateCurrent = document.getElementById("date");
  var dateCurrentWord=document.getElementById("dateWord");
  data = currentMonthYear()
  month = document.getElementById("month-name").innerHTML;
  year = document.getElementById("year").innerHTML
  dateCurrent.innerHTML = String(data[0]+1) + "/" + String(day) + "/" +String(data[1]);
  dateCurrentWord.innerHTML = month +" " + day + ", " + year;

  data[0] += 1;
  if (data[0] < 10){
      data[0] = "0" + data[0];
  }

  if (day < 10){
      day = "0" + day;
  }
  loadEvents(String(data[1]) + "-" + String(data[0]) + "-" + String(day));
  console.log(String(data[1]) + "-" + String(data[0]) + "-" + String(day));
}

function loadEvents(date){
    console.log(date)
    document.getElementById("eventText").innerHTML = ""
    var when = localStorage.getItem("when").split(",");
    var details = localStorage.getItem("events").split(",");
    for (var i = 0; i < localStorage.getItem("when").length; i++) {
        if (when[i] != 'undefined'){
            if (when[i].slice(0, 10) == String(date)){
                console.log(when[i])
                document.getElementById("eventText").innerHTML += details[i] + "<br>";
            }
        }
    }
}

function loadNotifications(){
    d = new Date()
    var when = localStorage.getItem("when").split(",");
    var details = localStorage.getItem("events").split(",");
    for (var i = 0; i < localStorage.getItem("when").length; i++) {
        var month = d.getMonth() + 1;
        if (month < 10){
            month = "0" + month;
        }
        var day = d.getDate();
        if (day < 10){
            day = "0" + day;
        }
        var hour = d.getHours();
        if (hour < 10){
            hour = "0" + day;
        }
        console.log(when[i].slice(11, 13))
        if (when[i].slice(0, 10) == (String(d.getFullYear()) + "-" + month + "-" + day)){
            if (when[i].slice(11, 13) == String(hour))
                document.getElementById("notification").innerHTML += details[i] + "<br>";
        }
    }
}

function gettingJSON(){
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Philadelphia&units=imperial&APPID=d272907f403c9cc7140556f2320d4326",function(json){

        var temperature = document.getElementById('temp-out')
        temperature.innerHTML += JSON.stringify(json["main"]["temp"]);
        var humidity = document.getElementById('humid-out');
        humidity.innerHTML+= JSON.stringify(json['main']['humidity'])
        var tempmin = document.getElementById('temp-min-out')
        tempmin.innerHTML += JSON.stringify(json["main"]["temp_min"]);
        var tempmax = document.getElementById('temp-max-out')
        tempmax.innerHTML += JSON.stringify(json["main"]["temp_max"]);
        var windspeed = document.getElementById('windspeed-out')
        windspeed.innerHTML += JSON.stringify(json["wind"]["speed"]);
        temperature.innerHTML += '&#176 F';
        humidity.innerHTML += '%';
        tempmin.innerHTML += '&#176 F';
        tempmax.innerHTML += '&#176 F';
        windspeed.innerHTML += ' mph';
        document.getElementById('weatherbox').style.display = 'block';

    });
}

function readTextFile(){
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open('GET', "smallDate.txt", false);
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
        temp += text.replace(/1/g, k+1).replace('0x0', monthYear[1] + "-" + month_str + "-" + day_str);
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

function displayEvents(){
  var events = localStorage.getItem("events");
  var when = localStorage.getItem("when");
  if(events = null){
    document.getElementById("eventText").innerHTML= "No Events";
  }
  else{
    document.getElementById("eventText").innerHTML= "No Events";
  }
}
