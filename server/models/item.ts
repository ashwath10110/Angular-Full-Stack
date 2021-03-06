import * as mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: String,
  type: String,
  countPerKg: String,
  averageWeightPerPiece: String,
  price: String,
  imageForShowCase: String,
  imageForCart: String
});

const item = mongoose.model('itemSchema', itemSchema);

export default item;
