
var fs = require('fs');

var action = process.argv.slice(2)[0];
var argsone= process.argv.slice(2)[1];
var argstwo=process.argv.slice(2)[2];
var fileName='dictionary.txt';

console.log(action+argsone+argstwo)
if (action =="add" && argsone && argstwo)
  {
    console.log( action +" "+ argsone +" "+argstwo);
    var newobj= "key:"+ argsone+','+"value :"+ argstwo;
   
    fs.appendFileSync(fileName, '\r\n' + newobj, 'utf8', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
   
  

    

  }
  

else if(action=="list")
  {
    console.log("no argument nedded");
  } 
else if (action=="get" && argsone)
  {
    console.log( action +" "+ argsone );
  } 
  else if (action =="remove" &&argsone){
    console.log( action +" "+ argsone );
  }
  else if (action=="clear"){
    
    fs.writeFile(fileName, '', function(){console.log('done')})
  }
  else {
    console.log( "invalid  operation !");
  }



