import { Alert, Button } from "react-native";
import { useContext, useState } from "react";
import { NavigationContext } from "@react-navigation/native";
import { API_ENDPOINT } from "@env";
import { UserForm } from "./UserForm";

export const Register = () => {
  const navigation = useContext(NavigationContext);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const register = () => {
    const url = new URL("/register", API_ENDPOINT);
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => r.json())
      .then((response) => {
        console.log(response);
        if (response.error) {
          Alert.alert(response.error);
          return;
        }

        navigation.navigate("Home");
      })
      .catch((error) => Alert.alert(error));
  };

  return (
    <>
      <UserForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <Button title="Register" onPress={register} />
    </>
  );
};
