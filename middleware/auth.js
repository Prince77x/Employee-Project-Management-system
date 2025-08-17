// middleware/auth.js
module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.error = 'Please login to view that resource.';
    return res.redirect('/auth/login');
  },

  ensureAdmin: (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') return next();
    req.session.error = 'Admin access required.';
    return res.redirect('/auth/login');
  }
};
