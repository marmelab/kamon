import React from "react";
import { StyleSheet, View } from "react-native";
import { Board, GameState } from "@kamon/core";
import TileComponent from "components/tile/TileComponent";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  lineContainer: {
    flex: 0,
    marginBottom: -15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nullableTile: {
    width: "1",
  },
});

type boardProps = {
  board: Board;
  gameState: GameState;
};

const BoardComponent = (props: boardProps) => {
  const { board = [], gameState = {} } = props;

  const renderTilesFromLine = (line, x) =>
    line.map((tile, y) =>
      tile != null ? (
        <TileComponent
          key={`${tile.color}_${tile.symbol}`}
          tile={tile}
          coordinates={{ x, y }}
        />
      ) : (
        <View key={`nullTile_${x}_${y}`}></View>
      ),
    );
  const renderTilesFromBoard = () =>
    board.map((line, x) => (
      <View key={`line_${x}`} style={styles.lineContainer}>
        {renderTilesFromLine(line, x)}
      </View>
    ));

  return <View style={styles.container}>{renderTilesFromBoard()}</View>;
};

export default BoardComponent;
