/**
 * Created by lenovo on 2017/8/14.
 */
 const express = require('express');
 const bodyParser = require('body-parser');
 const fs = require('fs');
 const urlLib = require('url');

 let server = express();

 server.listen(8181);

// github:https://github.com/expressjs/body-parser
// method: 'post'
let postData = bodyParser.urlencoded({
    extended: false,         // 是否可扩展
    limit: 100*1024          // 限制最大的上传大小 Defaults to '100kb'
});

server.use(postData);       // 先注册使用中间件，才会有以下: req.body

server.use('/', function (req, res) {

    // readFile
    let oUrl = urlLib.parse(req.url, true);
    let path = './www' + oUrl.pathname;

    fs.readFile(path, function (err, data) {
        if (err) {
            res.write('404');
        } else {
            res.write(data);
        };
        res.end();
    });

    // POST
    console.log(req.body);
});

