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

export const GameList = () => {
  const WEBAPP_ENDPOINT = import.meta.env.VITE_WEBAPP_ENDPOINT;
  return (
    <List filters={userFilters}>
      <Datagrid rowClick="edit">
        <BooleanField source="gameState.isRunning" label="Is running" />
        <BooleanField source="gameState.isDraw" label="Draw" />
        <BooleanField source="gameState.isPath" label="Path victory" />
        <BooleanField source="gameState.isLoop" label="Loop victory" />
        <TextField source="gameState.winner" />
        <ReferenceField
          source="playerBlackId"
          reference="user"
          label="Black player"
        />
        <ReferenceField
          source="playerWhiteId"
          reference="user"
          label="White player"
        />
        <DateField source="createdAt" showTime={true} />
        <FunctionField
          label="Game link"
          render={(record) => (
            <a href={`${WEBAPP_ENDPOINT}/game/${record.id}`} target="_blank">
              See game
            </a>
          )}
        />
      </Datagrid>
    </List>
  );
};
