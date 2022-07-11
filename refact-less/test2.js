const server = require('./run2')
const fs = require('fs');

(async function () {

    const data = await new Promise((resolve) => {
        fs.readFile(
            __dirname + '/business/list/data.js', "utf-8",
            function (err, data) {
                resolve(data);
            }
        )
    })
    const template = await new Promise((resolve) => {
        fs.readFile(
            __dirname + '/business/list/template.tpl', "utf-8",
            function (err, data) {
                resolve(data);
            }
        )
    })

    server({
        '/list': {
            data,
            template
        }
    });
})()