/**
 * Created by lenovo on 2017/8/8.
 */

const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    let path = './www' + req.url;

    fs.readFile(path, (err, data) => { // 异步
        if (err) {
            res.write('404');
        } else {
            res.write(data);
        };

        res.end();
    });

});

server.listen(9999);