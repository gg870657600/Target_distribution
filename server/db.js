var mysql = require('mysql');
// 数据库连接配置
module.exports = mysql.createConnection({

        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'test',
        port: '3306'

});

// module.exports = connection;