/**
 * Created by lenovo on 2017/8/19.
 */

const pug = require('pug');
const fs = require('fs');


let str = pug.renderFile('./view/demo.jade', {
    pretty: true
});
// 文件夹build必须存在，否则会写入失败
fs.writeFile('./build/output.html', str, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('写入成功');
    };
});