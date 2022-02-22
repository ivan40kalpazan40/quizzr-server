const { jwtVerify } = require('../services/generalServices');
const config = require('config');

exports.auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Not Authorized' });
  }
  jwtVerify(token, config.get(`JWT_SECRET`))
    .then((resolvedToken) => {
      req.user = resolvedToken.user;
      next();
    })
    .catch((err) => {
      res.status(400).json({ message: 'Token expired' });
    });
};
