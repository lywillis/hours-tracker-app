import mongoose from 'mongoose';

var Schema = mongoose.Schema({
  name: String,
  createdAt:{
    type: Date,
    default: Date.now
  }, 
  totalSeconds: {
      type: Number, 
      default: 0
  }

});

export default mongoose.model('Project', Schema);