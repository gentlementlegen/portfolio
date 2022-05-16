import nodemailer from 'nodemailer'
import ProjectDocument, { Project } from 'lib/models/Project'
import { FileUpload } from 'graphql-upload'
import sharp from 'sharp'
import { getGfs } from 'lib/dbConnect'
import mongoose from 'mongoose'
import UserDocument, { User } from 'lib/models/User'
import { GraphQLError } from 'graphql'
import getBlurHash from 'lib/schema/utils'
import { SkillMutations, SkillQueries, SkillResolvers } from 'lib/schema/skillResolvers'

const resolvers = {
  Mutation: {
    async login(parent, args: { username: string; password: string }) {
      const { username, password } = args
      const user = await UserDocument.findOne<User>({ username, password })
      if (!user) throw new GraphQLError('Could not login')
      return `successfully logged in as ${user.username}`
    },
    sendEmail: async (parent, args: { name: string; email: string; message: string }) => {
      const { name, email, message } = args
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      })

      const info = await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: process.env.EMAIL_ADDRESS,
        subject: `New message from ${name}`,
        text: `From: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
      })

      return info.response
    },
    createProject: async (
      parent,
      args: { title: string; description: string; category: Project['category']; image: { file: FileUpload } },
    ) => {
      const { image, ...rest } = args
      const transformer = sharp().webp().resize(800, 600)
      const stream = image.file.createReadStream()
      const gfs = await getGfs()

      const blur = await getBlurHash(image)

      return new Promise((resolve, reject) => {
        stream
          .pipe(transformer)
          .pipe(gfs.openUploadStream(args.image.file.filename))
          .on('error', () => {
            reject('Failed to upload the file')
          })
          .on('finish', () => {
            resolve(ProjectDocument.create({ ...rest, blur }))
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
      if (!image) {
        const document = await ProjectDocument.findByIdAndUpdate(
          id,
          {
            ...rest,
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
                },
                { new: true },
              )
              resolve(res)
            })
        })
      }
    },
    ...SkillMutations,
  },
  Query: {
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
    ...SkillQueries,
  },
  Project: {
    image: async (data: Project) => {
      if (!data.image) return null
      return {
        id: data.id,
        src: `/api/image/${data.image}`,
      }
    },
  },
  ...SkillResolvers,
}

export default resolvers
