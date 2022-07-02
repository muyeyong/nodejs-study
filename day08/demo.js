const fs = require('fs');
const vm = require('vm');

const templateCache = {};
 // './b.html' : { data: 渲染的数据. template: 模板, result: 渲染结果 }



// 创建模板渲染context
const templateContext = vm.createContext({
    include: function (name, data) {
        const template = templateCache[name] || createTemplate(name)
        return template(data);
    }
});

/**
 * 
 * @param {*} templatePath 模板路径
 * @returns 渲染好的html字符串
 */
function createTemplate(templatePath) {

    templateCache[templatePath] = vm.runInContext(
        `(function (data) {
            with (data) {
                return \`${fs.readFileSync(templatePath, 'utf-8')}\`
            }
        })`,
        templateContext
    );

    return templateCache[templatePath]
}


module.exports = createTemplate