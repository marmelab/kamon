import React from "react";
import { StyleSheet } from "react-native";
import { Tile, TileCoordinate } from "@kamon/core";
import Hexagon from "components/hexagon/Hexagon";

const COLOR_PALETTE = {
  cyan: "#96d2d9",
  green: "#14d990",
  red: "#f24968",
  blue: "#6929f2",
  yellow: "#f2b807",
  magenta: "#9b72f2",
  grey: "grey",
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});

type tileProps = {
  tile: Tile;
  coordinates: TileCoordinate;
};

const TileComponent = (props: tileProps) => {
  const { tile, coordinates } = props;

  return <Hexagon color={`${COLOR_PALETTE[tile.color]}`} />;
};

export default TileComponent;
