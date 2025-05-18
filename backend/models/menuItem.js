import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true }
});

export default mongoose.model('MenuItem', menuSchema);