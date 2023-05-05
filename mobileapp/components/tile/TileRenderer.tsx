import React from "react";
import { StyleSheet, View } from "react-native";
import { Tile, TileCoordinate } from "@kamon/core";
import Hexagon from "../shapes/Hexagon";
import { Svg, Circle } from "react-native-svg";
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
  blue: "#1E83F9",
  yellow: "#f2b807",
  magenta: "#9b72f2",
  grey: "grey",
};

const COMPONENTS_FOR_SYMBOLS = {
  A: <Ghost />,
  B: <Dragon />,
  C: <Dice />,
  D: <Book />,
  E: <Hat />,
  F: <GamePad />,
  O: <View></View>,
};

type TileProps = {
  tile: Tile;
  coordinates: TileCoordinate;
};

const TileRenderer = ({ tile, coordinates }: TileProps) => {
  const PLAYER_COLORS = {
    white: "white",
    black: "#2B1E06",
  };

  return (
    <View style={styles.container}>
      <Hexagon colorFill={`${COLOR_PALETTE[tile.color]}`} />
      {COMPONENTS_FOR_SYMBOLS[tile.symbol]}
      {/* {tile.playedBy != null && (
        <Hexagon
          style={{ position: "absolute" }}
          colorFill={`black`}
          opacity={"0.2"}
        />
      )} */}
      {tile.playedBy && (
        <Hexagon
          style={{ position: "absolute" }}
          colorFill="none"
          height="105%"
          width="105%"
          colorStroke={PLAYER_COLORS[tile.playedBy]}
          strokeWidth="19"
          viewBox="-2 0 98 100"
          opacity="1"
        />
      )}
      {tile.lastPlayed && tile.playedBy && (
        <Hexagon
          style={{ position: "absolute" }}
          colorFill="none"
          height="105%"
          width="105%"
          colorStroke={"yellow"}
          strokeWidth="13"
          viewBox="-12 0 120 100"
          opacity="1"
        />
      )}
    </View>
  );
};

export default TileRenderer;
