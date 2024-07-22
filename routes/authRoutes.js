const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('../config/passport');

router.get('/register', (req, res) => res.render('auth/register'));
router.post('/register', authController.register);
router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/oauth2callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.userId = req.user.id;
    req.session.tokens = req.user.tokens;
    res.redirect('/home');
  }
);

module.exports = router;
