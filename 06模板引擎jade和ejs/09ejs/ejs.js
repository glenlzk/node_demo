/**
 * Created by lenovo on 2017/8/20.
 */

const ejs = require('ejs');
const fs = require('fs');

 ejs.renderFile('./view/demo.ejs', {
    json: {arr: [
        {user: 'glen'},
        {user: 'selina'},
        {user: 'stanley'},
        {user: 'leo'},
    ]}
}, (err, data) => {
    if (err)
        console.log('读取失败');

     writeFile (data);
});

function writeFile (data) {
    fs.writeFile('./build/demo.html', data, (err) => {
        if (err)
            console.log('写入失败');
        console.log('写入成功');
    });
};


