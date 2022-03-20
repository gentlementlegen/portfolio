import React from 'react'
import { Admin, ListGuesser, Resource, ShowGuesser } from 'react-admin'
import buildGraphQLProvider from 'ra-data-graphql-simple'
import { ProjectCreate, ProjectEdit } from 'components/admin/Project'
import client from 'apolloClient'

const AdminPage = (): JSX.Element => {
  const [dataProvider, setDataProvider] = React.useState(null)
  React.useEffect(() => {
    buildGraphQLProvider({ client }).then((graphQlDataProvider) => setDataProvider(() => graphQlDataProvider))
  }, [])

  if (!dataProvider) {
    return <div>Loading</div>
  }

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="Project" list={ListGuesser} edit={ProjectEdit} show={ShowGuesser} create={ProjectCreate} />
    </Admin>
  )
}

AdminPage.hideNavBar = true

export default AdminPage
