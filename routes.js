const router = require('express').Router();
const authController = require('./controllers/authController');
const gameController = require(`./controllers/gameController`);
const userController = require('./controllers/userController');

router.use('/auth', authController);
router.use(`/quizz`, gameController);
router.use('/user', userController);

module.exports = router;
