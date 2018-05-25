const fs = require('fs');
const ipc = require('node-ipc');

 const socketPath = '/tmp/ipc.sock';

//loop forever so you can see the pid of the cluster sever change in the logs
let price;
let nameSocket = 'Bittrex';
setInterval(

  function( ) {
    console.log('socketPath :', socketPath);
    price = Math.random()*1000 + 6000;
    ipc.connectTo(
      nameSocket,
      socketPath,
      connecting
     );
  },
  2000
);

function connecting(socket) {
  ipc.of[nameSocket].on(
    'connect',
    function() {
      ipc.of[nameSocket].emit(
        'currentDate',
        {
             message: `Bittrex BTC/USD ${price}`
             //`Bittrex BTC/USD ${Math.random()*1000 + 6000}`
        }
      );
      ipc.disconnect(nameSocket);
    }
  );
}
