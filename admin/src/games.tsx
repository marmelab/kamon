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
import { GameVictoryField } from "./ui/gameVictoryField";

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
        <GameVictoryField source="gameState" />
        <TextField source="gameState.winner" label="Winner" />
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
