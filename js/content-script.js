// console.log('this is content-script')

// 桌面消息通知
// chrome.notifications.create(null, {
//     type: 'image',
//     iconUrl: 'img/icon.png',
//     title: '祝福',
//     message: '骚年，祝你圣诞快乐！Merry christmas!',
//     imageUrl: 'img/sds.png'
// });


chrome.storage.sync.set({color: color, showImage: showImage}, function() {
    // 注意新版的options页面alert不生效！
    // alert('保存成功！');
    document.getElementById('status').textContent = '保存成功！';
    setTimeout(() => {document.getElementById('status').textContent = '';}, 800);
});






// var rl_Global = {
//     intervalIndex: 0,
//     runNumber: 0
// }

// // 获取普通设置
// function getOptions() {
//     // 频率 5秒钟一次
//     return { frequency: 5000, totle: 0, }
// }
// // 获取高级设置
// function getAdvancedSetup() {
//     return [
//         {
//             stepNo: '1',
//             stepName: '查询任务列表', 
//             method: 'get', 
//             url: 'http://99shou.cn/tasks/task/info/taskInfo?page=1&limit=10&classificationId=&platformId=&tasktypeId=', 
//             data:null,
//             cb: function (res) {
//                 console.log(res)
//                 return true
//             }
//         },
//     ]

// }
// let options = getOptions()
// let advanceOptions = getAdvancedSetup()
// // 初始化运行队列
// function initSteps() {
//     let promises = []
//     advanceOptions.map(item => {
//         let p = () => {
//             return new Promise((resolve, reject) => {
//                 $.ajax({
//                     url: item.url,
//                     type: item.method,
//                     data: JSON.stringify(item.data),
//                     xhrFields:{withCredentials: true},
//                     beforeSend: function (request) {
//                         request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//                         request.setRequestHeader("Host", window.location.host);
//                         request.setRequestHeader("Referer", window.location.href);
//                     },
//                     success: function (res) {
//                         if (item.cb) {
//                             if (item.cb(res)) {
//                                 resolve(res)
//                             } else {
//                                 reject({ error: 'callback方法返回false' })
//                             }
//                         } else {
//                             resolve(res)
//                         }
//                     }
//                 })
//             })
//         }
//         promises.push(p)
//     })
//     return promises
// }

// // 队列运行方法
// function runPromise(pros, idx = 0) {
//     if (!pros || !pros.length) { return false }
//     let pro = pros[idx]
//     pro().then(res => {
//         if (res.id) {
//             idx++
//             if (idx === pros.length) {
//                 rl_Global.runNumber++
//                 console.log(rl_Global.runNumber, '执行完毕！')
//                 return false
//             }
//             runPromise(pros, idx)
//         }
//     })
// }

// // 启动运行
// function runExtension() {
//     console.log('启动运行')
//     let promises = initSteps()
//     rl_Global.intervalIndex = setInterval(function () {
//         runPromise(promises)
//     }, options.frequency)
// }

// // 停止运行
// function stopExtension() {
//     clearInterval(rl_Global.intervalIndex)
// }

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.start) {
//         runExtension()
//     } else {
//         stopExtension()
//     }
//     console.log('收到请求', request.message);
//     sendResponse('content-secript 收到请求');
// });