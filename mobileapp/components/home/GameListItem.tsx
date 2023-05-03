import { Alert, Button, StyleSheet, Text, View } from "react-native";

type ItemProps = { id: number; navigation: any };

export const GameListItem = ({ id, navigation }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>Game n°{id}</Text>
    <View>
      <Button
        title="Play"
        color="#14d990"
        onPress={() => navigation.navigate("Game")}
      />
      <Button
        title="Watch"
        color="#f24968"
        onPress={() => Alert.alert(`Watch game ${id}: in progress`)}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#96d2d9",
    padding: 10,
    marginVertical: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontSize: 20,
  },
});
