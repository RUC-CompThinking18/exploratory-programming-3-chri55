// https://stackoverflow.com/questions/6831918/node-js-read-a-text-file-into-an-array-each-line-an-item-in-the-array
// https://www.codexpedia.com/javascript/node-js-read-from-file-line-by-line/


const fs = require('fs');
const readline = require('readline');
// regex can be an object, note we have to start it with '/' like in python.
const regex = /[\w]*at\b/gm;
const output = new (require('stream'))();

function main(){
    var final = [];
    var input = fs.createReadStream('book.txt');
    var rl = readline.createInterface(input, output);

    rl.on('line', function(line){
        var match = line.match(regex);

        // we make filter null if match is null, otherwise it filters out words < 3 chars.
        var filter = (match ? match.filter(word => word.length > 3) : null);
        if (filter && filter.length > 0) final.push(filter);

    });
    rl.on('close', function(line) {

        /*
        Javascript will not properly return the 'final' array by simply placing
        return final; after
        rl.on('line');
        It will run through and immediately execute everything in the function once,
        and THEN run the rl.on function.
        This will result in final as an empty array unless we handle the return
        with rl.on('close'); so that we know we have read all the data.
        */

        console.log("Done reading file. Words ending in 'at' and > 3 chars:\n");
        // note: final is too big to print all matches in the list using node in terminal
        console.log(final);
    });
}

main();
