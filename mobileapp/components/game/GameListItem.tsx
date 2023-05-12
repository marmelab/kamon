import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import React from "react";

type ItemProps = { id: number };

export const GameListItem = ({ id }: ItemProps) => {
  const navigation = React.useContext(NavigationContext);
  return (
    <View style={styles.item}>
      <Text style={styles.title}>Game n°{id}</Text>
      <View>
        <Button
          title="Play"
          color="#14d990"
          onPress={() =>
            navigation.navigate("Game", { itemId: id, playable: true })
          }
        />
        <Button
          title="Watch"
          color="#f24968"
          onPress={() =>
            navigation.navigate("Game", { itemId: id, playable: false })
          }
        />
      </View>
    </View>
  );
};

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
