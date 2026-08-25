const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedCors = [
  'https://wilson-around.mooo.com',
  'https://www.wilson-around.mooo.com',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('✅ Conectado a la base de datos: aroundb');
  })
  .catch((err) => {
    console.log('❌ Error al conectar a MongoDB:', err);
  });

app.use((req, res, next) => {
  req.user = { _id: '6a6149b75e6e30c570b606a9' };
  next();
});

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.post('/signup', createUser);
app.post('/signin', login);

app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
