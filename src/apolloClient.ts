import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

const link = createUploadLink({
  uri: '/api/graphql',
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
})

export default client
