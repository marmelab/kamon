import {
  BooleanField,
  Datagrid,
  DateField,
  FunctionField,
  List,
  ReferenceField,
  ReferenceInput,
  TextField,
} from "react-admin";

const userFilters = [
  <ReferenceInput
    source="playerBlackId"
    label="Player black"
    reference="user"
  />,
  <ReferenceInput
    source="playerWhiteId"
    label="PLayer white"
    reference="user"
  />,
];

export const GameList = () => (
  <List filters={userFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <FunctionField
        label="Name"
        source="board"
        render={(record) => `${JSON.stringify(record).substring(1, 50)}...`}
      />
      <BooleanField source="gameState.isRunning" />
      <BooleanField source="gameState.isDraw" />
      <BooleanField source="gameState.isPath" />
      <BooleanField source="gameState.isLoop" />
      <TextField source="gameState.winner" />
      <ReferenceField source="playerBlackId" reference="user" />
      <ReferenceField source="playerWhiteId" reference="user" />
      <DateField source="createdAt" showTime={true} />
    </Datagrid>
  </List>
);
