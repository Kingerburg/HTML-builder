const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'styles');
const dist = path.join(__dirname, 'project-dist');

fs.readdir(src, { withFileTypes: true }, (err, files) => {
    files.forEach((item) => {
       let styleFile = path.extname(`${src}/${item.name}`)
        if (styleFile == '.css') {
            fs.readFile(`${src}/${item.name}`, (err, data) => {
                if (err) {
                    console.log(err);
                }
                fs.appendFile(`${dist}/bundle.dist.css`, data.toString(), (err) => {
                    if (err) {
                        console.log(err);
                    }
                    fs.copyFile(`${dist}/bundle.dist.css`, `${dist}/bundle.css`, () => {
                        fs.unlink(`${dist}/bundle.dist.css`, () => {console.log();});
                    })
                })
            })
        }
    })
})