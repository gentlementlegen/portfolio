import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

const link = createUploadLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
})

const client = new ApolloClient({
  link,
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
})

export default client
