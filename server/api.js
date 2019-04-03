var express = require('express');
var app = express();

//导入数据库组件
var connection = require('./db.js');

connection.connect();

//存放添加sql语句的数据
var obj = {
    code: 0,
    list: []
};

var addData = [];

var sql = require('./sql.js');

/*connection.query(putSql,function(err,result){
    if(err){
        console.log(err.message);
        return;
    }
    console.log('--------------------------put set----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
});*/

//客户端get请求接口
app.get('/api/getList.json',function(req,res){
    //连接数据库进行查询
    function select(callback){         //回调函数，处理连接数据库的返回函数是异步执行问题，推荐用promise
    connection.query(sql.queryAll,function(err,result){
    if(err){
        console.log(err.message);
        return;
    };
    for (var i=0;i<result.length;i++){
        // var dbData=result[i];
        // console.log('dbData:'+dbData.id);
        obj.list.push(result[i]);
        // console.log(obj)
    };
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
    callback(obj)
    });
    };
    select(function(obj){
        res.send(obj);
    })
    obj.list=[]
    //返回给前端的json对象
/*    res.send(obj);
    console.log(obj);
    obj.list=[];*/
});

//客户端post请求接口
app.post('/api/postlist.json',function(req,res){
    addData.push(req.body.id);
    addData.push(req.body.name);
    addData.push(req.body.age);

    function add_user(callback){
    connection.query(sql.insert,addData,function(err,result){
    if(err){
        console.log(err.message);
        return;
    }
    console.log('--------------------------insert into----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
    callback(addData);
    });
    }
    //返回的json对象
    add_user(function(addData){
        res.send(addData);
    });

    addData=[];     //不能写在add_user函数里面，会导致addData数组不会清空
});

//排序get请求,按age排序
app.get('/get_sort_List.json',function(req,res){
    function sort_age(callback){
    connection.query(sql.sort,function(err,result){
    if(err){
        console.log(err.message);
        return;
    }
    for (var i=0;i<result.length;i++){
        obj.list.push(result[i]);
    }
    console.log('--------------------------sort:order by----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
    callback(obj);
    });
    }
    //返回的json对象
    sort_age(function(obj){
        res.send(obj);
    });
    obj.list=[]
});

module.exports = app;