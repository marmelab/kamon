import { Datagrid, List, TextField, TextInput } from "react-admin";

const userFilters = [
  <TextInput source="username@ilike" label="Username" alwaysOn />,
];

export const UserList = () => (
  <List filters={userFilters}>
    <Datagrid rowClick="edit">
      <TextField source="username" />
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
    </Datagrid>
  </List>
);
