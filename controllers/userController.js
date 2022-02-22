const router = require('express').Router();
const { getAll } = require('../services/authServices');

const getAllUsers = async (req, res) => {
  try {
    const users = await getAll();
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

router.get('/', getAllUsers);

module.exports = router;
