import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// program list should be in a program view component
import ProgramList from "./views/programs";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ProgramList />
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    marginTop: StatusBar.currentHeight || 0,
  },
});
