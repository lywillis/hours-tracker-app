import mongoose from 'mongoose';
import TimeLog from './timelog.server.model';

var Schema = mongoose.Schema({
  name: String,
  createdAt:{
    type: Date,
    default: Date.now
  }, 
  logs: [TimeLog]
});

export default mongoose.model('Project', Schema);