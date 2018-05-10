#!/usr/bin/env node
var fs = require('fs');
var readline = require('readline');
var LineByLineReader = require('line-by-line');

var action = process.argv.slice(2)[0];
var argsone = process.argv.slice(2)[1];
var argstwo = process.argv.slice(2)[2];
var fileName = 'dictionary.txt';


if (action == "add" && argsone && argstwo) {
 
  var newobj = "key:" + argsone + ',' + "value:" + argstwo;

  fs.appendFileSync(fileName, '\r\n' + newobj, 'utf8', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

}


else if (action == "list") {
  fs.readFile(fileName, function (err, items) {
    if (err) throw err;

    console.log("dictionary contents: " + items);

  });

}
else if (action == "get" && argsone) {


  var lineReader = readline.createInterface({
    input: require('fs').createReadStream(fileName)
  });

  lineReader.on('line', function (line) {
    var buf = Buffer.from(line);
    let result = buf.indexOf('key:' + argsone );
    if (result > -1) {
      //print selected line 
      console.log(line);


    }


  });



}

else if (action == "remove" && argsone) {


  let linenum = 0;
  let currentnumber = 0;
  var lineReader = readline.createInterface({
    input: require('fs').createReadStream(fileName)
  });

  lineReader.on('line', function (line) {
    //to get line match entered key 
    var buf = Buffer.from(line);
    linenum++;

    if (buf.indexOf('key:' + argsone +',') > -1) {
      //now we have num of line we want to remove it 
      currentnumber = linenum;
      fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {

          console.log(err)
        }
        console.log(currentnumber)
        // remove selected line from data 
        var linesExceptmatched = data.split('\n').slice(currentnumber).join('\n');
        console.log(linesExceptmatched)
        //append new data in file 
        fs.writeFile(fileName, linesExceptmatched, function (err) {
          if (err) {
            console.log(err)
          }
        });

      });

    }
  });


}

else if (action == "clear") {
 // clear data by append empty data to file 
  fs.writeFile(fileName, '', function () { console.log('done') })
}
else {
  console.log("invalid  operation !");
}



