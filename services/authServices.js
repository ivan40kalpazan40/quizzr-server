const User = require('../models/User');

// get user by username
exports.getUserByUsername = (username) => User.findOne({ username });

// Create user
exports.createUser = (username, password) =>
  User.create({ username, password });

// get user by ID
exports.getUserById = (id) => User.findById(id);

// get All
exports.getAll = () => User.find({});
