import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
});

export default mongoose.model('Category', categorySchema);/**
 * Created by alina on 05.10.16.
 */
