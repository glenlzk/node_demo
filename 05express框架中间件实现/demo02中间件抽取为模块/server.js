/**
 * Created by lenovo on 2017/8/14.
 */

const express = require('express');
const fs = require('fs');
const urlLib = require('url');
const myBodyParser = require('./libs/my-body-parser');


const server = express();
server.listen('8181');
// mock
const userData = {'glen': '123456'};

// 中间件
server.use(myBodyParser);

server.use('/login', function (req, res) {
    // 使用中间件定义的参数req.body
    let {user, pass} = req.body;
    // 中文乱码
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
    // 检查用户名
    if (userData[user]) {
        if (userData[user] == pass) {
            res.write('{ok:true, msg:"登陆成功"}');
        } else {
            res.write('{ok:false, msg:"账号或密码错误"}');
        };
    } else {
        res.write('{ok:false, msg:"账号不存在"}');
    };
    res.end();
});

server.use(function (req, res, next) {
    let oUrl = urlLib.parse(req.url, true);

    fs.readFile('./www' + oUrl.pathname, (err, data) => {
       if (err) {
           res.write('404');
       } else {
           res.write(data);
       };
       res.end();
    });
});


