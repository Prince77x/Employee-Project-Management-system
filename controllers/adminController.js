// controllers/adminController.js
const User = require('../models/User');
const Project = require('../models/Project');

exports.dashboard = async (req, res, next) => {
  try {
    const totalEmployees = await User.countDocuments({ role: 'user' });
    const totalProjects = await Project.countDocuments();
    const projectsByStatus = await Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(5).populate('createdBy');
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      totalEmployees,
      totalProjects,
      projectsByStatus,
      recentProjects
    });
  } catch (err) {
    next(err);
  }
};

// Employees management
exports.employees = async (req, res, next) => {
  try {
    const employees = await User.find({ role: 'user' }).sort({ createdAt: -1 });
    res.render('admin/employees', { title: 'Manage Employees', employees });
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeForm = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (userId) {
      const employee = await User.findById(userId);
      return res.render('admin/employeeForm', { title: 'Edit Employee', employee });
    }
    res.render('admin/employeeForm', { title: 'Add Employee', employee: null });
  } catch (err) {
    next(err);
  }
};

exports.createOrUpdateEmployee = async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = {
      name: req.body.name,
      email: req.body.email,
      role: 'user',
      designation: req.body.designation,
      department: req.body.department,
      contact: req.body.contact,
      status: req.body.status || 'active'
    };

    if (id) {
      const employee = await User.findById(id);
      if (!employee) {
        req.session.error = 'Employee not found';
        return res.redirect('/admin/employees');
      }
      // update fields (do not directly set password here)
      Object.assign(employee, data);
      employee.updatedAt = new Date();
      await employee.save();
      req.session.success = 'Employee updated';
      return res.redirect('/admin/employees');
    } else {
      const newUser = new User(data);
      await User.register(newUser, req.body.password || 'password123');
      req.session.success = 'Employee added';
      return res.redirect('/admin/employees');
    }
  } catch (err) {
    if (err.code === 11000 || err.name === 'UserExistsError') {
      req.session.error = 'Email already exists';
      return res.redirect('back');
    }
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    req.session.success = 'Employee deleted';
    res.redirect('/admin/employees');
  } catch (err) {
    next(err);
  }
};

// Projects management
exports.projects = async (req, res, next) => {
  try {
    const projects = await Project.find().populate('createdBy').populate('assignedUsers').sort({ createdAt: -1 });
    res.render('admin/projects', { title: 'Manage Projects', projects });
  } catch (err) {
    next(err);
  }
};

exports.getProjectForm = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'user', status: 'active' });
    const projectId = req.params.id;
    if (projectId) {
      const project = await Project.findById(projectId);
      return res.render('admin/projectForm', { title: 'Edit Project', project, users });
    }
    res.render('admin/projectForm', { title: 'Add Project', project: null, users });
  } catch (err) {
    next(err);
  }
};

exports.createOrUpdateProject = async (req, res, next) => {
  try {
    const { id, title, description, startDate, endDate, status, assignedUsers } = req.body;
    if (id) {
      const project = await Project.findById(id);
      if (!project) {
        req.session.error = 'Project not found';
        return res.redirect('/admin/projects');
      }
      project.title = title;
      project.description = description;
      project.startDate = startDate || null;
      project.endDate = endDate || null;
      project.status = status || 'Not Started';
      project.assignedUsers = Array.isArray(assignedUsers) ? assignedUsers : (assignedUsers ? [assignedUsers] : []);
      project.updatedAt = new Date();
      await project.save();
      req.session.success = 'Project updated';
      return res.redirect('/admin/projects');
    } else {
      const project = new Project({
        title,
        description,
        startDate: startDate || null,
        endDate: endDate || null,
        status: status || 'Not Started',
        createdBy: req.user._id,
        assignedUsers: Array.isArray(assignedUsers) ? assignedUsers : (assignedUsers ? [assignedUsers] : [])
      });
      await project.save();
      req.session.success = 'Project created';
      return res.redirect('/admin/projects');
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    req.session.success = 'Project deleted';
    res.redirect('/admin/projects');
  } catch (err) {
    next(err);
  }
};
