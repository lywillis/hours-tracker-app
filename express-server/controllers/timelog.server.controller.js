import mongoose from 'mongoose';

import TimeLog from '../models/timelog.server.model';

export const getTimeLogs = (req,res) => {
    TimeLog.find()
    .sort({start: -1})
    .exec((err,logs) => {
      if(err){
      return res.json({'success':false,'message':'Cannot fetch time logs'});
      }
  return res.json({'success':true,'message':'Time logs fetched successfully',logs});
    });
  }

  export const addTimeLog = (req,res) => {
    const newLog = new TimeLog(req.body);
    newLog.save((err,log) => {
      if(err){
      return res.json({'success':false,'message':'Could not add time log'});
      }
  return res.json({'success':true,'message':'Time log added successfully',log});
    })
  }

export const deleteTimeLog = (req, res) => {
    TimeLog.findByIdAndRemove(req.params.id, (err, log) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Could not delete time log' });
        }
        return res.json({ 'success': true, 'message': 'Time log deleted successfully', log });
    })
  }