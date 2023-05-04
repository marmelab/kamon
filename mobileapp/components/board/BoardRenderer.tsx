import React from "react";
import { StyleSheet, View } from "react-native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { Board, GameState } from "@kamon/core";
import TileRenderer from "../tile/TileRenderer";
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

type BoardProps = {
  board: Board;
  gameState: GameState;
  play: Function;
};

const BoardRenderer = ({ board, gameState, play }: BoardProps) => {
  const renderTilesFromLine = (line, x) =>
    line.map((tile, y) =>
      tile != null ? (
        <TileRenderer
          key={`${tile.color}_${tile.symbol}`}
          tile={tile}
          coordinates={{ x, y }}
          play={play}
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

  return (
    <ReactNativeZoomableView
      contentHeight={1250}
      contentWidth={1000}
      movementSensibility={1.7}
      bindToBorders={true}
      style={{ backgroundColor: "#112b3c", width: "1000%", minHeight: "1000%" }}
    >
      <View style={styles.container}>{renderTilesFromBoard()}</View>
    </ReactNativeZoomableView>
  );
};

export default BoardRenderer;
