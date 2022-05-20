const fs = require('fs');
const path = require('path');
const { stdout, stdin } = require('process');
const { createInterface } = require('readline');

const textFile = path.join(__dirname, 'text.txt');


fs.writeFile(textFile, '', err => {
    if (err) {
        console.log(err);
    } else {
        stdout.write('Hello! Write text.\n');
    }
});

const interface = createInterface({
    input: stdin,
});

const exit = () => {
    process.exit();
}

process.on('SIGINT', exit)
process.on('exit', () => stdout.write('Goodbye!'))

interface.on('line', message => {
    fs.appendFile(textFile, message + '\n', err => {
        if ('exit' == message) {
            interface.close();
        } else if (err) {
            console.log(err);
        }
    })
})

