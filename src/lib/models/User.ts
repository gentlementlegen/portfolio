import mongoose from 'mongoose'

export interface User {
  username: string
  password: string
}

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
