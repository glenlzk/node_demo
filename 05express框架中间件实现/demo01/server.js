/**
 * Created by lenovo on 2017/8/14.
 */

const express = require('express');
const fs = require('fs');
const urlLib = require('url');
const querystring = require('querystring');


const server = express();
server.listen('8181');
// mock
const userData = {'glen': '123456'};


server.use(function (req, res, next) {
    var str = "";
    req.on('data', function (data) {
        str += data;
    });
    req.on('end', function () {
        req.body = querystring.parse(str);
        next();
    });
});

server.use('/login', function (req, res) {
    let {user, pass} = req.body;
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


