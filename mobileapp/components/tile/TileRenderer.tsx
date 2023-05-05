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
  blue: "#6929f2",
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
    black: "black",
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
      <Hexagon
        colorFill={`${COLOR_PALETTE[tile.color]}`}
        opacity={tile.playedBy != null ? "0.5" : "1"}
      />
      {tile.playedBy && (
        <Hexagon
          style={{ position: "absolute" }}
          colorFill="none"
          height="100%"
          width="100%"
          colorStroke={PLAYER_COLORS[tile.playedBy]}
          strokeWidth="18"
          dashed={true}
          opacity="1"
        />
      )}
      {COMPONENTS_FOR_SYMBOLS[tile.symbol]}
      {tile.lastPlayed && tile.playedBy && (
        <Svg style={{ position: "absolute" }} height="100%" width="100%">
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
            stroke="black"
            strokeWidth={3}
            cx={"25%"}
            cy={"25%"}
            r={20}
          />
        </Svg>
      )}
    </View>
  );
};

export default TileRenderer;
