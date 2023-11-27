import React, { useEffect } from "react";
import { View, Text, Button, TextInput, FlatList, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";

const ExerciseHistory = ({ history }) => {
  const { colors } = useTheme();
  const grouped_by_date = history.reduce((acc, cur) => {
    (acc[cur.date] = acc[cur.date] || []).push(cur);
    return acc;
  }, {});

  const sorted_by_date = Object.entries(grouped_by_date).sort((a, b) => new Date(b[0]) - new Date(a[0]));
  return (
    <View>
      {sorted_by_date.map(([date, items]) => (
        <View key={date} style={styles.workout_item_container}>
          <Text style={{ color: colors.text, ...styles.exercise_date }}>{date}</Text>
          {items.map((item) => (
            <Text key={item.id} style={{ color: colors.text, ...styles.exercise }}>
              {item.weight} x {item.reps} -- {item.type} - {item.notes}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

export default ExerciseHistory;

const styles = {
  workout_item_container: {
    padding: 13,
  },
  exercise_date: {
    fontSize: 24,
    paddingBottom: 10,
  },
  exercise: {
    fontSize: 20,
    paddingBottom: 6,
    paddingLeft: 8,
  },
};
