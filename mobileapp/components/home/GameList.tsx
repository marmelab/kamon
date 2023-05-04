import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, StatusBar } from "react-native";
import { API_ENDPOINT } from "@env";
import { GameListItem } from "./GameListItem";

export const GameList = ({ navigation }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const url = new URL("/game/ongoing", API_ENDPOINT);
    fetch(url)
      .then((r) => r.json())
      .then((games) => setGames(games));
  }, []);

  return (
    <View style={styles.container}>
      {games && (
        <FlatList
          data={games}
          renderItem={({ item }) => (
            <GameListItem id={item.id} navigation={navigation} />
          )}
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
