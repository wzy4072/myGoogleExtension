var btnRun = document.getElementById('run')
btnRun.onclick = function () {
    var bg = chrome.extension.getBackgroundPage();
    bg.run()
}