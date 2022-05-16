import mongoose from 'mongoose'

export interface Project {
  id: string
  title: string
  category: 'OTHER' | 'GAME' | 'PROJECT'
  description: string
  image: string
  blur: string
  slug: string
}

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['OTHER', 'GAME', 'PROJECT'], default: 'OTHER' },
  description: { type: String, required: true },
  image: { type: String },
  blur: { type: String },
  slug: { type: String, unique: true },
})

export const getProjectObject = (o) => ({
  category: o.category,
  description: o.description,
  id: o.id,
  title: o.title,
  image: `/api/image/${o.image}`,
  blur: o.blur
    ? `data:image/webp;base64,${o.blur}`
    : 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAABQAQCdASoBAAEAAUAmJaQABYwAAM0AAAA=',
  slug: o.slug ?? null,
})

export default mongoose.models.Project || mongoose.model<Project>('Project', ProjectSchema)
