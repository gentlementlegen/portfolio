import { FileUpload } from 'graphql-upload'
import { getGfs } from 'lib/dbConnect'
import SkillDocument, { Skill } from 'lib/models/Skill'
import mongoose from 'mongoose'
import getBlurHash from 'lib/schema/utils'

export const SkillMutations = {
  createSkill: async (parent, args: { name: string; image: { file: FileUpload } }) => {
    const { image, ...rest } = args
    const gfs = await getGfs()
    if (!image) {
      return SkillDocument.create(rest)
    }
    const blur = await getBlurHash(image)
    return new Promise((resolve, reject) => {
      image.file
        .createReadStream()
        .pipe(gfs.openUploadStream(args.image.file.filename))
        .on('error', () => {
          reject('Failed to upload the file')
        })
        .on('finish', (document) => {
          resolve(SkillDocument.create({ ...rest, image: document._id, blur }))
        })
    })
  },
  deleteSkill: async (parent, args: { id: string }) => {
    return SkillDocument.findByIdAndDelete(args.id)
  },
  updateSkill: async (parent, args: { id: string; name: string; image: { file: FileUpload } }) => {
    const { id, image, ...rest } = args
    const gfs = await getGfs()
    const item = await SkillDocument.findById(id)
    if (!image) {
      const document = await SkillDocument.findByIdAndUpdate(id, { ...rest, image: null, blur: null }, { new: true })
      if (item.image) {
        await gfs.delete(new mongoose.Types.ObjectId(item.image))
      }
      return document
    } else {
      const blur = await getBlurHash(image)
      return new Promise((resolve, reject) => {
        image.file
          .createReadStream()
          .pipe(gfs.openUploadStream(args.image.file.filename))
          .on('error', () => {
            reject('Failed to upload the file')
          })
          .on('finish', async (document) => {
            // Try to delete the previous image to avoid dangling images
            try {
              if (item.image) {
                await gfs.delete(new mongoose.Types.ObjectId(item.image))
              }
            } catch (e) {
              console.warn(`Could not delete file ${item}`, e)
            }
            const res = await SkillDocument.findByIdAndUpdate(
              id,
              {
                ...rest,
                image: document._id,
                blur,
              },
              { new: true },
            )
            resolve(res)
          })
      })
    }
  },
}

export const SkillQueries = {
  allSkills: async (): Promise<Skill[]> => {
    return SkillDocument.find()
  },
  _allSkillsMeta: async () => {
    return { count: await SkillDocument.count() }
  },
  Skill: async (parent, args: { id: string }) => {
    const { id } = args
    return SkillDocument.findById(id)
  },
}

export const SkillResolvers = {
  Skill: {
    image: async (data: Skill) => {
      if (!data.image) return null
      return {
        id: data.id,
        src: `/api/image/${data.image}`,
      }
    },
  },
}
