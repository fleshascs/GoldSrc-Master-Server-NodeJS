import fs from 'fs';
import { format } from 'date-fns';

const getDate = () => format(new Date(), 'yyyy.MM.dd');
const getDateTime = () => format(new Date(), 'yyyy-MM-dd HH:mm:ss');
const getConnectionTime = () => format(new Date(), 'HH mm ss').split(' ');

const outputFilePath = (prefix: string) => './logs/' + prefix + getDate() + '.log';

const logConn = (ip: string, port: number): void => {
  const fileName = outputFilePath('ms_');
  write(fileName, [...getConnectionTime(), ip, port, 'cs', '\r\n'].join(' '));
};
const log = (msg: string): void => {
  const prefix = `[${getDateTime()}] `;
  const fileName = outputFilePath('info_');
  write(fileName, prefix + msg + '\r\n');
};
const logError = (error: string): void => {
  const prefix = `[${getDateTime()}] `;
  const fileName = outputFilePath('err_');
  write(fileName, prefix + error + '\r\n');
};

function write(path: string, msg: string) {
  fs.appendFile(path, msg, function (err) {
    if (err) throw err;
  });
}

export default {
  log,
  logConn,
  logError
};
