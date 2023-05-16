import { useRecordContext } from "react-admin";
import { Chip } from "@mui/material";

export const GameVictoryField = (props: any) => {
  const record = useRecordContext(props);
  if (!record) {
    return null;
  }

  const gameState = record.gameState;

  if (gameState?.isDraw) {
    return <Chip label="Draw" color="info" />;
  }

  if (gameState?.isLoop) {
    return <Chip label="Loop" color="success" />;
  }

  if (gameState?.isPath) {
    return <Chip label="Path" color="success" />;
  }

  if (gameState?.winner) {
    return <Chip label="Blocked" color="error" />;
  }

  return <Chip label="--" />;
};

GameVictoryField.defaultProps = { label: "Victory" };
