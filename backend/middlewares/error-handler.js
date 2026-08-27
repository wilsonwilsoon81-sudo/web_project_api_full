const fs = require('fs');
const path = require('path');
const { ValidationError } = require('celebrate');

const errorLogPath = path.join(__dirname, '..', 'error.log');

module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errorData = {
      timestamp: new Date().toISOString(),
      type: 'ValidationError',
      message: err.message,
      method: req.method,
      url: req.url,
      body: req.body,
    };
    fs.appendFile(errorLogPath, `${JSON.stringify(errorData)}\n`, (fsErr) => {
      if (fsErr) console.error('Error al escribir en error.log:', fsErr);
    });

    return res.status(400).send({ message: err.message });
  }

  const { statusCode = 500, message } = err;

  const errorData = {
    timestamp: new Date().toISOString(),
    type: err.name || 'Error',
    message,
    statusCode,
    method: req.method,
    url: req.url,
    stack: err.stack,
  };
  fs.appendFile(errorLogPath, `${JSON.stringify(errorData)}\n`, (fsErr) => {
    if (fsErr) console.error('Error al escribir en error.log:', fsErr);
  });

  return res.status(statusCode).send({
    message: statusCode === 500 ? 'Ha ocurrido un error en el servidor' : message,
  });
};
