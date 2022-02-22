//https://lyonwj.com/blog/graphql-server-next-js-neo4j-aura-vercel

import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from 'micro-cors'
import nodemailer from 'nodemailer'
import dbConnect from 'lib/dbConnect'
import Game from 'lib/models/Game'

const projects: { id: number; title: string }[] = []

const typeDefs = gql`
  type ProjectMetadata {
    count: Int!
  }
  type Project {
    id: ID!
    title: String!
    description: String!
  }
  type Query {
    allProjects: [Project!]!
    _allProjectsMeta: ProjectMetadata
    Project(id: ID!): Project
  }
  type Mutation {
    sendEmail(name: String!, email: String!, message: String!): String
    createProject(title: String!): Project
  }
`

const resolvers = {
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
    createProject: (parent, args: { title: string }) => {
      const { title } = args
      const newProject = { id: projects.length, title }
      projects.push(newProject)
      return newProject
    },
  },
  Query: {
    allProjects: async () => {
      const games = await Game.find()
      console.log(games)
      return games
    },
    _allProjectsMeta: () => ({ count: projects.length }),
    Project: (parent, args: { id: number }) => {
      const { id } = args
      return projects[id]
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
