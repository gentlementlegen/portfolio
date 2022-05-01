//https://lyonwj.com/blog/graphql-server-next-js-neo4j-aura-vercel

import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from 'micro-cors'
import dbConnect from 'lib/dbConnect'
import { processRequest } from 'graphql-upload'
import { rateLimitDirective } from 'graphql-rate-limit-directive'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import resolvers from 'lib/schema/resolvers'

const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } = rateLimitDirective()

// For naming, refer to https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql-simple#expected-graphql-schema

let schema = makeExecutableSchema({
  typeDefs: [
    rateLimitDirectiveTypeDefs,
    gql`
      scalar Upload
      type Metadata {
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
      type Skill {
        id: ID!
        name: String!
        image: Image
      }
      type Query @rateLimit(limit: 5, duration: 5) {
        allProjects: [Project!]!
        _allProjectsMeta: Metadata
        Project(id: ID!): Project
        allSkills: [Skill!]!
        _allSkillsMeta: Metadata
        Skill(id: ID!): Skill
      }
      type Mutation {
        sendEmail(name: String!, email: String!, message: String!): String @rateLimit(limit: 1, duration: 30)
        createProject(title: String!, description: String!, category: Category!, image: Upload): Project
        deleteProject(id: ID!): Project
        updateProject(id: ID!, title: String!, description: String!, category: Category!, image: Upload): Project
        createSkill(name: String!, image: Upload): Skill
        deleteSkill(id: ID!): Skill
        updateSkill(id: ID!, name: String!, image: Upload): Skill
        login(username: String!, password: String!): String
      }
    `,
  ],
  resolvers,
})

schema = rateLimitDirectiveTransformer(schema)

const cors = Cors({ origin: `https://${process.env.VERCEL_URL}` })

const apolloServer = new ApolloServer({
  schema,
  // required for admin
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
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
