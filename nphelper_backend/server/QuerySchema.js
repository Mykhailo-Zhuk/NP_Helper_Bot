import mongoose from 'mongoose';

const Query = new mongoose.Schema({
  number: { type: String },
  lastName: { type: String },
  response: { type: String },
  completed: { type: Boolean },
  date: { type: String },
});

export default mongoose.model('Query', Query);
