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

function run() {
    getTabs()
}

var dataStor = {
    fromIP: 'https://www.jianshu.com',
    toIP: 'https://blog.csdn.net',
    fromId: null,
    toId: null
}

// 获取当前窗口 所有tab
function getTabs(callback) {
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        if (callback) callback(tabs)
        checkGoal(tabs)
    })
}
// 检测两个操作对象
function checkGoal(tabs) {
    dataStor.fromId = null
    dataStor.toId = null
    tabs.map(tab => {
        if (tab.url.indexOf(dataStor.fromIP) !== -1) { dataStor.fromId = tab.id }
        if (tab.url.indexOf(dataStor.toIP) !== -1) { dataStor.toId = tab.id }
    })
    if (!dataStor.fromId) { throwNotifi('没有打开' + dataStor.fromIP); return false }
    if (!dataStor.toId) { throwNotifi('没有打开' + dataStor.toIP) }
    callToCollect()
}

function callToCollect() {
    // alert('callToCollect' + dataStor.fromId)
    sendMessage(dataStor.fromId, { task: 'collect', })
}



var bgTasks = {
    paste: function (info) {
        throwNotifi(JSON.stringify(info))
    }
}

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    bgTasks[request.task](request.info)
});
// 给 content-script发送消息
function sendMessage(tabId, message) {
    chrome.tabs.sendMessage(tabId, message, function (response) { })
}

function throwNotifi(msg) {
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