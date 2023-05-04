import React from "react";
import { render, waitFor } from "react-native-testing-library";
import { Game } from "./Game";
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useRoute: () => {
      params: {
        itemId: "1";
      }
    },
  };
});
describe("Game", () => {
  it("displays loader first", async () => {
    const renderedGame = render(<Game />);
    const loader = await renderedGame.getByTestId("loader");

    expect(loader).toBeDefined();
  });
});
