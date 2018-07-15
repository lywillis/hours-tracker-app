import mongoose from 'mongoose';

import TimeLog from '../models/timelog.server.model';

export const getTimeLogs = (req,res) => {
    TimeLog.find().exec((err,logs) => {
      if(err){
      return res.json({'success':false,'message':'Cannot fetch time logs'});
      }
  return res.json({'success':true,'message':'Time logs fetched successfully',logs});
    });
  }