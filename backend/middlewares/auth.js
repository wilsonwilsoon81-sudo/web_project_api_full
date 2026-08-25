const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization = '' } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'No autorizado' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET || 'super-secret-key-practicum');
  } catch (err) {
    return res.status(401).send({ message: 'No autorizado' });
  }

  req.user = payload;
  return next();
};
