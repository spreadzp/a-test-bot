const fs = require('fs');
const ipc=require('node-ipc');
const cpuCount = require('os').cpus().length;
const cluster = require('cluster');
const socketPath = 'localhost';
const http = require('http');  

let price;
ipc.config.unlink = false;

let compareExchanged = {}

if (cluster.isMaster) {
   if (fs.existsSync(socketPath)) {
       fs.unlinkSync(socketPath);
   }

   for (let i = 0; i < cpuCount; i++) {
       cluster.fork();
   }
} else {
   ipc.serve(
     socketPath,
     function() {
       ipc.server.on(
         'currentDate',
         function(data,socket) {
           let tmp = {};
          //price = data;
            let arr = data.message.split(',');
            compareExchanged[arr[0]] = arr[2];
            //console.log(JSON.stringify(compareExchanged));
             console.dir(compareExchanged);
           //console.log(`pid ${process.pid} got: `, data);
           let basePrice = parseFloat(compareExchanged[arr[0]]);
           for(var index in compareExchanged) { 
            var attr = parseFloat(compareExchanged[index]); 
            price = attr;
             tmp[index] = ((attr/basePrice - 1) * 100).toFixed(2).toString() + '%';
           }
           console.dir(tmp);
           /* ipc.server.emit(
            socket,
            'main',
            {
              price: "price"
            }
        ); */
           //ipc.server.emit(socket, price)
         }
       );
       ipc.server.on(
        'main',
        function(data,socket){
            ipc.log('got a message : '.debug, data);
            ipc.server.emit(
                socket,
                'serv',  //this can be anything you want so long as
                            //your client knows.
                data+' world!'
            );
        }
    );
     }
  );

  ipc.server.start();
  //console.log(`pid ${process.pid} listening on ${socketPath}`);
}
/* var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(`<!DOCTYPE html>`);
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Hello World Page</title>");
  response.write("</head>");
  response.write("<body>");
  response.write(`${price}`);
  response.write("</body>");
  response.write("</html>");
  response.end();
});
server.listen(9999);
console.log("Server is listening"); */
function getPrice() {

  return price;
} 
exports.getPrice = getPrice();