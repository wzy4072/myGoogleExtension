function download(url, name) {
    const aLink = document.createElement('a')
    aLink.download = name
    aLink.href = url
    aLink.dispatchEvent(new MouseEvent('click', {}))
}

function download2() {
    var form = document.createElement('form')
    form.setAttribute('method', 'GET')
    form.setAttribute('action', 'http://cloud.video.taobao.com/play/u/2663007374/p/2/e/6/t/1/50095302353.mp4')
    document.body.appendChild(form)
    form.submit()
}



'http://cloud.video.taobao.com/play/u/2663007374/p/2/e/6/t/1/50095302353.mp4'

//*[@id="detail-main-video-content"]/div/video