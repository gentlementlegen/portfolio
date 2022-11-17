import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

const link = createUploadLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
})

export default client
