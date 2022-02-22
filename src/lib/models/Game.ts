import mongoose from 'mongoose'

export interface Game {
  id: string
  title: string
  category: number
  description: string
}

const GameSchema = new mongoose.Schema<Game>({
  title: { type: String, required: true },
  category: Number,
  description: { type: String, required: true },
})

export default mongoose.models.Game || mongoose.model<Game>('Game', GameSchema)
