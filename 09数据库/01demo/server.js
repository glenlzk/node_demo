

const mysql = require('mysql');

// 1.链接数据库
var db = mysql.createConnection({
    host: 'localhost',
    post: '3306',
    user: 'root',
    password: '123456',         // 字符串
    database: 'pms'             // 必须
});

// console.log(db);

// 2.查询数据库
db.query('SELECT * FROM `user_table`', (err, data) => {
    if (err) {
        console.log('查询出错: ' + err);
    } else {
        console.log(JSON.stringify(data));
    };
});


