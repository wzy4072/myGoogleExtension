// 获取当前选项卡ID
//tabs: [
//     {
//         "active": false, "audible": false, "autoDiscardable": true,
//         "discarded": true,
//         "favIconUrl": "http://192.168.1.248/zentao/favicon.ico",
//         "height": 0,
//         "highlighted": false,
//         "id": 1478068763,
//         "incognito": false,
//         "index": 0,
//         "mutedInfo": { "muted": false },
//         "pinned": false,
//         "selected": false,
//         "status": "complete",
//         "title": "我的地盘::我的Bug - 禅道",
//         "url": "http://192.168.1.248/zentao/my-bug.html",
//         "width": 0,
//         "windowId": 1478068385
//     }
// ]

var dataStor = {
    fromIP: 'https://detail.1688.com',
    toIP: 'https://item.publish.taobao.com/sell/publish.htm',
    fromId: null,
    toId: null
}
// 运行
function run() {
    getTabs()
}
// 粘贴sku
function pasteSku() {
    chrome.tabs.sendMessage(dataStor.toId, { name: 'pasteSku' }, function (response) { })
}



// 获取当前窗口 所有tab
function getTabs(callback) {
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        // 检测两个窗口是否打开 
        dataStor.fromId = null
        dataStor.toId = null
        tabs.map(tab => {
            if (tab.url.indexOf(dataStor.fromIP) !== -1) { dataStor.fromId = tab.id }
            if (tab.url.indexOf(dataStor.toIP) !== -1) { dataStor.toId = tab.id }
        })
        if (!dataStor.fromId) { throwNotifi('没有打开' + dataStor.fromIP); return false }
        if (!dataStor.toId) { throwNotifi('没有打开' + dataStor.toIP) }
        // alert('background发出->content：collect')
        chrome.tabs.sendMessage(dataStor.fromId, { name: 'collect' }, function (response) { })
    })
}


// 监听来自content-script的消息 并执行任务库中指定任务
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.name === 'collectResult') {
        // alert('background收到->contentA:collectResult-> contentB：paste')
        chrome.tabs.sendMessage(dataStor.toId, { name: 'paste', info: request }, function (response) { })
    }
    if (request.name === 'pasteResult') {
        // alert('background收到->contentB：pasteResult')
        throwNotifi(request)
    }
});

/**
 * 窗口弹出消息
 * @param {*} msg 
 */
function throwNotifi(msg) {
    msg = JSON.stringify(msg)
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: '../img/icon.png',
        title: 'message!',
        message: msg || '消息！'
    });
}


// 获取当前窗口 当前tab
// function getCurrentTabId(callback) {
//     chrome.tabs.query({ active: false, currentWindow: true }, function (tabs) {
//         if (callback) callback(tabs.length ? tabs[0].id : null);
//     });
// }