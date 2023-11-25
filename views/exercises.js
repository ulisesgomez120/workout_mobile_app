import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from "react-native";

const Exercises = ({ navigation, route }) => {
  const { exercises } = route.params;
  const WorkoutItem = ({ item }) => {
    return (
      <Pressable
        style={styles.workoutItemContainer}
        key={item.id}
        onPress={() => {
          navigation.navigate("Exercise", { exercise: item, name: item.name });
        }}>
        <Text style={styles.workoutItemName}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={exercises}
      renderItem={({ item }) => <WorkoutItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  workoutItemContainer: {
    padding: 13,
  },
  workoutItemName: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Exercises;
