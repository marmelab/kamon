import BoardRenderer from "./components/board/BoardRenderer";
import { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Font from "expo-font";

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

export default function App() {
  const MOCK_BOARD = [
    [
      null,
      null,
      null,
      {
        symbol: "B",
        color: "cyan",
      },
      {
        symbol: "A",
        color: "green",
      },
      {
        symbol: "D",
        color: "cyan",
      },
      {
        symbol: "A",
        color: "red",
      },
      null,
      null,
      null,
    ],
    [
      null,
      null,
      {
        symbol: "E",
        color: "magenta",
      },
      {
        symbol: "F",
        color: "blue",
      },
      {
        symbol: "C",
        color: "green",
      },
      {
        symbol: "E",
        color: "green",
        playedBy: "black",
        lastPlayed: false,
      },
      {
        symbol: "D",
        color: "green",
        playedBy: "black",
        lastPlayed: true,
      },
      null,
      null,
    ],
    [
      null,
      {
        symbol: "C",
        color: "cyan",
      },
      {
        symbol: "D",
        color: "blue",
      },
      {
        symbol: "C",
        color: "yellow",
      },
      {
        symbol: "B",
        color: "yellow",
        playedBy: "black",
        lastPlayed: false,
      },
      {
        symbol: "B",
        color: "blue",
      },
      {
        symbol: "A",
        color: "cyan",
      },
      null,
    ],
    [
      {
        symbol: "D",
        color: "red",
      },
      {
        symbol: "F",
        color: "cyan",
      },
      {
        symbol: "B",
        color: "red",
      },
      {
        symbol: "C",
        color: "magenta",
        playedBy: "black",
        lastPlayed: false,
      },
      {
        symbol: "E",
        color: "yellow",
      },
      {
        symbol: "O",
        color: "grey",
        playedBy: null,
        lastPlayed: false,
      },
      {
        symbol: "A",
        color: "yellow",
      },
    ],
    [
      null,
      {
        symbol: "F",
        color: "yellow",
      },
      {
        symbol: "E",
        color: "red",
      },
      {
        symbol: "E",
        color: "blue",
        playedBy: "black",
        lastPlayed: false,
      },
      {
        symbol: "F",
        color: "green",
      },
      {
        symbol: "D",
        color: "yellow",
      },
      {
        symbol: "F",
        color: "magenta",
      },
      null,
    ],
    [
      null,
      null,
      {
        symbol: "A",
        color: "blue",
        playedBy: "black",
        lastPlayed: false,
      },
      {
        symbol: "D",
        color: "magenta",
        playedBy: "black",
        lastPlayed: false,
      },
      {
        symbol: "A",
        color: "magenta",
      },
      {
        symbol: "B",
        color: "magenta",
      },
      {
        symbol: "B",
        color: "green",
      },
      null,
      null,
    ],
    [
      null,
      null,
      null,
      {
        symbol: "C",
        color: "blue",
      },
      {
        symbol: "E",
        color: "cyan",
      },
      {
        symbol: "F",
        color: "red",
      },
      {
        symbol: "C",
        color: "red",
      },
      null,
      null,
      null,
    ],
  ];

  const [appIsReady, setAppIsReady] = useState(false);

  // Load any resources or data that you need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const fontAssets = cacheFonts([FontAwesome5.font]);

        await Promise.all([...fontAssets]);
      } catch (e) {
        // You might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      <BoardRenderer board={MOCK_BOARD} gameState={undefined} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    backgroundColor: "#112b3c",
    alignItems: "center",
    justifyContent: "center",
  },
});
