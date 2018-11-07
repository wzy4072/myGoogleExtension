console.log('this is content-script')

var sendData = {"classTime":null,"classAddr":null,"classStatus":null,"arg1":null,"pageNum":1,"pageSize":20}
setTimeout(function () {
    if(window.location.origin === "http://192.168.1.21:8033"){
        var response = myAjax('POST','http://192.168.1.21:8032/baseInfo/setUp/selectSetupClassInfoList',JSON.stringify(sendData))
        console.log('response',response)
    }
},5000)


// chrome.webRequest.onBeforeRequest.addListener(details => {
//     console.log('detaild', details)
// }, { urls: ["<all_urls>"] }, ["blocking"]);












// console.log('这里可以获得得到页面DOM')
// window.onload=function(){
//      var btns = document.getElementsByClassName('el-button')
//     function domMap(doms) {
//         var dom = null
//         for (let i = 0; i < doms.length; i++) {
//             let s = doms[i].innerHTML
//             if (s.indexOf('查询') !== -1) {
//                 dom = doms[i]
//             }
//         }
//         return dom
//     }
//     console.log(domMap(btns))
// }
