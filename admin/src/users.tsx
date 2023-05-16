import { Datagrid, DateField, List, TextField, TextInput } from "react-admin";

const userFilters = [
  <TextInput source="username@ilike" label="Username" alwaysOn />,
];

export const UserList = () => (
  <List filters={userFilters}>
    <Datagrid rowClick="edit">
      <TextField source="username" />
      <DateField source="createdAt" showTime={true} />
      <DateField source="updatedAt" showTime={true} />
    </Datagrid>
  </List>
);
