document.addEventListener('DOMContentLoaded', function () {
    // 注入自定义JS
    injectCustomJs();
    injectCustomJs('js/download.js');

});
// 向页面注入JS
function injectCustomJs(jsPath) {
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    document.body.appendChild(temp);
}


// 接收 popup background 信息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // 收集命令
    if (request.name === 'collect') {
        // alert('content中转->inject：collect')
        window.postMessage(request, '*');
    }
    // 粘贴命令
    if (request.name === 'paste') {
        // alert('content中转->inject：paste')
        window.postMessage(request, '*');
    }
    // 粘贴sku
    if (request.name === 'pasteSku') {
        // alert('content中转->inject：pasteSku')
        window.postMessage(request, '*');
    }
});

// 接收 inject 消息
window.addEventListener("message", function (e) {
    let sendData = e.data
    if(typeof e.data === "string"){
        sendData = JSON.parse(e.data)
    }
    if (sendData.name === 'collectResult') {
        // alert('content中转->background：collectResult')
        chrome.runtime.sendMessage(sendData, function (response) {})
    }
    if(sendData.name === 'pasteResult'){
        // alert('content中转->background：pasteResult')
        chrome.runtime.sendMessage(sendData, function (response) {})
    }
    // 中转消息 接收inject 然后发送给 background
}, false);