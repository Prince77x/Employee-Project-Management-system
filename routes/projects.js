// routes/projects.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/:id', ensureAuthenticated, projectController.viewProject);
router.post('/:id/modules/:moduleId/status', ensureAuthenticated, projectController.updateModuleStatus);

module.exports = router;
