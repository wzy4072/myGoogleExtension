console.log('this is tools')

var xmlhttp;
if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp = new XMLHttpRequest();
}
else {
    // IE6, IE5 浏览器执行代码
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

function myAjax(method, url, data, async = true) {
    if (method === 'GET') {
        xmlhttp.open("GET", url, async);
        xmlhttp.send();
    } else if (method === 'POST') {
        xmlhttp.open("POST", url, async);
        xmlhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xmlhttp.setRequestHeader("authorization", "eyJhbGciOiJIUzUxMiJ9.eyJjcmVhdGVkIjoxNTQxNTU0MDA0NzY2LCJ0eXBlIjoibG9naW5BdXRoTGV2ZWwiLCJleHAiOjE1NTQ1MTQwMDQsInVzZXJJZCI6MSwidmVyc2lvbiI6MjA5Nn0.Fiz47snjGq_R-Kh-x2WaG5hOvYPBShBQ0lBUQfQRugdEg76xjUHPPOGx9bMVVqOl2DhqPZQ7Afwh3rG0Hh0oRQ");
        xmlhttp.send(data);
    }else{
        console.log('method not fined')
    }
}

