// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/auth');

router.use(ensureAuthenticated);

router.get('/dashboard', userController.dashboard);
router.get('/projects', userController.myProjects);

module.exports = router;
