
const express = require('express');
const fs = require('fs');
const urlLib = require('url');
const multer = require('multer');
const path = require('path');

let server = express();

server.listen(8181);

// 注册中间件
server.use(multer({dest: './www/upload'}).any());


// 这个必须放在之前，下面的路劲才能访问到: http://localhost:8181/upload.html
// 相当于在server.use里使用：var newPath = './www' + oUrl.pathname;
server.use(express.static('./www'));

// upload的请求，响应
server.use('/upload',function (req, res) {
    // 获取上传文件对象
    let fileList = req.files;
    // 重新命名文件名
    let newName = fileList[0].path + path.parse(fileList[0].originalname).ext;
    console.log(newName, req.files);

    // 重命名文件
    fs.rename(fileList[0].path, newName, function (err, data) {
        if (err) {
            res.write('上传失败');
        } else {
            res.write('上传成功');
        }
        res.end();
    });
});

// 所有文件请求，响应，
// 例如：http://localhost:8181/upload  如果放在前面则会返回404且 res.end();
// server.use('/upload', function () {})如果放在后面则无法执行
// 所以，此文件相应必须放最后面
server.use(function (req, res) {
    let oUrl = urlLib.parse(req.url, true);
    // 不加返回，如果请求得到对应静态文件，则会成功返回；如果请求不到对应文件，
    // 则浏览器会一直转圈处于请求状态之中，所以，不管请求成功与否，建议都要给返回值
    fs.readFile(oUrl.pathname, function (err, data) {
        if (err) {
            res.write('404');
        } else {
            res.write(data);
        };
        res.end();
    });
});


var url = "http://localhost:8080/upload/CAM00084.jpg"

console.log(path.parse(url));




