import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from "react-native";

const Exercises = ({ navigation, route }) => {
  const { exercise } = route.params;
  // console.log("wo_group_id", wo_group_id);
  // const wo = JSON.parse(workouts);
  // console.log("workouts", typeof wo);
  // console.log(exercise);
  const WorkoutItem = ({ item }) => {
    // console.log("item", item);
    return (
      <View style={styles.workoutItemContainer}>
        <Text style={styles.workoutItemName}>{item.name}</Text>
      </View>
    );
  };

  return (
    <FlatList data={exercise} renderItem={({ item }) => <WorkoutItem item={item} />} keyExtractor={(item) => item.id} />
    // <Text>Workouts</Text>
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
