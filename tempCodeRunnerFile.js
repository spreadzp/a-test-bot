const fs = require('fs');
const ipc = require('node-ipc');
const socketPath = 'localhost';

function startClient() { 

    ipc.connectTo(
        'main',
        socketPath,
        function () {
            ipc.of.main.on(
                'connect',
                function () {
                    ipc.log('## connected to world ##'.rainbow, ipc.config.delay);
                    ipc.of.main.emit(
                        'message',  //any event or message type your server listens for
                        'hello'
                    )
                }
            );
            ipc.of.main.on(
                'disconnect',
                function () {
                    ipc.log('disconnected from world'.notice);
                }
            );
            
        }
    )
    ipc.connectTo(
        'serv',
        socketPath,
        function () {
            ipc.of.serv.on(
                'connect',
                function () {
                    ipc.log('## connected to serv ##'.rainbow, ipc.config.delay);
                }
            );
            ipc.of.serv.on(
                'serv',  //any event or message type your server listens for
                function (data) {
                    console.log('data :', data);
                    ipc.log('got a message from world : '.debug, data);
                }
            );
        }
    )
}
    setInterval(() => {
        startClient()
        console.log('object :');
    }, 3000);

   //startClient()
      