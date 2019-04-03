var express = require('express');
var app = express();
var api = require('./api.js');

var bodyParser = require('body-parser');
/*www-form-urlencoded这是http的post请求默认的数据格式，需要body-parser中间件的支持（7-9行） 10行是用来解析application/json请求
app.use(bodyParser.urlencoded({
    extended:true
}));*/
app.use(bodyParser.json());

//解决跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(api);
//启动服务，监听一个端口，不要和页面的端口
app.listen(3020);

// setTimeout(function(){console.log(addData)},30000);
//addData最后是获取到前端的数据的，因为服务端的post请求是异步的，所以它在获取到前端的数据之前就执行insert操作了