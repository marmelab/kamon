import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  Alert,
} from "react-native";

import { API_ENDPOINT } from "@env";

type ItemProps = { id: number };

const Item = ({ id }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>Game n°{id}</Text>
    <Button
      title="Watch"
      color="#f24968"
      onPress={() => Alert.alert(`Watch game ${id}: in progress`)}
    />
  </View>
);

const List = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const url = new URL("/game/ongoing", API_ENDPOINT);
    fetch(url)
      .then((r) => r.json())
      .then((games) => setGames(games));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {games && (
        <FlatList
          data={games}
          renderItem={({ item }) => <Item id={item.id} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
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

export default List;
