//https://lyonwj.com/blog/graphql-server-next-js-neo4j-aura-vercel

import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from 'micro-cors'
import nodemailer from 'nodemailer'

const typeDefs = gql`
  type Project {
    id: String!
  }
  type Query {
    projects: [Project!]!
  }
  type Mutation {
    sendEmail(name: String!, email: String!, message: String!): String
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
