import { useState, useEffect } from "react";
import { View, ActivityIndicator, Button, Text } from "react-native";
import { API_ENDPOINT } from "@env";
import { Board, GameState } from "@kamon/core";
import BoardRenderer from "../board/BoardRenderer";
import { HUD } from "../HUD/HUD";

type Game = { gameState: GameState; board: Board };

export const Game = ({ route, navigation }) => {
  const { itemId, playerStatus = "spectator", ...otherParams } = route.params;

  const [game, setGame] = useState<Game>();

  const fetchGameData = () => {
    const url = new URL(`/game/${itemId}`, API_ENDPOINT);
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (game.board == null || game.gameState == null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
