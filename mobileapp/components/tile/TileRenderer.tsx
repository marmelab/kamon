import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
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

type play = (coordinates: TileCoordinate) => void;

type TileProps = {
  tile: Tile;
  coordinates: TileCoordinate;
  play: play;
};

const TileRenderer = ({ tile, coordinates, play }: TileProps) => {
  const PLAYER_COLORS = {
    white: "white",
    black: "#2B1E06",
  };

  const BORDERS_INDICATORS_STYLES_FOR_COORDINATES = {
    "0": {
      "4": {
        containerStyle: {
          position: "absolute",
          top: "-33%",
          right: "-75%",
        },
        indicatorColor: "#14d990",
      },
    },
    "1": {
      "2": {
        containerStyle: {
          position: "absolute",
          top: "33%",
          left: "-66%",
        },
        indicatorColor: "#f2b807",
      },
      "6": {
        containerStyle: {
          position: "absolute",
          bottom: "-33%",
          right: "-105%",
        },
        indicatorColor: "#9b72f2",
      },
    },
    "2": {},
    "3": {},
    "4": {
      "1": {
        containerStyle: {
          position: "absolute",
          bottom: "-95%",
          left: "-10%",
        },
        indicatorColor: "#9b72f2",
      },
      "6": {
        containerStyle: {
          position: "absolute",
          bottom: "-100%",
          right: "-66%",
        },
        indicatorColor: "#f2b807",
      },
    },
    "5": {},
    "6": {
      "4": {
        containerStyle: {
          position: "absolute",
          bottom: "-85%",
          right: "-75%",
        },
        indicatorColor: "#14d990",
      },
    },
  };

  const borderIndicatorStyle =
    BORDERS_INDICATORS_STYLES_FOR_COORDINATES[coordinates.x][coordinates.y];

  return (
    <View style={styles.container}>
      <Pressable onPress={() => play(coordinates)}>
        <Hexagon colorFill={`${COLOR_PALETTE[tile.color]}`} />
        {COMPONENTS_FOR_SYMBOLS[tile.symbol]}
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
        {borderIndicatorStyle && (
          <Svg
            style={[
              { position: "absolute" },
              borderIndicatorStyle.containerStyle,
            ]}
            height="100%"
            width="100%"
          >
            <Circle
              fill={borderIndicatorStyle.indicatorColor}
              stroke="white"
              strokeWidth={1}
              cx={"25%"}
              cy={"25%"}
              r={20}
            />
          </Svg>
        )}
      </Pressable>
    </View>
  );
};

export default TileRenderer;
