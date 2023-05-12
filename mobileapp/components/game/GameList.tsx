import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { API_ENDPOINT } from "@env";
import { GameListItem } from "./GameListItem";
import { getAccesToken } from "../../util/accessToken";
import { NavigationContext } from "@react-navigation/native";

export const GameList = () => {
  const navigation = useContext(NavigationContext);
  const [games, setGames] = useState(null);

  const fetchGame = async () => {
    const url = new URL("/game/ongoing", API_ENDPOINT);
    const accessToken = await getAccesToken();
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((r) => r.json())
      .then((games) => setGames(games));

    return () => {
      setGames(null);
    };
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchGame();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {games == null && <ActivityIndicator size="large" />}
      {games && (
        <FlatList
          data={games}
          renderItem={({ item }) => <GameListItem id={item.id} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
