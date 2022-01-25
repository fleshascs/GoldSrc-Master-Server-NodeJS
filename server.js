var udp = require('dgram');
var servers = require('./servers');
const logger = require('./logger');

const PORT = 27011;
const RESPONSE_START = Buffer.from([0xff, 0xff, 0xff, 0xff, 0x66, 0x0a]);
const RESPONSE_END = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

const ServerToBytes = (server) => {
  const [ip, port] = server.split(':');
  return [
    ...ip.split('.').map((section) => Number(section).toString(10)),
    (port >> 8) & 0xff,
    port & 0xff
  ];
};

var server = udp.createSocket('udp4');

server.on('error', function (error) {
  logger.log(error.toString());
  console.log('Error: ' + error);
});

server.on('message', function (msg, info) {
  if (msg.compare(Buffer.from([0x31]), 0, 1, 0, 1) !== 0) return;
  logger.log(info.address);
  console.log('Data received from client : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);

  const serverListBytes = servers.map((s) => Buffer.from(ServerToBytes(s)));

  const package = Buffer.concat([RESPONSE_START, ...serverListBytes, RESPONSE_END]);

  server.send(package, info.port, info.address, function (error) {
    if (error) {
      logger.log(error.toString());
      console.log('error while sending:', error);
    } else {
      console.log('Master-Server server list sent');
    }
  });
});

//emits when socket is ready and listening for datagram msgs
server.on('listening', function () {
  var address = server.address();
  console.log('Server is listening at port:' + address.port);
});

//emits after the socket is closed using socket.close();
server.on('close', function () {
  console.log('Socket is closed !');
});

server.bind(PORT);
