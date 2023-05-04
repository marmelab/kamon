import { useState, useEffect } from "react";
import { View, ActivityIndicator, Button, Text } from "react-native";
import { API_ENDPOINT } from "@env";
import { Board, GameState } from "@kamon/core";
import BoardRenderer from "../board/BoardRenderer";
import { HUD } from "../HUD/HUD";
import { useRoute } from "@react-navigation/native";

type Game = { gameState: GameState; board: Board };

export const Game = () => {
  const route = useRoute();

  const [game, setGame] = useState<Game>();

  const gameId =
    route != null && route.params != null ? route.params.itemId : "";

  const fetchGameData = () => {
    const url = new URL(`/game/${gameId}`, API_ENDPOINT);
    fetch(url)
      .then((r) => r.json())
      .then((game) => {
        setGame(game.game);
      });
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  if (game == null) {
    return (
      <View
        testID="loader"
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (game.board == null || game.gameState == null) {
    return (
      <View
        testID="refreshButton"
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Couldn't fetch data. Please check your connection.</Text>
        <Button title="Refresh" color="#f24968" onPress={fetchGameData} />
      </View>
    );
  }

  return (
    <>
      <BoardRenderer board={game.board} gameState={game.gameState} />
      <HUD gameState={game.gameState} />
    </>
  );
};
