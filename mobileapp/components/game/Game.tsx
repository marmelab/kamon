import { useState, useEffect } from "react";
import { View, ActivityIndicator, Button, Text, Alert } from "react-native";
import { API_ENDPOINT } from "@env";
import { Board, GameState, TileCoordinate } from "@kamon/core";
import EventSource from "react-native-sse";
import BoardRenderer from "../board/BoardRenderer";
import { HUD } from "../HUD/HUD";
import { useRoute } from "@react-navigation/native";
import { getAccesToken } from "../../util/accessToken";

type Game = { gameState: GameState; board: Board };

export const Game = () => {
  const route = useRoute();

  const [game, setGame] = useState<Game>();

  const [playable, setPlayable] = useState(route.params.playable);

  const gameId =
    route != null && route.params != null ? route.params.itemId : "";

  const fetchGameData = async () => {
    const url = new URL(`/game/${gameId}`, API_ENDPOINT);
    const accessToken = await getAccesToken();

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data?.game) {
          setGame({ board: data.game.board, gameState: data.game.gameState });
        } else {
          setGame({ board: null, gameState: null });
        }
        setPlayable(data.playable);
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

  const play = async ({ x, y }: TileCoordinate) => {
    if (!playable) {
      return;
    }

    const accessToken = await getAccesToken();

    const url = new URL(`/game/${gameId}`, API_ENDPOINT);
    const response = await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        played: `${x}-${y}`,
      }),
    });

    const data = await response.json();
    if (response.status !== 201) {
      Alert.alert(data.error);
      return;
    }

    setGame({ gameState: data.gameState, board: data.board });
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
