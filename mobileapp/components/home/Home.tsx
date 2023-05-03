import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { GameList } from "./GameList";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Wecome to Kamon</Text>
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
