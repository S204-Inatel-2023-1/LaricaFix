import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  nome:{
    type: String,
    require: true
  },
  email:{
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  senha:{
    type: String,
    require: true,
    select: false,
    lowercase: true,
  }
})

UserSchema.pre('save', async function(next){
  const hashedPassword = await bcrypt.hash(this.senha, 12)
  this.senha = hashedPassword;

  next()
})

export default mongoose.model("User", UserSchema);