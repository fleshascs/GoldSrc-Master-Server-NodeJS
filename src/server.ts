import udp from 'dgram';
import logger from './logger';
import { serverListManager } from './serverListManager';

const serverList = serverListManager();

const PORT = process.env.PORT ? Number(process.env.PORT) : 27011;

process.on('uncaughtException', function (err) {
  logger.logError(err.toString());
  console.log('Caught exception: ' + err);
});

const server = udp.createSocket('udp4');

server.on('error', function (error) {
  logger.logError(error.toString());
  console.log('Error: ' + error);
});

server.on('message', async function (msg, info) {
  if (msg.compare(Buffer.from([0x31]), 0, 1, 0, 1) !== 0) return;

  logger.logConn(info.address, info.port);
  console.log('Data received from client : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);

  const pkg = await serverList.getPackage();
  server.send(pkg, info.port, info.address, function (error) {
    if (error) {
      logger.logError(error.toString());
      console.log('error while sending:', error);
    } else {
      console.log('Master-Server server list sent to:' + info.address);
    }
  });
});

server.on('listening', function () {
  const address = server.address();
  logger.log('Server is listening at port:' + address.port);
  console.log('Server is listening at port:' + address.port);
});

server.on('close', function () {
  logger.logError('Socket is closed');
  console.log('Socket is closed !');
});

server.bind(PORT);
