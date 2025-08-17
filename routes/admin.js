// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');

router.use(ensureAuthenticated);
router.use(ensureAdmin);

router.get('/dashboard', adminController.dashboard);

// employees
router.get('/employees', adminController.employees);
router.get('/employees/new', adminController.getEmployeeForm);
router.get('/employees/:id/edit', adminController.getEmployeeForm);
router.post('/employees', adminController.createOrUpdateEmployee);
router.put('/employees', adminController.createOrUpdateEmployee);
router.delete('/employees/:id', adminController.deleteEmployee);

// projects
router.get('/projects', adminController.projects);
router.get('/projects/new', adminController.getProjectForm);
router.get('/projects/:id/edit', adminController.getProjectForm);
router.post('/projects', adminController.createOrUpdateProject);
router.put('/projects', adminController.createOrUpdateProject);
router.delete('/projects/:id', adminController.deleteProject);

module.exports = router;
