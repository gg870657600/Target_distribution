var userSQL = {
                insert:'INSERT INTO user(id,name,age) VALUES(?,?,?)',
                queryAll:'SELECT * FROM user',
                getUserById:'SELECT * FROM user WHERE id = ? ',
                //改
				putSql: 'update user set name=?,age=? where id=? ',
				//删
				delSql: 'DELETE FROM user where id=?',
				//排序
				sort: 'select * from user order by age',
              };
 module.exports = userSQL;

