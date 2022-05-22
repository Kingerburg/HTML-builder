const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const folder = path.join(__dirname, 'files');
const folderCopy = path.join(__dirname, 'files-copy');


fs.mkdir(folderCopy, (err) => {
    if (err) {
        stdout.write('');
    } else {
        stdout.write('Creating a folder-copy folder...\n');
    }
});

fs.readdir(folder, { withFileTypes: true }, (err, data) => {
    let arrFolder = []
    let arrFolderCopy = []
    data.forEach((files) => {
        arrFolder.push(files.name)
        fs.copyFile(`${folder}/${files.name}`, `${folderCopy}/${files.name}`, (err) => {
            if (err) {
                console.log(err);
            } else {
                stdout.write(`Copy ${files.name}\n`)
            }
        })
    })
fs.readdir(folderCopy, { withFileTypes: true }, (err, data1) => {
    data1.forEach((files) => {
        arrFolderCopy.push(files.name)
       return;
    })
let checkFile = arrFolder.filter(i=>!arrFolderCopy.includes(i)).concat(arrFolderCopy.filter(i=>!arrFolder.includes(i)));
fs.unlink(`${folderCopy}/${checkFile}`, (err) => {
    if (err) {
        stdout.write('')
    } else {
        stdout.write(`A file was deleted from the directory ${checkFile}`)
    }
})
});
});
