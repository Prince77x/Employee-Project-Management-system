 // routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.get('/login', authController.getLogin);
router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login' }), (req, res) => {
  req.session.success = `Welcome, ${req.user.name}`;
  res.redirect(req.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
});

router.get('/logout', authController.logout);

module.exports = router;

