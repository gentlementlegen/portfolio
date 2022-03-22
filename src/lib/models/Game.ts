import mongoose from 'mongoose'

export interface Game {
  id: string
  title: string
  category: 'OTHER' | 'GAME' | 'PROJECT'
  description: string
  image: File
}

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['OTHER', 'GAME', 'PROJECT'], default: 'OTHER' },
  description: { type: String, required: true },
  image: {
    data: Buffer,
    contentType: String,
  },
})

export default mongoose.models.Game || mongoose.model<Game>('Game', GameSchema)
