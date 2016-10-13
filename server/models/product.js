/**
 * Created by alina on 25.09.16.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  active: {type: 'Boolean', required:true},
  name: {type: 'String', required: true},
  category: {type: 'String', required: true},
  code: {type: 'String', required: true},
  description: {type: 'String', required: true},
  cuid: {type: 'String', required: true},
  price: {type: 'Number', required: true},
  sizes: [],
  colors: {type: 'Object', required: false},
  groups: [],
  photos: []
});

export default mongoose.model('Product', productSchema);
