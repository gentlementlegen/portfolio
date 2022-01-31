import express from 'express'
import cors from 'cors'
import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import * as http from 'http'

const app = express()
app.use(cors())
app.use(express.json())
const httpServer = http.createServer(app)

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'world',
  },
}

const startApolloServer = async (apolloApp, apolloServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: apolloServer })],
  })

  await server.start()
  server.applyMiddleware({ app: apolloApp })
}

startApolloServer(app, httpServer)
  .then(() => console.log('Apollo server started'))
  .catch((e) => console.log(e))

export default httpServer
