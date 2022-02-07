import React from 'react'
import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from 'react-admin'
import buildGraphQLProvider from 'ra-data-graphql-simple'
import { ProjectCreate } from 'components/admin/Project'

const AdminPage = (): JSX.Element => {
  const [dataProvider, setDataProvider] = React.useState(null)
  React.useEffect(() => {
    buildGraphQLProvider({ clientOptions: { uri: process.env.NEXT_PUBLIC_API_URL } }).then((graphQlDataProvider) =>
      setDataProvider(() => graphQlDataProvider),
    )
  }, [])

  if (!dataProvider) {
    return <div>Loading</div>
  }

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="Project" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} create={ProjectCreate} />
    </Admin>
  )
}

export default AdminPage
