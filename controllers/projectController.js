// controllers/projectController.js
const Project = require('../models/Project');
const Module = require('../models/Module');

exports.viewProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('createdBy').populate('assignedUsers');
    const modules = await Module.find({ projectId: project._id }).populate('assignedTo');
    res.render('admin/projectForm', { title: 'Project Detail', project, users: [], modules });
  } catch (err) {
    next(err);
  }
};

exports.updateModuleStatus = async (req, res, next) => {
  try {
    const module = await Module.findById(req.params.moduleId);
    if (!module) {
      req.session.error = 'Module not found';
      return res.redirect('back');
    }
    const uid = req.user._id;
    if (String(module.assignedTo) !== String(uid) && req.user.role !== 'admin') {
      req.session.error = 'Not authorized';
      return res.redirect('back');
    }
    module.status = req.body.status || module.status;
    module.progressNotes = req.body.progressNotes || module.progressNotes;
    module.updatedAt = new Date();
    await module.save();
    req.session.success = 'Module updated';
    res.redirect('back');
  } catch (err) {
    next(err);
  }
};
