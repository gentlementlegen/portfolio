import { AUTH_CHECK, AUTH_LOGIN, AUTH_LOGOUT } from 'react-admin'
import client from 'apolloClient'
import { gql } from '@apollo/client'
import { GraphQLError } from 'graphql'

const authProvider = async (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params
    const result = await client.mutate({
      mutation: gql`
        mutation Login($username: String!, $password: String!) {
          login(username: $username, password: $password)
        }
      `,
      variables: { username, password },
    })
    if (!result) {
      throw new GraphQLError(`User ${username} was not found`)
    }
    localStorage.setItem('token', JSON.stringify(result.data))
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject()
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token')
  }
  return Promise.resolve()
}

export default authProvider
