const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, {withFileTypes: true}, (err, dirEntry) => {
    if (!err) {
        dirEntry.forEach((dirEntryList) => {
            let fileName = path.basename(dirEntryList.name, path.extname(dirEntryList.name));
            let fileExs = path.extname(dirEntryList.name).replace('.','');
             if (dirEntryList.isFile() && fileExs != undefined) {
                fs.stat(`${folder}/${dirEntryList.name}`, (err, call) => {
                    let fileByte = call.size;
                console.log(`${fileName} - ${fileExs} - ${fileByte} byte`);
                })
            }
        })
    } else {
        console.log(err);
    }
});
