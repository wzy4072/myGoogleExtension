chrome.storage.local.get('runHz', function (result) {
    localBase = Object.assign(result)
    console.log(JSON.stringify(localBase))
    showMessage({ title: '初始化情况', message: '本地数据 获取完毕' + JSON.stringify(localBase) })
});

function showMessage(p) {
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: '../images/icon.png',
        title: p.title || '',
        message: p.message || ''
    });
}



// 运行
function backgroundRun() {

    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: '../images/icon.png',
        title: '2',
        message: '3'
    });
}