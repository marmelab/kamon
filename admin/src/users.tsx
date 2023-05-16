import {
  BooleanField,
  Datagrid,
  DateField,
  Edit,
  List,
  ReferenceField,
  ReferenceManyField,
  Show,
  SimpleForm,
  TabbedShowLayout,
  TextField,
  TextInput,
} from "react-admin";

const userFilters = [
  <TextInput source="username@ilike" label="Username" alwaysOn />,
];

export const UserList = () => (
  <List filters={userFilters}>
    <Datagrid rowClick="show">
      <TextField source="username" />
      <DateField source="createdAt" showTime={true} />
      <DateField source="updatedAt" showTime={true} />
    </Datagrid>
  </List>
);

export const UserShow = () => {
  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="summary">
          <TextField source="username" />
          <DateField source="createdAt" showTime={true} />
          <DateField source="updatedAt" showTime={true} />
          <TextField source="email" />
        </TabbedShowLayout.Tab>

        <TabbedShowLayout.Tab label="Games as black">
          <ReferenceManyField
            label="Games as black"
            reference="game"
            target="playerBlackId"
            sort={{ field: "createdAt", order: "DESC" }}
          >
            <Datagrid>
              <BooleanField source="gameState.isRunning" />
              <BooleanField source="gameState.isDraw" />
              <BooleanField source="gameState.isPath" />
              <BooleanField source="gameState.isLoop" />
              <TextField source="gameState.winner" />
              <ReferenceField source="playerBlackId" reference="user" />
              <ReferenceField source="playerWhiteId" reference="user" />
              <DateField source="createdAt" showTime={true} />
            </Datagrid>
          </ReferenceManyField>
        </TabbedShowLayout.Tab>

        <TabbedShowLayout.Tab label="Games as white">
          <ReferenceManyField
            label="Games as white"
            reference="game"
            target="playerWhiteId"
            sort={{ field: "createdAt", order: "DESC" }}
          >
            <Datagrid>
              <BooleanField source="gameState.isRunning" />
              <BooleanField source="gameState.isDraw" />
              <BooleanField source="gameState.isPath" />
              <BooleanField source="gameState.isLoop" />
              <TextField source="gameState.winner" />
              <ReferenceField source="playerBlackId" reference="user" />
              <ReferenceField source="playerWhiteId" reference="user" />
              <DateField source="createdAt" showTime={true} />
            </Datagrid>
          </ReferenceManyField>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);
