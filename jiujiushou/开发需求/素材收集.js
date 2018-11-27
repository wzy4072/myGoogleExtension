// 接口文档：

var API = [
    {
        // 实物交易-任务大厅
        url: 'http://99shou.cn/tasks/task/info/taskInfo?page=1&limit=10&classificationId=&platformId=&tasktypeId=',
        method: "GET",
        response: {
            "code": 0,
            "msg": "成功",
            "count": 2,
            "data": [
                {
                    "id": 6072,
                    "userId": 11,
                    "classificationId": "350f2c669f5b4d2cb0ddfd51f39757e1",
                    "classificationName": "珠宝",
                    "platformId": "2d77b7244ae140dc96b27f19686503d7",
                    "platformName": "京东",
                    "name": "佣金61元,拼多多黄金金条20g付款5299结算5360,直下或转寄,不承担运费",
                    "amount": 0,
                    "commission": "",
                    "total": 500,
                    "completeNum": 140,
                    "distributionType": false,
                    "releaseTime": "2018-11-13 11:08:57",
                    "endTime": "2018-11-30 00:00:00",
                    "validMinutes": 120,
                    "status": 3,
                    "realAddress": "真实地址：福建省莆田市荔城区天通泰5号楼，陈珠宝收，13249466666（转寄或通知快递派送员送这个地址）",
                    "userLogin": "18624322499",
                    "receiveNum": 145,
                    "checksuccessNum": 2,
                    "receiveType": false,
                    "updVersion": "02f218ddf1bf42619b9319bf6147ec1f",
                    "limitReceiveNum": 0,
                    "showSchemeDescribe": false,
                    "storeName": "拼多多国美/金大生/梦金园/鑫万福/壹仟两5299",
                    "planInfoId": 88,
                    "sort": 0
                }
            ]
        }
    },
    {
        // 实物交易 我的任务
        url: 'http://99shou.cn/tasks/task/order/taskInfo?page=1&limit=10',
        method: 'GET',
        response: { "code": 0, "msg": "成功", "count": 0, "data": [] }
    }
]