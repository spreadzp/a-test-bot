//const fs = require('fs');
const ipc = require('node-ipc');
const socketPath = 'localhost';
const nameSocket = 'main';
let price;
//ipc.config.id = 'a-unique-process-name2';
//ipc.config.retry = 1500;
 ipc.config.silent = true; 
  function startClient( ) { 
    console.log("!!!" );
    ipc.connectTo( 
      nameSocket,
      socketPath,
      connecting
     ); 
  } 

function connecting(socket) { 
 ipc.of[nameSocket].emit(
  'currentDate',
  {
       message: `0,0,0`
  }
);   

ipc.of[nameSocket].on(
  nameSocket,
  function(data){
    price = data;
    console.log(JSON.stringify(data)); 
  } 
);  

}

setInterval(() => startClient(), 5000)
 startClient();
function startCommonServer() {
ipc.serve(
  socketPath,
  function () {
    ipc.server.on(
      'main',
      function (data, socket) {
        let tmp = {};
        
         console.log('data :', data);
        } 
    );

  }
);  

ipc.server.start(); 
//console.log(`pid ${process.pid} listening on ${socketPath}`);
}  
 

  //var http = require('http');
  var express = require('express')
  var http = require('http')
  var path = require('path')
 // var reload = require('./reload')
  var bodyParser = require('body-parser')
  var logger = require('morgan')
  
  var app = express()
  
  var publicDir = path.join(__dirname, 'public')
  
  app.set('port', process.env.PORT || 8888)
  app.use(logger('dev'))
  app.use(bodyParser.json()) // Parses json, multi-part (file), url-encoded
  
  app.get('/', function (req, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(`<!DOCTYPE html>`);
    response.write("<html>");
    response.write("<head>");
    response.write("<title>Hello World Page</title>");
    response.write("</head>");
    response.write("<body>");
    response.write(`${JSON.stringify(price)}`);
    response.write("</body>");
    response.write("</html>");
    response.end();
    //res.sendFile(path.join(publicDir, 'index.html'))
  })
  
  var server = http.createServer(app)
  
  // Reload code here
  //reload(app);
  
  server.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'))
  })

/* var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(`<!DOCTYPE html>`);
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Hello World Page</title>");
  response.write("</head>");
  response.write("<body>");
  response.write(`${JSON.stringify(price)}`);
  response.write("</body>");
  response.write("</html>");
  response.end();
});
server.listen(9998);
console.log("Server is listening");  */

 