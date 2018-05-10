var month_list = [["January", 31], ["February", 28], ["March", 31], ["April", 30], ["May", 31],
                 ["June", 30], ["July", 31], ["August", 31],["September", 30],["October", 31],["November", 30],["December", 31]];

window.onload = function(){
    var d = getDate();
    setMonth(d[1]);
    setYear(d[2]);
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
