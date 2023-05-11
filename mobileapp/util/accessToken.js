import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";

export const storeAccessToken = async (token) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
};

export const getAccesToken = async () => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};
