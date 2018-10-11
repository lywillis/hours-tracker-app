import mongoose from 'mongoose';

import Project from '../models/project.server.model';
import TimeLog from '../models/timelog.server.model';

export const getProjects = (req,res) => {
    var numOfProjects = req.body.n;
    Project.find()
    .sort({name: -1})
    .limit(numOfProjects)
    .exec((err,projects) => {
      if(err){
      return res.json({'success':false,'message':'Cannot fetch projects'});
      }
  return res.json({'success':true,'message':'Projects fetched successfully',projects});
    });
  }

export const addProject = (req, res) => {
  const newProj = new Project(req.body);
  newProj.save((err, project) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Could not add project' });
    }
    return res.json({ 'success': true, 'message': 'Project added successfully', project });
  })
}
export const checkIfProjectExists = (req, res) => {
  Project.findOne({ name: req.params.name })
    .then(project => {
      if (project) {
        return res.json({ projectExists: true });
      }
      else {
        return res.json({ projectExists: false });
      }
    })
  }

export const getProject = (req,res) => {
  Project.findById(req.params.id)
  .exec((err,project) => {
    if(err){
    return res.json({'success':false,'message':'Cannot find requested project'});
    }
return res.json({'success':true,'message':'Project found',project});
  });
}

export const deleteProject = (req, res) => {
  Project.findByIdAndRemove(req.params.id, (err, project) => {
    if (err) {
        return res.json({ 'success': false, 'message': 'Could not delete project' });
    }
    return res.json({ 'success': true, 'message': 'Project deleted successfully', project});
})
}
  