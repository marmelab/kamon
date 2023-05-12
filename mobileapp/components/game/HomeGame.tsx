import { GameList } from "./GameList";
import { Button } from "react-native";
import { API_ENDPOINT } from "@env";
import { useContext } from "react";
import { NavigationContext } from "@react-navigation/native";
import { getAccesToken } from "../../util/accessToken";

export const HomeGame = () => {
  const navigation = useContext(NavigationContext);

  const createGame = async () => {
    const accessToken = await getAccesToken();
    const url = new URL("game/create", API_ENDPOINT);
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((r) => r.json())
      .then((game) =>
        navigation.navigate("Game", { itemId: game.id, playable: true }),
      );
  };

  return (
    <>
      <Button title="Play online" onPress={createGame} color="#f24968" />
      <GameList />
    </>
  );
};
