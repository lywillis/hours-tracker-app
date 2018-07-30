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

  export const addProject = (req,res) => {
    const newProj = new Project(req.body);
    newProj.save((err,project) => {
      if(err){
      return res.json({'success':false,'message':'Could not add project'});
      }
  return res.json({'success':true,'message':'Project added successfully',project});
    })
  }

export const addTime = (req, res) => {
  const newLog = new TimeLog(req.body);
  Project.findById(req.params.id).exec((err, project) => {
    project.logs.push(newLog);
    project.save((err, proj) => {
      if (err) {
        return res.json({ 'success': false, 'message': 'Could not add time to project' });
      }
      return res.json({ 'success': true, 'message': 'Time added successfully', proj });
    });
  });
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
  