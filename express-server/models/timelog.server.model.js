import mongoose from 'mongoose';

var Schema = mongoose.Schema({
  start: Date, 
  end: Date
});

export default mongoose.model('TimeLog', Schema);