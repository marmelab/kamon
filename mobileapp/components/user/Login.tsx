import { Alert, Button } from "react-native";
import { useContext, useState } from "react";
import { NavigationContext } from "@react-navigation/native";
import { API_ENDPOINT } from "@env";
import { UserForm } from "./UserForm";
import { storeAccessToken } from "../../util/accessToken";

export const Login = () => {
  const navigation = useContext(NavigationContext);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const login = () => {
    const url = new URL("/login", API_ENDPOINT);
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
        if (response.statusCode === 404 || response.statusCode === 401) {
          Alert.alert("Invalid credentials");
        }

        if (response.access_token) {
          storeAccessToken(response.access_token);
          navigation.navigate("HomeGame");
        }
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
      <Button title="Login" onPress={login} />

      <Button
        title="No account ? Register here"
        onPress={() => navigation.navigate("Register")}
        color="#f24968"
      />
    </>
  );
};
