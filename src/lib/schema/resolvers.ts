import nodemailer from 'nodemailer'
import GameDocument, { Game } from 'lib/models/Game'
import { FileUpload } from 'graphql-upload'
import sharp from 'sharp'
import { getGfs } from 'lib/dbConnect'
import mongoose from 'mongoose'
import SkillDocument, { Skill } from 'lib/models/Skill'
import UserDocument, { User } from 'lib/models/User'
import { GraphQLError } from 'graphql'

const getBlurHash = async (image: { file: FileUpload }) => {
  const blur = sharp().webp().blur().resize(15, 15, { fit: 'contain' })
  const stream = image.file.createReadStream()

  const res = await stream.pipe(blur).toBuffer()
  return res.toString('base64')
}

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
      args: { title: string; description: string; category: Game['category']; image: { file: FileUpload } },
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
            resolve(GameDocument.create({ ...rest, blur }))
          })
      })
    },
    deleteProject: async (parent, args: { id: string }) => {
      return GameDocument.findByIdAndDelete(args.id)
    },
    updateProject: async (
      parent,
      args: { id: string; title: string; description: string; category: Game['category']; image: { file: FileUpload } },
    ) => {
      const { id, image, ...rest } = args
      const gfs = await getGfs()
      const item = await GameDocument.findById(id)
      const blur = await getBlurHash(image)
      if (!image) {
        const document = await GameDocument.findByIdAndUpdate(id, { ...rest, image: null, blue: null }, { new: true })
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
              const res = await GameDocument.findByIdAndUpdate(
                id,
                {
                  ...rest,
                  image: document._id,
                  blur,
                },
                { new: true },
              )
              console.log(res)
              resolve(res)
            })
        })
      }
    },

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
  },
  Query: {
    allProjects: async (): Promise<Game[]> => {
      return GameDocument.find()
    },
    _allProjectsMeta: async () => {
      return { count: await GameDocument.count() }
    },
    Project: async (parent, args: { id: string }) => {
      const { id } = args
      return GameDocument.findById(id)
    },
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
  },
  Project: {
    image: async (data: Game) => {
      if (!data.image) return null
      return {
        id: data.id,
        src: `/api/image/${data.image}`,
      }
    },
  },
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

export default resolvers
