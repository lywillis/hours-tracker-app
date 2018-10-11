import mongoose from 'mongoose';

import Project from '../models/project.server.model';
import TimeLog from '../models/timelog.server.model';

export const getTimeLogs = (req,res) => {
    var numOfLogs = req.body.n;
    TimeLog.find()
    .sort({start: -1})
    .limit(numOfLogs)
    .exec((err,logs) => {
      if(err){
      return res.json({'success':false,'message':'Cannot fetch time logs'});
      }
  return res.json({'success':true,'message':'Time logs fetched successfully',logs});
    });
  }

  export const addTimeLog = (req, res) => {
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

  export const deleteTimeLog = (req, res) => {
    Project.findById(req.params.id)
    .exec((err,project) => {
      project.logs.id(req.params.log).remove();
      project.save((err, proj) => {
        if (err) {
          return res.json({ 'success': false, 'message': 'Could not delete time from project' });
        }
        return res.json({ 'success': true, 'message': 'Time log deleted successfully', proj });
      });
    });
  }

    export const getTimeLog = (req,res) => {
      Project.findById(req.params.id)
      .exec((err,project) => {
        if(err){
        return res.json({'success':false,'message':'Cannot find requested time log'});
        }
    const log = project.logs.id(req.params.log);
    return res.json({'success':true,'message':'Time log found',log});
      });
    }

    export const updateTimeLog = (req, res) => {
      Project.findById(req.params.id).exec((err, project) => {
        const log = project.logs.id(req.params.log);
        log.set(req.body);
        project.save((err, proj) => {
          if (err) {
            return res.json({ 'success': false, 'message': 'Could not save time in project' });
          }
          return res.json({ 'success': true, 'message': 'Time changed successfully', proj });
        });
        if(err) {
          return res.json({ 'success': false, 'message': 'Could not find project' });
        }
      });
    }
  