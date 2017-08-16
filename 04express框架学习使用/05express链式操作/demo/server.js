/**
 * Created by lenovo on 2017/8/14.
 */
 const express = require('express');
 const bodyParser = require('body-parser');

 let server = express();

 server.listen(8181);

 //非链式操作
  /*
    server.use('/a.html', function (req, res, next) {
        console.log('a');
        next();
    });

    server.use('/b.html', function (req, res, next) {
        console.log('b');
    });
 */

// 链式操作
 server.use('/', function (req, res, next) {
     console.log('a');
     next();
 });

 server.use('/', function (req, res, next) {
     console.log('b');
 });