const fs = require('fs')
const JSZip = require('jszip');
const mime = require('mime-types');
const path = require('path');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const shell = require('shelljs')

require('colors')

const argv = yargs(hideBin(process.argv)).argv
const { project } = argv
const projectDir = `./projects/${project}`

if (!project) {
    console.log('ERROR: project name not found in your command'.red)
    console.log('the commoan should be:')
    console.log('npm run package --project=xxx'.yellow)
    console.log('or')
    console.log('yarn package --project=xxx'.yellow)
    shell.exit()
}

shell.exec(`rm -rf ${projectDir}/.next`)
shell.exec(`cd ${projectDir} && npm run build`)

const zip = new JSZip();

const staticDir = `${projectDir}/.next/static`
const version = 1
const packageId = project
const remotePath = `https://cnd.xxxxx.com/${project}/_next/static`
const packageInfoFilePath = `${projectDir}/.next/offline-package.json`

const folder = zip.folder('offline-package');

const packageInfo = {
    packageId,
    version,
    items: [{
        packageId,
        version,
        remoteUrl: `https://cnd.xxxxx.com/${project}.html`,
        path: `static/index.html`,
        mimeType: mime.lookup('.html')
    }]
}

const addFile = async (filePath) => {
    const state = fs.statSync(filePath)

    if (state.isFile()) {
        const localFilePath = filePath.replace(`${projectDir}/.next/`, '')

        folder.file(localFilePath, fs.readFileSync(filePath))

        packageInfo.items.push({
            packageId,
            version,
            remoteUrl: filePath.replace(`${projectDir}/.next/static`, remotePath),
            path: localFilePath,
            mimeType: mime.lookup(path.extname(filePath))
        })
    } else {
        const files = fs.readdirSync(filePath)

        await Promise.all(files.map(file => addFile(`${filePath}/${file}`)))
    }
}

Promise.resolve().then(async () => {
    // html 文件打包
    folder.file(`static/index.html`, fs.readFileSync(`${projectDir}/.next/server/pages/index.html`))

    // static 目录打包
    await addFile(staticDir)

    // index.json 打包
    fs.writeFileSync(packageInfoFilePath, JSON.stringify(packageInfo))
    folder.file('index.json', fs.readFileSync(packageInfoFilePath))

    const zipContent = await zip.generateAsync({
        type: 'nodebuffer',
        streamFiles: true,
        compression: 'DEFLATE',
        compressionOptions: { level: 9 }
    })

    fs.writeFileSync(`${projectDir}/.next/offline-package.zip`, zipContent)

    // 把离线包文件 copy 到 packages 目录
    fs.mkdirSync(`./packages/${project}`, { recursive: true })

    shell.exec(`rm -rf packages/${project}/*`)
    shell.exec(`cp ${projectDir}/.next/offline-package.zip ./packages/${project}/`)

    console.log('\nwell done.\n'.green)
    console.log('find your package file in', `./packages/${project}/offline-package.zip`.blue)
})