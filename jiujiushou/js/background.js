// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    var audio = document.createElement('audio')
    audio.src =  chrome.extension.getURL('js/1.mp3');
    audio.play()

    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: '../images/icon.png',
        title: 'message!',
        message: 'ring ring ring !'
    });
    console.log('收到来自content-script的消息：');
    console.log(request, sender, sendResponse);
    sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});
