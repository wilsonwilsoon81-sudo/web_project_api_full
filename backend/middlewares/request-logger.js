const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '..', 'request.log');

module.exports = (req, res, next) => {
  const { method, url, body, headers, query } = req;
  const timestamp = new Date().toISOString();

  const logData = {
    timestamp,
    method,
    url,
    query,
    body,
    headers: {
      'user-agent': headers['user-agent'],
      authorization: headers.authorization ? 'Bearer [TOKEN]' : undefined,
    },
  };

  const logString = `${JSON.stringify(logData)}\n`;

  fs.appendFile(logFilePath, logString, (err) => {
    if (err) {
      console.error('Error al escribir en request.log:', err);
    }
  });

  next();
};
