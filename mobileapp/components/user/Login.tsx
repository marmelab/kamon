import { Alert, Button } from "react-native";
import { useState } from "react";
import { API_ENDPOINT } from "@env";
import { UserForm } from "./UserForm";
import { getAccesToken, storeAccessToken } from "../../util/accessToken";

export const Login = () => {
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
        console.log("response", response);
        if (response.statusCode === 404 || response.statusCode === 401) {
          Alert.alert("Invalid credentials");
        }

        if (response.access_token) {
          storeAccessToken(response.access_token);
        }
      })
      .catch((error) => Alert.alert(error));
  };

  const log = async () => {
    console.log(await getAccesToken());
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

      <Button title="Log secure store" onPress={log} />
    </>
  );
};
