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
        if (game?.game) {
          setGame(game.game);
        } else {
          setGame({ board: null, gameState: null });
        }
      })
      .catch((error) => {
        setGame({ board: null, gameState: null });
      });
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  if (game == null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator accessibilityRole="progressbar" size="large" />
      </View>
    );
  }

  if (game.board == null || game.gameState == null) {
    return (
      <View
        accessibilityRole="button"
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
