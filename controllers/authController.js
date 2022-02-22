const router = require('express').Router();
const config = require('config');
const { auth } = require('../middleware/auth');
const { passConfirm } = require('../config/util.config');
const {
  getUserByUsername,
  getUserById,
  createUser,
} = require('../services/authServices');
const {
  hashPassword,
  compareCryptPass,
  jwtSign,
} = require('../services/generalServices');

// loginUser :: POST
const loginUser = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (user === null) {
      throw new Error('You must enter correct username and password');
    }
    if (!(await compareCryptPass(password, user.password))) {
      throw new Error('You must enter correct username and password');
    }
    const payload = { user: { id: user._id, username: user.username } };
    const token = await jwtSign(payload, config.get('JWT_SECRET'), {
      expiresIn: 360000,
    });
    res.status(200).json(token);
  } catch (err) {
    console.log(err.message);
    return res.status(400).json(err.message);
  }
};

// registerUser :: POST
const registerUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  try {
    if (!passConfirm(password, confirmPassword)) {
      throw new Error('You must confirm your password');
    }
    const user = await getUserByUsername(username);
    if (user) {
      throw new Error('User already exists!');
    }

    const hashedPassword = await hashPassword(password);
    const createdUser = await createUser(username, hashedPassword);
    const payload = { user: { id: createdUser._id } };
    const token = await jwtSign(payload, config.get('JWT_SECRET'), {
      expiresIn: 360000,
    });
    res.json(token);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

// auth user :: GET
const authUser = async (req, res) => {
  try {
    console.log('User', req.user);
    const user = await getUserById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

//  login user :: POST
router.post('/login', loginUser);

router.get('/', auth, authUser);

// register user :: POST
router.post('/register', registerUser);


module.exports = router;
