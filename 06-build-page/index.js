const fs = require('fs');
const path = require('path');

let srcAssets = path.join(__dirname, 'assets');
let srcStyle = path.join(__dirname, 'styles');
let srcComponents = path.join(__dirname, 'components');
let srcTemplate = path.join(__dirname, 'template.html');

const dist = path.join(__dirname, 'project-dist');

async function build() {
    try {
        srcTemplate = await fs.promises.readFile(srcTemplate, 'utf-8');
        let file = await fs.promises.readdir(srcComponents, { withFileTypes: true });
        for (const files of file) {
            let tags = `{{${files.name.split('.')[0]}}}`;
            let data = await fs.promises.readFile(srcComponents + `/${files.name}`, 'utf-8');
            srcTemplate = srcTemplate.replace(tags, data);
        }
        await fs.promises.mkdir(dist, { recursive: true });
        await fs.promises.writeFile(dist + '/index.html', srcTemplate);
        fs.readdir(srcStyle, { withFileTypes: true }, (err, files) => {
            files.forEach((item) => {
               let styleFile = path.extname(`${srcStyle}/${item.name}`)
                if (styleFile == '.css') {
                    fs.readFile(`${srcStyle}/${item.name}`, (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                        fs.appendFile(`${dist}/bundle.dist.css`, data.toString(), (err) => {
                            if (err) {
                                console.log(err);
                            }
                            fs.copyFile(`${dist}/bundle.dist.css`, `${dist}/style.css`, () => {
                                fs.unlink(`${dist}/bundle.dist.css`, () => {console.log();});
                            })
                        })
                    })
                }
            })
        });
        fs.readdir(srcAssets, { encoding: 'utf-8', withFileTypes: true }, (err, files) => {
            fs.mkdir(`${dist}/assets`, (err) => {return})
            files.forEach((item) => {
                fs.mkdir(`${dist}/assets/${item.name}`, { recursive: true }, (err, path) => {
                    if (err) {
                        console.log(err);
                    }
                })
                fs.readdir(`${srcAssets}/${item.name}`, { withFileTypes: true }, (err, data) => {
                    data.forEach((file) => {
                        fs.copyFile(`${srcAssets}/${item.name}/${file.name}`, `${dist}/assets/${item.name}/${file.name}`, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                    })
                })
            })
        })
    }catch (err) {
        console.log(err);
    }
}

build();