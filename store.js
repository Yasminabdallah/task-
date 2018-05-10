
var fs = require('fs');

var action = process.argv.slice(2)[0];
var argsone= process.argv.slice(2)[1];
var argstwo=process.argv.slice(2)[2];


if (action =="add")
  {
    console.log( action +" "+ argsone +" "+argstwo);
    fs.appendFile('dictionary.txt', 'Hello content!', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }
else if(action=="list")
  {
    console.log("no argument nedded");
  } 
else if (action=="get")
  {
    console.log( action +" "+ argsone );
  } 
  else if (action =="remove"){
    console.log( action +" "+ argsone );
  }
  else if (action=="clear"){
    console.log( "clear statment");
  }
  else {
    console.log( "invalid ");
  }



