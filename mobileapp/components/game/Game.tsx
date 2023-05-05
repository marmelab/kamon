import { useState, useEffect } from "react";
import { View, ActivityIndicator, Button, Text } from "react-native";
import { API_ENDPOINT } from "@env";
import {
  Board,
  GameState,
  TileCoordinate,
  findTileByCoordinate,
  updateGame,
} from "@kamon/core";
import EventSource from "react-native-sse";
import BoardRenderer from "../board/BoardRenderer";
import { HUD } from "../HUD/HUD";
import { useRoute } from "@react-navigation/native";

type Game = { gameState: GameState; board: Board };

export const Game = () => {
  const route = useRoute();

  const [game, setGame] = useState<Game>();

  const [playable, setPlayable] = useState(route.params.playable);

  const gameId =
    route != null && route.params != null ? route.params.itemId : "";

  const fetchGameData = async () => {
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
    const SseUrl = new URL("sse_game_resfresh", API_ENDPOINT);
    const eventSource = new EventSource(SseUrl, {
      headers: {
        Cookie: `gameId=${gameId}`,
      },
    });

    eventSource.addEventListener("message", (event) => {
      fetchGameData();
    });

    if (game == null) {
      fetchGameData();
    }

    return () => {
      eventSource.removeAllEventListeners();
      eventSource.close();
    };
  }, []);

  const play = ({ x, y }: TileCoordinate) => {
    if (!playable) {
      return;
    }
    const tile = findTileByCoordinate(game.board, { x, y });
    const { gameState, board } = updateGame(game.board, game.gameState, tile);

    setGame({ gameState, board });

    if (gameState.winner || gameState.isDraw) {
      setPlayable(false);
    }
  };

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
      <BoardRenderer
        board={game.board}
        gameState={game.gameState}
        play={play}
      />
      <HUD gameState={game.gameState} />
    </>
  );
};