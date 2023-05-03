import React from "react";
import { StyleSheet, View } from "react-native";
import { Tile, TileCoordinate } from "@kamon/core";
import Hexagon from "../shapes/Hexagon";
import { Svg, Circle, Path, G } from "react-native-svg";
import GamePad from "../shapes/Gamepad";
import Dragon from "../shapes/Dragon";
import Ghost from "../shapes/Ghost";
import Book from "../shapes/Book";
import Dice from "../shapes/Dice";
import Hat from "../shapes/Hat";

const styles = StyleSheet.create({
  container: {
    flex: 0,
    position: "relative",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    width: 50,
    height: 50,
    color: "white",
    elevation: 10,
    top: 0,
  },
  lastPlayedIndicator: {
    position: "absolute",
    height: 10,
    width: 10,
  },
});

const COLOR_PALETTE = {
  cyan: "#96d2d9",
  green: "#14d990",
  red: "#f24968",
  blue: "#6929f2",
  yellow: "#f2b807",
  magenta: "#9b72f2",
  grey: "grey",
};

const ICONS_SIZE = 20;

const COMPONENTS_FOR_SYMBOLS = {
  A: <Ghost />,
  B: <Dragon />,
  C: <Dice />,
  D: <Book />,
  E: <Hat />,
  F: <GamePad />,
  O: <View></View>,
};

type tileProps = {
  tile: Tile;
  coordinates: TileCoordinate;
};

const TileRenderer = (props: tileProps) => {
  const { tile, coordinates } = props;

  const PLAYER_COLORS = {
    white: "white",
    black: "black",
  };

  return (
    <View style={styles.container}>
      <Hexagon color={`${COLOR_PALETTE[tile.color]}`} />
      {COMPONENTS_FOR_SYMBOLS[tile.symbol]}
      {tile.lastPlayed && tile.playedBy && (
        <Svg style={{ position: "absolute" }} height={"100%"} width={"100%"}>
          <Circle
            fill="yellow"
            stroke="black"
            strokeWidth={3}
            cx={"25%"}
            cy={"25%"}
            r={10}
          />
        </Svg>
      )}
    </View>
  );
};

export default TileRenderer;
