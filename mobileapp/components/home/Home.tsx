import { Button, StyleSheet, View } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import React from "react";
import { GameList } from "./GameList";
import { API_ENDPOINT } from "@env";
import { Login } from "../user/Login";

export const Home = () => {
  const navigation = React.useContext(NavigationContext);

  const createGame = () => {
    const url = new URL("game/create", API_ENDPOINT);
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((game) =>
        navigation.navigate("Game", { itemId: game.id, playable: true }),
      );
  };

  return (
    <View style={styles.container}>
      <Login />
      <Button title="Play online" onPress={createGame} color="#f24968" />
      <GameList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
});
