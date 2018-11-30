var btnRun = document.getElementById('run')
var pasteSkuBtn = document.getElementById('paste-sku')

btnRun.onclick = function () {
    var bg = chrome.extension.getBackgroundPage();
    bg.run()
}
pasteSkuBtn.onclick = function () {
    var bg = chrome.extension.getBackgroundPage();
    bg.pasteSku()
}