// const { signup, login } = require('../Controllers/AuthController');
// const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
import express from 'express'
import { signup, login } from '../Controllers/AuthController.js';
import { signupValidation, loginValidation } from '../Middlewares/AuthValidation.js';

const router = express.Router()

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

// module.exports = router;
export default router