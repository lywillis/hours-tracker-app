import mongoose from 'mongoose';

var Schema = mongoose.Schema({
  name: String
  
});

export default mongoose.model('Project', Schema);