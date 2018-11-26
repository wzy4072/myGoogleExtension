// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

// 这2个获取当前选项卡id的方法大部分时候效果都一致，只有少部分时候会不一样
function getCurrentTabId2() {
    chrome.windows.getCurrent(function (currentWindow) {
        chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (tabs) {
            if (callback) callback(tabs.length ? tabs[0].id : null);
        });
    });
}

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback) {
    getCurrentTabId((tabId) => {
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response);
        });
    });
}


var vue = new Vue({
    el: '#app',
    data: {
        searchList: ['条件A']
    },
    methods: {
        start() {
            sendMessageToContentScript({ start: true, message: '启动运行'}, (response) => { });
        },
        stop() {
            sendMessageToContentScript({ start: false, message: '停止运行'}, (response) => { });
        },
        save() {
            chrome.storage.local.set({ 'baselimt': this.searchList })
        },
        show() {
            chrome.storage.local.get('baselimt', function (result) {
                alert(JSON.stringify(result.baselimt))
            })
        },
        minus(index) {
            this.searchList.splice(index,1)
        },
        add () {
            this.searchList.push('')
        }
    }
})




