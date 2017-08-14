/**
 * Created by lenovo on 2017/8/14.
 */

const express = require('express');
const expressStatic = require('express-static');

let server = express();

var options = {}

server.use(express.static('./www'));

server.listen(8080);

