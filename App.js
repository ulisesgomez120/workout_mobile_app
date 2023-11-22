import { StatusBar } from "expo-status-bar";
import { useColorScheme, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// program list should be in a program view component
import ProgramList from "./views/programs";
import Exercises from "./views/exercises";

const Stack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme} style={styles.container}>
      <Stack.Navigator initialRouteName='Programs'>
        <Stack.Screen name='Programs' component={ProgramList} />
        <Stack.Screen name='Exercises' component={Exercises} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    marginTop: StatusBar.currentHeight || 0,
  },
});
