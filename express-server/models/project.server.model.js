import mongoose from 'mongoose';

var Schema = mongoose.Schema({
  name: String,
  createdAt:{
    type: Date,
    default: Date.now
  }

});

export default mongoose.model('Project', Schema);