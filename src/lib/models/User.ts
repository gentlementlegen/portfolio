import mongoose, { Model } from 'mongoose'

export interface User {
  username: string
  password: string
}

const UserSchema = new mongoose.Schema<User>({
  username: String,
  password: String,
})

export default (mongoose.models.User as Model<User>) || mongoose.model('User', UserSchema)
