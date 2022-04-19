import mongoose from 'mongoose'

export interface Skill {
  id: string
  name: string
  image?: string
}

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
})

export const getSkillObject = (o): Skill => ({
  id: o.id,
  name: o.name,
  image: o.image ? `/api/image/${o.image}` : null,
})

export default mongoose.models.Skill || mongoose.model<Skill>('Skill', SkillSchema)
