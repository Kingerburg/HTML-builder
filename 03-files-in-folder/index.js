const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, {withFileTypes: true}, (err, dirEntry) => {
    if (!err) {
        dirEntry.forEach((dirEntryList) => {
             if (dirEntryList.isFile()) {
                let fileName = dirEntryList.name.split('.')[0];
                let fileExs = dirEntryList.name.split('.')[1];
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
