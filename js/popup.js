function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        })
    })
}
$(function () {
    $('#start').click(() => {
        sendMessageToContentScript({ start: true, message: '请求启动运行' }, function (response) {
            console.log('接收到content-script回复', response);
        })
    })

    $('#stop').click(() => {
        sendMessageToContentScript({ start: false, message: '请求停止运行' }, function (response) {
            console.log('接收到content-script回复', response);
        })
    })
})
