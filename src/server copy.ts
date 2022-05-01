import fs from 'fs';
import udp from 'dgram';
import logger from './logger';
import JSON5 from 'json5';
import { serverToBytes } from './utils';

const config = JSON5.parse(fs.readFileSync('./config.json5', { encoding: 'utf8', flag: 'r' }));

const PORT = process.env.PORT ? Number(process.env.PORT) : 27011;
console.log('config', config);

const RESPONSE_START = Buffer.from([0xff, 0xff, 0xff, 0xff, 0x66, 0x0a]);
const RESPONSE_END = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

process.on('uncaughtException', function (err) {
  logger.logError(err.toString());
  console.log('Caught exception: ' + err);
});

const server = udp.createSocket('udp4');

server.on('error', function (error) {
  logger.logError(error.toString());
  console.log('Error: ' + error);
});

server.on('message', function (msg, info) {
  if (msg.compare(Buffer.from([0x31]), 0, 1, 0, 1) !== 0) return;

  logger.logConn(info.address, info.port);
  console.log('Data received from client : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const serverListBytes = config.serverscs.map((s: string) => Buffer.from(serverToBytes(s)));

  const pkg = Buffer.concat([RESPONSE_START, ...serverListBytes, RESPONSE_END]);

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
  console.log('Listed servers:', config.serverscs.length);
});

server.on('close', function () {
  logger.logError('Socket is closed');
  console.log('Socket is closed !');
});

server.bind(PORT);
