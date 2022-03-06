import * as React from 'react'
import { Create, Edit, SelectInput, SimpleForm, TextInput } from 'react-admin'

export const ProjectCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <SelectInput
        source="category"
        choices={[
          { id: 'OTHER', name: 'Other' },
          { id: 'GAME', name: 'Game' },
          { id: 'PROJECT', name: 'Project' },
        ]}
        defaultValue={'OTHER'}
      />
      <TextInput source="description" multiline minRows={10} />
      {/*<DateInput label="Publication date" source="published_at" defaultValue={new Date()} />*/}
    </SimpleForm>
  </Create>
)

export const ProjectEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="title" />
      <SelectInput
        source="category"
        choices={[
          { id: 'OTHER', name: 'Other' },
          { id: 'GAME', name: 'Game' },
          { id: 'PROJECT', name: 'Project' },
        ]}
        defaultValue={'OTHER'}
      />
      <TextInput source="description" multiline minRows={10} />
    </SimpleForm>
  </Edit>
)
