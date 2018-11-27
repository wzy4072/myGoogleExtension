// 接收 popup background 信息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.task === 'collect') {
        collect()
    }

});

function collect() {
    var result = {
        task: 'paste',
        info: { name: "大大泡泡糖", price: "12" }
    }
    var dom = document.getElementById('note-fixed-ad-container').innerHTML
    result.info.content = dom
    sendMessage(result)
}

// 给  popup background 发送消息
function sendMessage(message) {
    chrome.runtime.sendMessage(message, function (response) {
        console.log('收到来自后台的回复：' + response);
    })
}