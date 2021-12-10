const { Buffer } = require('buffer');
const fs = require('fs');

// This function helps in retreiving last character from the 'fromPosition'
const getPreviousCharacter = (fd, fromPostition) => {
    let buffer = Buffer.alloc(1);
    fs.readSync(fd, buffer, 0, 1, fromPostition - 1);

    return buffer.toString();

}

// Using the getPreviousCharacter function returns the last line in the file with the postition of the starting of the last line
const getLastLine = (fd, fromPostition) => {
    let line = '';
    while (fromPostition > 0) {
        let char = getPreviousCharacter(fd, fromPostition);
        if (char == '\n')
            return { line, fromPostition };
        //line += char;
            line=char+line;
        fromPostition--;
    }
    return { line, fromPostition };

}



module.exports = {
    getLastLine
}