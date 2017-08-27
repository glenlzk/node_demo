
const express = require('express');

var server = express();

// ------------ 目录1： /user
// 创建路由
routerUser = express.Router();
// 使用路由
server.use('/user', routerUser);

routerUser.get('/mod1', (req, res) => {
    res.send('user -------- mod1');
});

routerUser.get('/mod2', (req, res) => {
    res.send('user -------- mod2');
});

// ------------ 目录2：/article

// 创建路由
routerAticle = express.Router();
// 使用路由
server.use('/article', routerAticle);

routerAticle.get('/mod1', (req, res) => {
    res.send('article -------- mod1');
});

routerAticle.get('/mod2', (req, res) => {
    res.send('article -------- mod2');
});


server.listen(8888);



