/**
 * Created by lenovo on 2017/8/14.
 */

const express = require('express');

var server = express();
var user = {
    'glen': '123456',
    'selina': '654321',
    'stanley': '987987'
};
server.use(express.static('./www'));

server.get('/login', function (req, res) {
    var data = req.query;
    if (user[data.user] == undefined) {
        res.send({ok: false, msg: '该用户不存在'});
    } else {
        if (user[data.user] != data.pass) {
            res.send({ok: false, msg: '密码不正确'});
        } else {
            res.send({ok: true, msg: '登陆成功'});
        };
    };
    res.end();
});

/*

    server.post('/register', function (req, res) {

    });


    server.use('/', function (req, res) {

    });
*/

server.listen(8081);

