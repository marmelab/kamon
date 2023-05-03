import { Home } from "components/home/Home";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" animated={true} backgroundColor="#f2b807" />
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#112b3c",
    padding: 10,
  },
});
