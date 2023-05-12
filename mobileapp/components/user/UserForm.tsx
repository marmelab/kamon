import { StyleSheet, TextInput, View } from "react-native";

export const UserForm = ({ username, setUsername, password, setPassword }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        textContentType="nickname"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        textContentType="password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
