/**
 * Created by lenovo on 2017/8/10.
 */

const http = require('http');
const fs = require('fs');
const urlLib = require('url');
const querystring = require('querystring');

let server = http.createServer((req, res) => {

    var url = req.url;
    var siteObj = urlLib.parse(url, true);
    var pathname = './www' + siteObj.pathname;
    // Get
    // index.html  action="http://localhost:9999" method="get"
    var Get = siteObj.query;

    // Post
    // index.html  action="http://localhost:9999" method="post"
    var str = '';
    req.on('data', (data) => {
        str += data;
    });

    req.on('end', () => {
        var post = querystring.parse(str);

        console.log(pathname, Get, post);
    });

    // read file
    // http://localhost:9999/1.html
    fs.readFile(pathname, (err, data) => {
        if (err) {
            res.write('404');
        } else {
            res.write(data);
        };
        res.end();
    });

});

server.listen(9999);