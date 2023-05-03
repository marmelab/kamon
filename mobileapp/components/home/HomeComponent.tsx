import React from "react";
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

const GAMES = [
  {
    id: 2,
    board: [
      [
        null,
        null,
        null,
        {
          color: "green",
          symbol: "D",
          moveAllowed: false,
        },
        {
          color: "red",
          symbol: "D",
          moveAllowed: true,
        },
        {
          color: "cyan",
          symbol: "F",
          moveAllowed: true,
        },
        {
          color: "green",
          symbol: "A",
          moveAllowed: false,
        },
        null,
        null,
        null,
      ],
      [
        null,
        null,
        {
          color: "magenta",
          symbol: "C",
          moveAllowed: true,
        },
        {
          color: "yellow",
          symbol: "D",
          moveAllowed: false,
        },
        {
          color: "blue",
          symbol: "E",
          moveAllowed: false,
        },
        {
          color: "magenta",
          symbol: "E",
          moveAllowed: false,
        },
        {
          color: "yellow",
          symbol: "A",
          moveAllowed: true,
        },
        null,
        null,
      ],
      [
        null,
        {
          color: "blue",
          symbol: "C",
          moveAllowed: true,
        },
        {
          color: "yellow",
          symbol: "B",
          moveAllowed: false,
        },
        {
          color: "magenta",
          symbol: "D",
          moveAllowed: false,
        },
        {
          color: "red",
          symbol: "F",
          moveAllowed: false,
        },
        {
          color: "cyan",
          symbol: "D",
          moveAllowed: false,
        },
        {
          color: "red",
          symbol: "B",
          moveAllowed: true,
        },
        null,
      ],
      [
        {
          color: "yellow",
          symbol: "C",
          moveAllowed: false,
        },
        {
          color: "magenta",
          symbol: "B",
          moveAllowed: false,
        },
        {
          color: "green",
          symbol: "F",
          moveAllowed: false,
        },
        {
          color: "magenta",
          symbol: "F",
          moveAllowed: false,
        },
        {
          color: "red",
          symbol: "C",
          moveAllowed: false,
        },
        {
          color: "green",
          symbol: "E",
          moveAllowed: false,
        },
        {
          color: "red",
          symbol: "E",
          moveAllowed: false,
        },
      ],
      [
        null,
        {
          color: "blue",
          symbol: "A",
          moveAllowed: true,
        },
        {
          color: "cyan",
          symbol: "A",
          moveAllowed: false,
        },
        {
          color: "cyan",
          symbol: "B",
          moveAllowed: false,
        },
        {
          color: "yellow",
          symbol: "E",
          moveAllowed: false,
        },
        {
          color: "blue",
          symbol: "F",
          moveAllowed: false,
        },
        {
          color: "grey",
          symbol: "O",
          playedBy: null,
          lastPlayed: false,
        },
      ],
      [
        null,
        null,
        {
          color: "green",
          symbol: "B",
          moveAllowed: true,
        },
        {
          color: "cyan",
          symbol: "C",
          moveAllowed: false,
        },
        {
          color: "blue",
          symbol: "B",
          moveAllowed: false,
        },
        {
          color: "magenta",
          symbol: "A",
          moveAllowed: false,
        },
        {
          color: "green",
          symbol: "C",
          moveAllowed: true,
        },
      ],
      [
        null,
        null,
        null,
        {
          color: "cyan",
          symbol: "E",
          moveAllowed: false,
        },
        {
          color: "red",
          symbol: "A",
          moveAllowed: true,
        },
        {
          color: "blue",
          symbol: "D",
          moveAllowed: true,
        },
        {
          color: "yellow",
          symbol: "F",
          moveAllowed: false,
        },
      ],
    ],
    gameState: {
      isDraw: false,
      winner: null,
      message: "Welcome to Kamon 🍱 ! Black player, you turn",
      isRunning: true,
      turnNumber: 0,
      currentPlayer: "black",
      remainingTiles: {
        black: 18,
        white: 18,
      },
    },
  },
  {
    id: 1,
    board: [
      [
        null,
        null,
        null,
        {
          color: "green",
          symbol: "D",
          moveAllowed: false,
        },
        {
          color: "red",
          symbol: "D",
          moveAllowed: true,
        },
        {
          color: "cyan",
          symbol: "F",
          moveAllowed: true,
        },
        {
          color: "green",
          symbol: "A",
          moveAllowed: false,
        },
        null,
        null,
        null,
      ],
      [
        null,
        null,
        {
          color: "magenta",
          symbol: "C",
          moveAllowed: true,
        },
        {
          color: "yellow",
          symbol: "D",
          moveAllowed: false,
        },
        {
          color: "blue",
          symbol: "E",
          moveAllowed: false,
        },
        {
          color: "magenta",
          symbol: "E",
          moveAllowed: false,
        },
        {
          color: "yellow",
          symbol: "A",
          moveAllowed: true,
        },
        null,
        null,
      ],
      [
        null,
        {
          color: "blue",
          symbol: "C",
          moveAllowed: true,
        },
        {
          color: "yellow",
          symbol: "B",
          moveAllowed: false,
        },
        {
          color: "magenta",
          symbol: "D",
          moveAllowed: false,
        },
        {
          color: "red",
          symbol: "F",
          moveAllowed: false,
        },
        {
          color: "cyan",
          symbol: "D",
          moveAllowed: false,
        },
        {
          color: "red",
          symbol: "B",
          moveAllowed: true,
        },
        null,
      ],
      [
        {
          color: "yellow",
          symbol: "C",
          moveAllowed: false,
        },
        {
          color: "magenta",
          symbol: "B",
          moveAllowed: false,
        },
        {
          color: "green",
          symbol: "F",
          moveAllowed: false,
        },
        {
          color: "magenta",
          symbol: "F",
          moveAllowed: false,
        },
        {
          color: "red",
          symbol: "C",
          moveAllowed: false,
        },
        {
          color: "green",
          symbol: "E",
          moveAllowed: false,
        },
        {
          color: "red",
          symbol: "E",
          moveAllowed: false,
        },
      ],
      [
        null,
        {
          color: "blue",
          symbol: "A",
          moveAllowed: true,
        },
        {
          color: "cyan",
          symbol: "A",
          moveAllowed: false,
        },
        {
          color: "cyan",
          symbol: "B",
          moveAllowed: false,
        },
        {
          color: "yellow",
          symbol: "E",
          moveAllowed: false,
        },
        {
          color: "blue",
          symbol: "F",
          moveAllowed: false,
        },
        {
          color: "grey",
          symbol: "O",
          playedBy: null,
          lastPlayed: false,
        },
      ],
      [
        null,
        null,
        {
          color: "green",
          symbol: "B",
          moveAllowed: true,
        },
        {
          color: "cyan",
          symbol: "C",
          moveAllowed: false,
        },
        {
          color: "blue",
          symbol: "B",
          moveAllowed: false,
        },
        {
          color: "magenta",
          symbol: "A",
          moveAllowed: false,
        },
        {
          color: "green",
          symbol: "C",
          moveAllowed: true,
        },
      ],
      [
        null,
        null,
        null,
        {
          color: "cyan",
          symbol: "E",
          moveAllowed: false,
        },
        {
          color: "red",
          symbol: "A",
          moveAllowed: true,
        },
        {
          color: "blue",
          symbol: "D",
          moveAllowed: true,
        },
        {
          color: "yellow",
          symbol: "F",
          moveAllowed: false,
        },
      ],
    ],
    gameState: {
      isDraw: false,
      winner: null,
      message: "Welcome to Kamon 🍱 ! Black player, you turn",
      isRunning: false,
      turnNumber: 0,
      currentPlayer: "black",
      remainingTiles: {
        black: 18,
        white: 18,
      },
    },
  },
];

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
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={GAMES}
        renderItem={({ item }) => <Item id={item.id} />}
        keyExtractor={(item) => item.id}
      />
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
