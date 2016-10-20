/**
 * Created by alina on 20.10.16.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: 'String', required: true },
  name: { type: 'String', required: true },
  password: { type: 'String', required: true },
  password_salt: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  isAdmin: { type: 'Boolean', required: true, default: false },
});

export default mongoose.model('User', userSchema);
