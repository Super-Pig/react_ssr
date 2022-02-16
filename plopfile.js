const fs = require('fs')
const path = require('path')

const genComponentActions = () => {
    const actions = []
    const templateDir = 'plop-templates'

    const next = filename => {
        const stat = fs.statSync(filename)

        if (stat.isDirectory()) {
            fs.readdirSync(filename).forEach(file => next(path.join(filename, file)))
        } else {
            let newFilename = filename.replace(templateDir, '').replace('.hbs', '')

            actions.push({
                type: 'add',
                path: path.join('projects', '{{name}}', newFilename),
                templateFile: filename
            })
        }
    }

    fs.readdirSync(templateDir).forEach(file => next(path.join(templateDir, file)))

    return actions
}

module.exports = plop => {
    plop.setHelper('capitalUpper', text => `${text.charAt(0).toUpperCase()}${text.slice(1)}`)

    plop.setGenerator('create', {
        drscription: '创建项目',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'project name'
        }],
        actions: genComponentActions()
    })
}