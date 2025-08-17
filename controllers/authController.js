// controllers/authController.js
const passport = require('passport');

exports.getLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

exports.postLogin = passport.authenticate('local', {
  failureRedirect: '/auth/login'
}), (req, res) => {
  req.session.success = `Welcome, ${req.user.name}`;
  if (req.user.role === 'admin') return res.redirect('/admin/dashboard');
  return res.redirect('/user/dashboard');
};

exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/auth/login');
  });
};
