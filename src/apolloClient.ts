import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

const link = createUploadLink({
  uri: `${process.env.VERCEL_URL}/api/graphql`,
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
