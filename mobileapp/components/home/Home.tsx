import { Button, StyleSheet, View } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import React from "react";
import { Login } from "../user/Login";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
});
