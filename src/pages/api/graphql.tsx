//https://lyonwj.com/blog/graphql-server-next-js-neo4j-aura-vercel

import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from 'micro-cors'
import nodemailer from 'nodemailer'
import dbConnect, { getGfs } from 'lib/dbConnect'
import GameDocument, { Game } from 'lib/models/Game'
import { FileUpload, processRequest } from 'graphql-upload'
import mongoose from 'mongoose'

// For naming, refer to https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql-simple#expected-graphql-schema
const typeDefs = gql`
  scalar Upload
  type ProjectMetadata {
    count: Int!
  }
  enum Category {
    OTHER
    GAME
    PROJECT
  }
  type Image {
    id: ID
    src: String
  }
  type Project {
    id: ID!
    title: String!
    description: String!
    category: Category!
    image: Image
  }
  input ProjectInput {
    title: String
    description: String
  }
  type Query {
    allProjects: [Project!]!
    _allProjectsMeta: ProjectMetadata
    Project(id: ID!): Project
  }
  type Mutation {
    sendEmail(name: String!, email: String!, message: String!): String
    createProject(title: String!, description: String!, category: Category!, image: Upload): Project
    deleteProject(id: ID!): Project
    updateProject(id: ID!, title: String!, description: String!, category: Category!, image: Upload): Project
  }
`

export const resolvers = {
  Mutation: {
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
        from: 'fernand-veyrier@website.com',
        to: 'fernandveyrier96@gmail.com',
        subject: `New message from ${name}`,
        text: `${name} // ${email}\n\n${message}`,
      })

      return info.response
    },
    createProject: async (
      parent,
      args: { title: string; description: string; category: Game['category']; image: { file: FileUpload } },
    ) => {
      const { image, ...rest } = args
      const gfs = await getGfs()
      return new Promise((resolve, reject) => {
        image.file
          .createReadStream()
          .pipe(gfs.openUploadStream(args.image.file.filename))
          .on('error', () => {
            reject('Failed to upload the file')
          })
          .on('finish', () => {
            resolve(GameDocument.create(rest))
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
      if (!image) {
        const document = await GameDocument.findByIdAndUpdate(id, { ...rest, image: null }, { new: true })
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
              const res = await GameDocument.findByIdAndUpdate(id, { ...rest, image: document._id }, { new: true })
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
}

const cors = Cors({ origin: `https://${process.env.VERCEL_URL}` })

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // required for admin
  introspection: true,
})

const startServer = apolloServer.start()

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return false
  }
  await dbConnect()
  await startServer
  const contentType = req.headers['content-type']
  if (contentType && contentType.startsWith('multipart/form-data')) {
    req.filePayload = await processRequest(req, res)
  }
  return apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}
