
var fs = require('fs');
var readline = require('readline');
var LineByLineReader = require('line-by-line');

var action = process.argv.slice(2)[0];
var argsone = process.argv.slice(2)[1];
var argstwo = process.argv.slice(2)[2];
var fileName = 'dictionary.txt';


if (action == "add" && argsone && argstwo) {
  console.log(action + " " + argsone + " " + argstwo);
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

  let found = false;
  var lineReader = readline.createInterface({
    input: require('fs').createReadStream(fileName)
  });

  lineReader.on('line', function (line) {
    var buf = Buffer.from(line);
    let result = buf.indexOf('key:' + argsone);
    if (result > -1) {
      console.log(line);
      found = true;

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
    var buf = Buffer.from(line);
    linenum++;

    if (buf.indexOf('key:' + argsone) > -1) {
      currentnumber = linenum;
      fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
          
          console.log(err)
        }
        var linesExceptmatched = data.split('\n').slice(currentnumber).join('\n');
        fs.writeFile(fileName, linesExceptmatched,function(err){
          if(err){
            console.log(err)
          }
        });
       
      });
     
    }
  });


}

else if (action == "clear") {

  fs.writeFile(fileName, '', function () { console.log('done') })
}
else {
  console.log("invalid  operation !");
}



