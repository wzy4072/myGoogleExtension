// 和 contentScript 通信
function sendMessageToContentScript(message, callback) {
    getCurrentTabId((tabId) => {
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response);
        });
    });
}
// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

function switchShow(d) {
    if (d.css('height') == '0px') {
        d.css('padding', '6px 20px')
        d.css('height', '22px')
    } else {
        d.css('height', '0px')
        d.css('padding', '0px')
    }
}

$(function () {
    // 开始服务
    $('#start').click((e) => {
        var bg = chrome.extension.getBackgroundPage();

        bg.backgroundRun()

        // sendMessageToContentScript({ start: true, message: '请求启动运行' }, (response) => {
        //     chrome.notifications.create(null, {
        //         type: 'basic',
        //         iconUrl: '../images/icon.png',
        //         title: '2',
        //         message: '3'
        //     });
        // });
    })
    // 停止服务
    $('#stop').click(() => {
        sendMessageToContentScript({ start: false, message: '请求停止运行' }, function (response) {
        })
    })

    // 打开 隐藏 设置
    $('.normalset-btn').click(() => {
        var d = $('.normalset')
        switchShow(d)
    })
    //打开 隐藏 高级设置
    $('.setup-btn').click(() => {
        var d = $('.setup')
        switchShow(d)
    })
    // 存储值
    $('.updata-hz').click(() => {
        let runHz = $('input.hz').val()
        chrome.storage.local.set({ 'runHz': runHz });
    })

    // $('.test1').click(() => {
    //     let channels = 13
    //     chrome.storage.local.get('channels', function (result) {
    //         alert(JSON.stringify(result))
    //     });
    // })
    // $('.test2').click(() => {
    //     chrome.storage.local.get('channels', function (result) {
    //     alert(result)

    //     });
    // })
})

