import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { GameList } from "./GameList";

export const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
