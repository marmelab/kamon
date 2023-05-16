import {
  BooleanField,
  Datagrid,
  DateField,
  FunctionField,
  List,
  ReferenceField,
  TextField,
} from "react-admin";

export const GameList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <FunctionField
        label="Name"
        source="board"
        render={(record) => `${JSON.stringify(record).substring(1, 50)}...`}
      />
      <BooleanField source="gameState.isDraw" />
      <BooleanField source="gameState.isRunning" />
      <TextField source="gameState.winner" />
      <ReferenceField source="playerBlackId" reference="user">
        <TextField source="username" />
      </ReferenceField>
      <ReferenceField source="playerWhiteId" reference="user">
        <TextField source="username" />
      </ReferenceField>
      <DateField source="createdAt" showTime={true} />
    </Datagrid>
  </List>
);
