// controllers/userController.js
const Project = require('../models/Project');

exports.dashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const myProjects = await Project.find({ assignedUsers: userId }).populate('createdBy');
    res.render('user/dashboard', { title: 'User Dashboard', myProjects });
  } catch (err) {
    next(err);
  }
};

exports.myProjects = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const projects = await Project.find({ assignedUsers: userId }).populate('createdBy');
    res.render('user/myProjects', { title: 'My Projects', projects });
  } catch (err) {
    next(err);
  }
};
