const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { validateSignUp, validateSignIn } = require('./middlewares/validations');
const errorHandler = require('./middlewares/error-handler');
const requestLogger = require('./middlewares/request-logger');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

const corsOptions = {
  origin: [
    'https://wilson-around.mooo.com',
    'https://www.wilson-around.mooo.com',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
};

app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('✅ Conectado a la base de datos: aroundb');
  })
  .catch((err) => {
    console.log('❌ Error al conectar a MongoDB:', err);
  });

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
