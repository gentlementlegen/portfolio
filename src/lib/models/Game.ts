import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: Number,
  description: { type: String, required: true },
})

export default mongoose.models.Game || mongoose.model('Game', GameSchema)
