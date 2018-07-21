import mongoose from 'mongoose';

import Project from '../models/project.server.model';

export const getProjects = (req,res) => {
    var numOfProjects = req.body.n;
    Project.find()
    .sort({name: -1})
    .limit(numOfProjects)
    .exec((err,projs) => {
      if(err){
      return res.json({'success':false,'message':'Cannot fetch projects'});
      }
  return res.json({'success':true,'message':'Projects fetched successfully',projs});
    });
  }

  export const addProject = (req,res) => {
    const newProj = new Project(req.body);
    newProj.save((err,proj) => {
      if(err){
      return res.json({'success':false,'message':'Could not add project'});
      }
  return res.json({'success':true,'message':'Project added successfully',proj});
    })
  }

