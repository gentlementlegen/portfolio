import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
  title: String,
  category: Number,
  description: String,
})

export default mongoose.models.Game || mongoose.model('Game', GameSchema)
