/**
 * Created by lenovo on 2017/8/19.
 */

const pug = require('pug');
const fs = require('fs');

let str = pug.renderFile('./view/demo.jade', {
    pretty: true
});

fs.writeFile('./build/demo.html', str, (err) => {
    if (err)
        console.log('写入失败');
    console.log('写入成功');
});

