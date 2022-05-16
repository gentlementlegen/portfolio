import { FileUpload } from 'graphql-upload'
import { getGfs } from 'lib/dbConnect'
import mongoose from 'mongoose'
import getBlurHash from 'lib/schema/utils'
import ProjectDocument, { Project } from 'lib/models/Project'
import sharp from 'sharp'
import slugify from 'slugify'

export const ProjectMutations = {
  createProject: async (
    parent,
    args: { title: string; description: string; category: Project['category']; image: { file: FileUpload } },
  ) => {
    const { image, ...rest } = args
    const transformer = sharp().webp().resize(800, 600)
    const stream = image.file.createReadStream()
    const gfs = await getGfs()
    const slug = slugify(args.title, { lower: true, strict: true })

    const blur = await getBlurHash(image)

    return new Promise((resolve, reject) => {
      stream
        .pipe(transformer)
        .pipe(gfs.openUploadStream(args.image.file.filename))
        .on('error', () => {
          reject('Failed to upload the file')
        })
        .on('finish', () => {
          resolve(ProjectDocument.create({ ...rest, slug, blur }))
        })
    })
  },
  deleteProject: async (parent, args: { id: string }) => {
    return ProjectDocument.findByIdAndDelete(args.id)
  },
  updateProject: async (
    parent,
    args: {
      id: string
      title: string
      description: string
      category: Project['category']
      image: { file: FileUpload }
    },
  ) => {
    const { id, image, ...rest } = args
    const gfs = await getGfs()
    const item = await ProjectDocument.findById(id)
    const blur = await getBlurHash(image)
    const slug = slugify(args.title, { lower: true, strict: true })

    if (!image) {
      const document = await ProjectDocument.findByIdAndUpdate(
        id,
        {
          ...rest,
          slug,
          image: null,
          blue: null,
        },
        { new: true },
      )
      await gfs.delete(new mongoose.Types.ObjectId(item.image))
      return document
    } else {
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
              await gfs.delete(new mongoose.Types.ObjectId(item.image))
            } catch (e) {
              console.warn(`Could not delete file ${item}`, e)
            }
            const res = await ProjectDocument.findByIdAndUpdate(
              id,
              {
                ...rest,
                image: document._id,
                blur,
                slug,
              },
              { new: true },
            )
            resolve(res)
          })
      })
    }
  },
}

export const ProjectQueries = {
  allProjects: async (): Promise<Project[]> => {
    return ProjectDocument.find()
  },
  _allProjectsMeta: async () => {
    return { count: await ProjectDocument.count() }
  },
  Project: async (parent, args: { id: string }) => {
    const { id } = args
    return ProjectDocument.findById(id)
  },
  ProjectBySlug: async (parent, args: { slug: string }) => {
    const { slug } = args
    return ProjectDocument.findOne({ slug })
  },
}

export const ProjectResolvers = {
  Project: {
    image: async (data: Project) => {
      if (!data.image) return null
      return {
        id: data.id,
        src: `/api/image/${data.image}`,
      }
    },
  },
}
