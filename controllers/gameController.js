const router = require('express').Router();
const { getUserById } = require('../services/authServices');

// Add result to current user

const addResult = async (req, res) => {
  const { userId } = req.params;
  const { currentTestScore } = req.body;
  try {
    const user = await getUserById(userId);
    console.log(user);
    console.log(`TESTS TAKEN`, req.body);
    await user.updateScore(currentTestScore);
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

router.patch(`/add_result/:userId`, addResult);
module.exports = router;
