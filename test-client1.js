const fs = require('fs');
const ipc = require('node-ipc');

 const socketPath = 'localhost';

//loop forever so you can see the pid of the cluster sever change in the logs
setInterval(
  function( ) {
    ipc.connectTo(
      'world',
      socketPath,
      connecting
     );
  },
  2000
);

function connecting(socket) {
  ipc.of.world.on(
    'connect',
    function() {
      ipc.of.world.emit(
        'currentDate',
        {
             message: `Oix BTC/USD ${Math.random()*1000 + 6000}`
        }
      );
      ipc.disconnect('world');
    }
  );
}
