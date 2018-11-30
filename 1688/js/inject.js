
// 接收 content  指令
window.addEventListener("message", function (e) {
  var res = JSON.parse(JSON.stringify(e.data))
  if (res.name === 'collect') {
    // alert('inject收到:collect')
    collect()
  }
  if (res.name === 'paste') {
    // alert('inject收到:paste')
    resInfo = res.info
    pasteDetailImgs(res.info)
    console.log(JSON.stringify(res.info))
  }
  if (res.name === 'pasteSku') {
    // alert('inject收到:pasteSku')
    pasteSku()
  }

}, false);

var resInfo = {}



function collect() {
  var sendData = {
    name: 'collectResult',
    metaInfo: getMetaInfo(),
    skuInfo: iDetailData,
    mainImgs: getMainImages(),
    detailImgs: getDetailImages()
  }
  // console.log(JSON.stringify(sendData))
  window.postMessage(JSON.stringify(sendData), '*');
}

// 粘贴详情图
function pasteDetailImgs(info) {
  var imgs = info.detailImgs
  var innerHtmlArr = []
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i]) {
      innerHtmlArr.push('<img  src="' + imgs[i] + '">')
    }
  }
  var p = document.getElementById('cke_1_contents').querySelector('p')
  p.innerHTML = innerHtmlArr.join('')
  window.postMessage(JSON.stringify({ name: 'pasteResult', info: '粘贴完毕！' }), '*');


  // var remarks = document.querySelectorAll('.sku-color.sku-color-new .row input[type="text"][name="remark[]"]')
  // var colors = document.querySelectorAll('.sku-color.sku-color-new .row input[type="text"][name="text[]"]')

}
// 粘贴sku 手动粘贴
function pasteSku() {
  // resInfo
}

// 分类及参数
function getMetaInfo() {
  var description = []
  var tempDesc = document.getElementsByTagName('meta')['description'].content
  let arr = tempDesc.split('，')
  arr.map(item => {
    let objItemArr = item.split(':')
    if (objItemArr.length > 1) {
      description.push({ [objItemArr[0]]: objItemArr[1] })
    }
  })
  return description
}

// 宝贝详情
function getDetailImages() {
  var container = document.getElementById('desc-lazyload-container')
  // 去除广告
  var images = container.querySelectorAll('img:not([class*="itemImg"])')
  var srcs = []
  for (let i = 0; i < images.length; i++) {
    srcs.push(images[i].src)
  }
  for (let i = 0; i < srcs.length; i++) {
      setTimeout(function () {
          var x = new XMLHttpRequest();
          x.open("GET", srcs[i], true);
          x.responseType = 'blob';
          x.onload = function (e) { download(x.response, 'detail' + i + '.jpg', "image/jpeg"); }
          x.send();
      }, i * 300)
  }
  return srcs
}



// var checks = document.querySelectorAll('.sku-color.sku-color-new .row input[type="checkbox"]')

// 宝贝主图
function getMainImages() {
  var lis = document.getElementById('dt-tab').querySelectorAll('li')
  var srcs = []
  for (let i = 0; i < lis.length; i++) {
    let imgStrs = lis[i].getAttribute('data-imgs')
    if (imgStrs) {
      let srcStr = JSON.parse(imgStrs).original
      srcs.push(srcStr)
      setTimeout(function () {
        var x = new XMLHttpRequest();
        x.open("GET", srcStr, true);
        x.responseType = 'blob';
        x.onload = function (e) { download(x.response, 'main' + i + '.jpg', "image/jpeg"); }
        x.send();
      }, i * 300)
    }
  }
  return srcs
}

// function getVideo() {
//     var videoWrap = document.getElementById('offer_video_wrap')
//     if (videoWrap) {
//         var videos = videoWrap.getElementsByTagName('video')
//         if (videos.length > 0) {
//             setTimeout(function () {
//                 var video = videos[0]
//                 var x = new XMLHttpRequest();
//                 x.open("GET", video.src, true);
//                 x.responseType = 'blob';
//                 x.onload = function (e) { download(x.response, "video.mp4", "video/mp4"); }
//                 x.send()
//             }, 3000)
//         }
//     }
// }



// 字段
// var skuitem = {
//   "specId": "ac88d1fabec2960080fc7f1dcb1b8488",
//   "price": "0.60", // 单价
//   "saleCount": 26654350,
//   "discountPrice": "0.60", // 单价
//   "canBookCount": 625871497, // 可售 库存
//   "skuId": 4010527782226
// }

