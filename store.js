
var fs = require('fs');
var readline = require('readline');
var LineByLineReader = require('line-by-line');

var action = process.argv.slice(2)[0];
var argsone= process.argv.slice(2)[1];
var argstwo=process.argv.slice(2)[2];
var fileName='dictionary.txt';

if (action =="add" && argsone && argstwo)
  {
    console.log( action +" "+ argsone +" "+argstwo);
    var newobj= "key:"+ argsone+','+"value:"+ argstwo;
   
    fs.appendFileSync(fileName, '\r\n' + newobj, 'utf8', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });  

  }
  

else if(action=="list")
  {
    fs.readFile(fileName, function(err, items) {
      if (err) throw err;
     
        console.log("dictionary contents: " + items);
         
  });

  } 
 else if (action=="get" && argsone){

  var found =false;
  var lineReader = readline.createInterface({
    input: require('fs').createReadStream(fileName)
  });
  
  lineReader.on('line', function (line) {
    var buf = Buffer.from(line);
    
    if (buf.indexOf('key:'+argsone)>-1){
      console.log(line);
      found=true;
    }
    
     
    
    
  });
  if (!found){
    console.log("key not found");
  }


 
    
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



