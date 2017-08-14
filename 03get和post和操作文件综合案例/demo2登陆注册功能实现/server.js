/**
 * Created by lenovo on 2017/8/10.
 */

const http = require('http');
const fs = require('fs');
const urlLib = require('url');
const querystring = require('querystring');

var obj = {};       //注意： 不能放在server里面，每次请求进来，都会重新执行一遍server
let server = http.createServer((req, res) => {

    let str = '';
    let url = urlLib.parse(req.url, true);
    // {glen: 1234, selina: 24342};

    // console.log(url);

    req.on('data', (data) => {
        str += data;
    });

    req.on('end', () => {
        var Get = url.query;
        var Post = querystring.parse(str);

        if (url.pathname == '/user') {
            switch(Post.act) {
                case 'login':
                    // 查找用户
                    if (obj[Post.user]) {
                        // 校对密码
                        if (obj[Post.user] == Post.pass) {
                            res.write('{"ok": true, "msg":"登陆成功"}');
                        } else {
                            res.write('{"ok": false, "msg":"用户名或密码不正确"}');
                        };
                    } else {
                        res.write('{"ok": false, "msg":"此用户不存在"}');
                    };
                    break;
                case 'reg':
                    // 查找用户是否存在
                    // console.log(obj[Post.user]);
                    if (obj[Post.user]) {
                        res.write('{"ok": false, "msg":"此用户已注册"}');
                    } else {
                        obj[Post.user] = Post.pass;
                        console.log('注册成功:', obj);
                        res.write('{"ok": true, "msg":"注册成功"}');
                    };
                    break;
                default:
                    res.write('{"ok": false, "msg":"请求出错"}');
                    break;
            };
             res.end();
        } else {
            let path = './www' + url.pathname;
            fs.readFile(path, (err, data) => {
                if (err) {
                    res.write('404');
                } else {
                    res.write(data);
                };
                res.end();
            });
        };

    });


});

server.listen(8181);