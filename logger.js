const fs = require('fs');

const outputFilePath = (prefix) =>
  prefix + new Date().toISOString().slice(0, 10).replace(/-/g, '.') + '.log';

const log = (ip) => {
  const fileName = outputFilePath('ms_');
  fs.appendFile(fileName, ip + '\r\n', function (err) {
    if (err) throw err;
  });
};
const logError = (error) => {
  const fileName = outputFilePath('err_');
  fs.appendFile(fileName, error, function (err) {
    if (err) throw err;
  });
};

module.exports = {
  log,
  logError
};
