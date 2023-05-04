import { GameState } from "@kamon/core/dist";
import Hexagon from "../shapes/Hexagon";
import { View, StyleSheet, Text } from "react-native";
import { Ellipse, G, Path, Svg } from "react-native-svg";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
    bottom: 0,
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    height: "15%",
    width: "100%",
  },
  playersBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 5,
  },
  playerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    maxWidth: "25%",
    marginRight: "10%",
  },
  remainingTiles: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  remainingTilesText: {
    position: "absolute",
    right: 24,
    top: 13,
    height: "100%",
  },
  remainingTilesHexagon: { position: "absolute", right: 0 },
  turnCounter: {},
  messageContainer: {},
});

type hudProps = {
  gameState: GameState;
};

export const HUD = (props: hudProps) => {
  const { gameState } = props;

  const PLAYER_COLORS = {
    black: "black",
    white: "grey",
    playing: "yellow",
    not_playing: "grey",
  };

  const generatePlayerBlock = (playerName) => {
    const isCurrentPlayer = gameState.currentPlayer === playerName;

    return (
      <View style={styles.playerContainer}>
        <Svg height="100%" width={"100%"}>
          <G scale="0.5">
            <Ellipse
              fill={PLAYER_COLORS[playerName]}
              cx="30.336"
              cy="12.097"
              rx="11.997"
              ry="12.097"
            />
            <Path
              fill={PLAYER_COLORS[playerName]}
              d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9    C48.354,35.818,42.661,30.079,35.64,30.079z"
            />
          </G>
        </Svg>
        <View style={styles.remainingTiles}>
          <Hexagon
            style={styles.remainingTilesHexagon}
            height="50"
            width="50"
            scale="0.2"
            colorFill={
              PLAYER_COLORS[isCurrentPlayer ? "playing" : "not_playing"]
            }
          />
          <Text style={styles.remainingTilesText}>
            {gameState.remainingTiles.black}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.playersBlock}>
        {generatePlayerBlock("black")}
        {generatePlayerBlock("white")}
      </View>
      <View style={styles.turnCounter}>
        <Text>Turn n° {gameState.turnNumber}</Text>
      </View>
      <View style={styles.messageContainer}>
        <Text>{gameState.message}</Text>
      </View>
    </View>
  );
};
