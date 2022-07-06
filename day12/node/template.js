const fs = require('fs');
const vm = require('vm');
const path = require('path')

const templateContext = vm.createContext({});

function createTemplate(templatePath) {
    return vm.runInContext(
        `(function render() {
            return function (data) {
                with (data) {
                    return \`${fs.readFileSync(templatePath, 'utf-8')}\`
                }
            }
        })`,
        templateContext
    )(function (relativePath, data) {
        return createTemplate()(data);
    });
}

module.exports = createTemplate