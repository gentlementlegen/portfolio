import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink'

const link = createUploadLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
})

const apolloClient = new ApolloClient({
  link: link as unknown as ApolloLink,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
})

export default apolloClient
