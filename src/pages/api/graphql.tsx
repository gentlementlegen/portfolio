//https://lyonwj.com/blog/graphql-server-next-js-neo4j-aura-vercel

import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from 'micro-cors'
import nodemailer from 'nodemailer'
import dbConnect from 'lib/dbConnect'
import GameDocument, { Game } from 'lib/models/Game'

// For naming, refer to https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql-simple#expected-graphql-schema
const typeDefs = gql`
  type ProjectMetadata {
    count: Int!
  }
  enum Category {
    OTHER
    GAME
    PROJECT
  }
  type Project {
    id: ID!
    title: String!
    description: String!
    category: Category!
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
    createProject(title: String!, description: String!): Project
    deleteProject(id: ID!): Project
    updateProject(id: ID!, title: String!, description: String!): Project
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
    createProject: async (parent, args: { title: string; description: string }) => {
      return GameDocument.create(args)
    },
    deleteProject: async (parent, args: { id: string }) => {
      return GameDocument.findByIdAndDelete(args.id)
    },
    updateProject: async (parent, args: { id: string; title: string; description: string }) => {
      const { id, ...rest } = args
      return GameDocument.findByIdAndUpdate(id, rest, { new: true })
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
}

const cors = Cors({ origin: process.env.VERCEL_URL })

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const startServer = apolloServer.start()

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return false
  }
  await dbConnect()
  await startServer
  return apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}
