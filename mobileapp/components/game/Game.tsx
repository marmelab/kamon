import { useState, useEffect } from "react";
import { View, ActivityIndicator, Button, Text } from "react-native";
import { API_ENDPOINT } from "@env";
import { Board, GameState } from "@kamon/core";
import BoardRenderer from "../board/BoardRenderer";

type Game = { gameState: GameState; board: Board };

export const Game = ({ route, navigation }) => {
  const { itemId, playerStatus = "spectator", ...otherParams } = route.params;

  const [game, setGame] = useState<Game>();

  const fetchGameData = () => {
    const API_HOST = API_ENDPOINT;
    const url = new URL(`/game/${itemId}`, API_HOST);
    fetch(url)
      .then((r) => r.json())
      .then((games) => setGame(games));
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

  return <BoardRenderer board={game.board} gameState={game.gameState} />;
};
