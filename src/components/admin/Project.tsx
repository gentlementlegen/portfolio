import * as React from 'react'
import { Create, SimpleForm, TextInput } from 'react-admin'

export const ProjectCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" multiline />
      {/*<DateInput label="Publication date" source="published_at" defaultValue={new Date()} />*/}
    </SimpleForm>
  </Create>
)
