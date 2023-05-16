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
        <BooleanField source="gameState.isRunning" />
        <BooleanField source="gameState.isDraw" />
        <BooleanField source="gameState.isPath" />
        <BooleanField source="gameState.isLoop" />
        <TextField source="gameState.winner" />
        <ReferenceField source="playerBlackId" reference="user" />
        <ReferenceField source="playerWhiteId" reference="user" />
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
