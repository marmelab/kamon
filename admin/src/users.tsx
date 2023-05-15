import { Datagrid, List, TextField, TextInput } from "react-admin";

const userFilters = [
  <TextInput source="username@ilike" label="Username" alwaysOn />,
  <TextInput label="Email" source="email@ilike" alwaysOn />,
];

export const UserList = () => (
  <List filters={userFilters}>
    <Datagrid rowClick="edit">
      <TextField source="username" />
      <TextField source="email" />
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
    </Datagrid>
  </List>
);
