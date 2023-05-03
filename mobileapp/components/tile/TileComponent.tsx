import React from "react";
import { StyleSheet, View } from "react-native";
import { Tile, TileCoordinate } from "@kamon/core";
import Hexagon from "components/hexagon/Hexagon";
import { FontAwesome5 } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 0,
    position: "relative",
    justifyContent: "center",
  },
  icon: {
    color: "white",
    elevation: 1,
    width: 50,
    height: 50,
    position: "absolute",
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
  A: <FontAwesome5 size={ICONS_SIZE} style={styles.icon} name="ghost" />,
  B: <FontAwesome5 size={ICONS_SIZE} style={styles.icon} name="dragon" />,
  C: <FontAwesome5 size={ICONS_SIZE} style={styles.icon} name="dice" />,
  D: <FontAwesome5 size={ICONS_SIZE} style={styles.icon} name="book-dead" />,
  E: <FontAwesome5 size={ICONS_SIZE} style={styles.icon} name="hat-wizard" />,
  F: <FontAwesome5 size={ICONS_SIZE} style={styles.icon} name="gamepad" />,
  O: <FontAwesome5 size={ICONS_SIZE} style={styles.icon} name="gamepad" />,
};

type tileProps = {
  tile: Tile;
  coordinates: TileCoordinate;
};

const TileComponent = (props: tileProps) => {
  const { tile, coordinates } = props;

  return (
    <View style={styles.container}>
      {COMPONENTS_FOR_SYMBOLS[tile.symbol]}
      <Hexagon color={`${COLOR_PALETTE[tile.color]}`} />
    </View>
  );
};

export default TileComponent;
