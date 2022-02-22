const util = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

exports.jwtSign = util.promisify(jwt.sign);

exports.jwtVerify = util.promisify(jwt.verify);

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(config.get('saltRounds'));
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
exports.compareCryptPass = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};
