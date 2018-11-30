var tipCount = 0;

// 简单的消息通知
function tip(info) {
    info = info || '';
    var ele = document.createElement('div');
    ele.className = 'chrome-plugin-simple-tip slideInLeft';
    ele.style.top = tipCount * 70 + 20 + 'px';
    ele.innerHTML = `<div>${info}</div>`;
    document.body.appendChild(ele);
    ele.classList.add('animated');
    tipCount++;
    setTimeout(() => {
        ele.style.top = '-100px';
        setTimeout(() => {
            ele.remove();
            tipCount--;
        }, 400);
    }, 5000);
}

var searchList = []
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.start) {
        chrome.storage.local.get('baselimt', function (result) {
            if (isRunning) {
                stopExtension()
            }
            searchList = result.baselimt
            tip('筛选条件：' + JSON.stringify(result.baselimt))
            runExtension()
        })
    } else {
        stopExtension()
    }
});

var intervalIndex = 0
var resquestCount = 0
var isRunning = false

// 启动运行
function runExtension() {
    isRunning = true
    intervalIndex = setInterval(function () {
        $.ajax({
            url: 'http://99task.club/tasks/task/taskhall',
            type: 'GET',
            data: null,
            xhrFields: { withCredentials: true },
            success: function (res) {
                checkRes(res)
                resquestCount++
                console.log('请求次数统计：', resquestCount)
            }
        })

    }, 5000)
}

function checkRes(res) {
    if (searchList.length !== 0) {
        let haveAll = true
        searchList.map(item => {
            if (res.indexOf(item) === -1) {
                haveAll = false
            }
        })
        if (haveAll) {
            chrome.runtime.sendMessage({ message: '有单啦！' }, function (response) { });
        }
    } else {
        console.log('没有限制条件！ 无意义')
    }
}
// 停止运行
function stopExtension() {
    clearInterval(intervalIndex)
}