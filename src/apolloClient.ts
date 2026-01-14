import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client/core'
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs'

const link = new UploadHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
})

const apolloClient = new ApolloClient({
  link: link as unknown as ApolloLink,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
})

export default apolloClient
