require('dotenv').config(); //get env variables

const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcrypt');
const auth= require('../middleware/check-token'); 
const jwt = require('jsonwebtoken');
// const config = require('config');
const { check, validationResult } = require('express-validator');

const Admin     = require('../models/admin'); 

var cors = require('cors')
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/test', auth, async (req, res) => {
    try {
      const user = await Admin.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/login',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(), cors(corsOptions),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await Admin.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, errors: [{ msg: 'Invalid Credential : email' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, errors: [{ msg: 'Invalid Credential : password' }] });
      }

      const payload = {
        user: {
          id: user._id,
          email: user.email,
          first_name: user.first_name,
          last_name : user.last_name
        }
      };
 
      jwt.sign(
        payload,
        process.env.JWT_KEY,
        { expiresIn: '24h' },
        (err, token) => {
          if (err) throw err;
          res.json({ 
                success: true,
                msg:'Admin auth sucess!',
                token: token,
                data: { 
                    'email': user.email,
                    'fname': user.first_name,
                    'lname': user.last_name
                }
             });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
