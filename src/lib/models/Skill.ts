import mongoose from 'mongoose'

export interface Skill {
  blur: string
  id: string
  name: string
  image?: string
}

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  blur: { type: String },
})

export const getSkillObject = (o): Skill => ({
  id: o.id,
  name: o.name,
  image: o.image ? `/api/image/${o.image}` : null,
  blur: o.blur
    ? `data:image/webp;base64,${o.blur}`
    : 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAABQAQCdASoBAAEAAUAmJaQABYwAAM0AAAA=',
})

export default mongoose.models.Skill || mongoose.model<Skill>('Skill', SkillSchema)
