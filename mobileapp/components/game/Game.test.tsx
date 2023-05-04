import React from "react";
import { render, screen } from "@testing-library/react-native";
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
    render(<Game />);
    const loader = screen.findByRole("progressbar");

    expect(loader).toBeDefined();
  });

  it("displays refresh button", async () => {
    render(<Game />);
    const refreshButton = await screen.findByRole("button");
    expect(refreshButton).toBeDefined();
  });
});
