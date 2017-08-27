
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const consolidate = require('consolidate');

var server = express();

// 1.cookie
server.use(cookieParser('dfgdsdfwvrerer'));
// 2.session
let arr = [];

for (let i=0; i<10000; i++) {
    arr.push('keys_' + Math.random());
};
server.use(cookieSession({
    name: 'session_id',
    keys: arr,
    maxAge: 3600*20
}));
// 3.post数据
server.use(bodyParser.urlencoded({
    extend: false
}));
server.use(multer({dest: './www/upload'}).any());

// 4.static
server.use(express.static('./www'));

// 5.模板引擎
// 输出什么
server.set('view engine', 'html');
// 模板在哪
server.set('views', './tmpl');
// 使用哪种引擎
server.engine('html', consolidate.ejs);

server.use('/index', (req, res) => {
    res.render('index.ejs', {name: 'glen'});
    // res.render() 类似于 res.send();
    // 把编译的结果，发送给用户
});


server.listen(8888);





