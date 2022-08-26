import * as React from 'react'
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  ImageField,
  ImageInput,
  List,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin'

const transform: (data) => Record<string, string> = (data) => {
  data.image = data.image?.rawFile
  return data
}

export const SkillCreate = (props) => (
  <Create {...props} transform={transform}>
    <SimpleForm>
      <TextInput source="name" isRequired />
      <ImageInput source="image" accept="image/*" isRequired>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
)

export const SkillList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <ImageField source="image.src" label="Image" />
      <EditButton />
    </Datagrid>
  </List>
)

export const SkillEdit = (props) => (
  <Edit {...props} transform={transform}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <ImageInput source="image" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
)
