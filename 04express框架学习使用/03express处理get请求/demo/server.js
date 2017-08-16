/**
 * Created by lenovo on 2017/8/14.
 */
 const express = require('express');
 const bodyParser = require('body-parser');
 const fs = require('fs');
 const urlLib = require('url');

 let server = express();

 server.listen(8181);

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

    // method: 'get'
    console.log(req.query);
});