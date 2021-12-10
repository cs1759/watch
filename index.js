const { Buffer } = require('buffer');
const fs = require('fs');

const app = require('express')();
const server = require('http').createServer(app);
const io = new require('socket.io')(server);

const { getLastLine } = require('./functions');

// helps in returning the last n(numberOfLines) lines
const readLastLines = (numberOfLines) => {
    let lines = [];

    while (numberOfLines--) {
        let { line, fromPostition } = getLastLine(fd, fp);
        fp = fromPostition - 1;
        if (line.length > 0)
        lines.push(line);//lines.push(line.split('').reverse().join(''));

    }

    fs.closeSync(fd);
    return lines;
}

const fileName = 'logs.txt';    // Name of the file that contains the log data
let fd = fs.openSync(fileName);
let fp = fs.statSync(fileName).size;

let lines = readLastLines(10).reverse();    // fetching the initial last 10 lines (they will update over time)



// ------------------------- This is the Express and Socket IO Part -------------------------------------


app.get('/log', (req, res) => {
    res.status(200).sendFile(__dirname + String.raw`\views\index.html`);
})


io.on('connection', (socket) => {
    console.log('user connected...');
    console.log(lines);
    io.emit('logsData', lines);
})

fs.watch(fileName, (eventType, _) => {
    if (eventType === 'change') {
/*        stat = fs.statSync(fileName);
        let fd = fs.openSync(fileName);
        console.log('fp : ' + fp);
        console.log('fd :' + fd);

        fp = stat.size - 1;
        console.log('fp  after : ' + fp);
        let { line, fromPostition } = getLastLine(fd, fp);
        console.log(line.split('').reverse().join(''));

        lines.push(line.split('').reverse().join(''));
        if (lines.length > 10)
            lines.shift();
        io.emit('logsData', line.split('').reverse().join(''));
        fs.closeSync(fd)
  */
        // Name of the file that contains the log data
        fd = fs.openSync(fileName);
        fp = fs.statSync(fileName).size;

        let lines = readLastLines(10).reverse();    // fetching the initial last 10 lines (they will update over timea
        console.log(lines);
        io.emit('appendData', lines);
        //io.emit('appendData', lines);
        
    }

});


server.listen(3030, () => {
    console.log('Server nunning at port 3030...');
});