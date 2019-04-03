import Mock from "mockjs"
var random = Mock.Random
var deviceData = function(){
    let list = []
    for (var i=0;i<79;i++){
        let iteam = {
            nicType: random.cname(),
            ipAddress: random.csentence(1,10),
            subnetMask: random.csentence(1,10),
            gateWay: random.csentence(1,10),
            urlAddress: random.csentence(1,10),
        }
        list.push(iteam)
    }
    return{
        list
    }
}

Mock.mock('/api/product/login','post',{'data':{'success':true}})

Mock.mock('/api/product/device/manage','get',{
    'deviceStatus':{
        "storageStatus": "20%",
        "cpuUsage": "30%",
        "memUsage": "80%",
        "ioUsage": "100%",
    },
    'deviceInfo':deviceData})

Mock.mock('/upload','post',{
        "name": random.cname(),
        "type": random.csentence(1,10),
        "address|1-100": 100,
        "describe": random.csentence(1,10),
        "port|+1": '100',
        "dataDirectory": random.csentence(1,10),
        "createTime": random.date('yyyy-MM-dd'),
        "startTime": random.date('yyyy-MM-dd'),
        "status": '停止',
        "startStop": ''
})

Mock.mock('/data2','post',{
    "list2|6":[{
        "name": random.cname(),
        "storage|1-100": 100,
        "allStorage": random.csentence(1,10),
        "proportion": random.date('yyyy-MM-dd'),
        "startTime": random.date('yyyy-MM-dd'),

    }]
})

Mock.mock('/data3','post',{
        // "name": "A&B",
        // "storage|1-100": 100,
        "allStorage": random.csentence(1,10),
        // "proportion": random.date('yyyy-MM-dd'),
        "startTime": random.date('yyyy-MM-dd'),

})

Mock.mock('/device2','get',{
        "storageStatus": "20%",
        "cpu": "30%",
        "memory": "80%",
        "io": "100%",
})
