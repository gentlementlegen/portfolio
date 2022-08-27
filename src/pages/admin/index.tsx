import React from 'react'
import { Admin, Resource, ShowGuesser } from 'react-admin'
import buildGraphQLProvider from 'ra-data-graphql-simple'
import { ProjectCreate, ProjectEdit, ProjectList } from 'components/admin/Project'
import client from 'apolloClient'
import { SkillCreate, SkillEdit, SkillList } from 'components/admin/Skill'
import authProvider from 'components/admin/authProvider'

const AdminPage = (): JSX.Element => {
  const [dataProvider, setDataProvider] = React.useState(null)
  React.useEffect(() => {
    buildGraphQLProvider({ client }).then((graphQlDataProvider) => setDataProvider(() => graphQlDataProvider))
  }, [])

  if (!dataProvider) {
    return <div>Loading</div>
  }

  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="Project" list={ProjectList} edit={ProjectEdit} show={ShowGuesser} create={ProjectCreate} />
      <Resource name="Skill" list={SkillList} edit={SkillEdit} show={ShowGuesser} create={SkillCreate} />
    </Admin>
  )
}

AdminPage.hideMainLayout = true

export default AdminPage
