import * as React from 'react'
import { Create, Edit, ImageField, ImageInput, SelectInput, SimpleForm, TextInput } from 'react-admin'

const transform: (data) => Record<string, string> = (data) => {
  data.image = data.image?.rawFile
  return data
}

export const ProjectCreate = (props) => (
  <Create {...props} transform={transform}>
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
      <ImageInput source="image" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="description" multiline minRows={10} fullWidth />
      {/*<DateInput label="Publication date" source="published_at" defaultValue={new Date()} />*/}
    </SimpleForm>
  </Create>
)

export const ProjectEdit = (props) => (
  <Edit {...props} transform={transform}>
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
      <ImageInput source="image" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="description" multiline minRows={10} fullWidth />
    </SimpleForm>
  </Edit>
)
