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

test("<GameVictoryField> correctly renders loop", async () => {
  render(
    <AdminContext>
      <GameVictoryField record={{ gameState: { isLoop: true } }} />
    </AdminContext>,
  );
  await screen.findByText("Loop");
});

test("<GameVictoryField> correctly renders path", async () => {
  render(
    <AdminContext>
      <GameVictoryField record={{ gameState: { isPath: true } }} />
    </AdminContext>,
  );
  await screen.findByText("Path");
});

test("<GameVictoryField> correctly renders blocked", async () => {
  render(
    <AdminContext>
      <GameVictoryField record={{ gameState: { winner: "black" } }} />
    </AdminContext>,
  );
  await screen.findByText("Blocked");
});

test("<GameVictoryField> correctly renders --", async () => {
  render(
    <AdminContext>
      <GameVictoryField record={{ gameState: {} }} />
    </AdminContext>,
  );
  await screen.findByText("--");
});
