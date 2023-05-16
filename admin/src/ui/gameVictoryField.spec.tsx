import { AdminContext } from "react-admin";
import { render, screen } from "@testing-library/react";

import { GameVictoryField } from "./gameVictoryField";

test("<GameVictoryField> correctly renders draw", async () => {
  render(
    <AdminContext>
      <GameVictoryField record={{ gameState: { isDraw: true } }} />
    </AdminContext>,
  );
  await screen.findByText("Draw");
});
