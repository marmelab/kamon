import { Button, StyleSheet, View } from "react-native";
import { GameList } from "./GameList";
import { API_ENDPOINT } from "@env";

export const Home = ({ navigation }) => {
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
      <Button title="Play online" onPress={createGame} />
      <GameList navigation={navigation} />
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
