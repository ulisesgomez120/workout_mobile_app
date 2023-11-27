import React, { useEffect } from "react";
import { View, Text, Button, TextInput, FlatList, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";

const ExerciseHistory = ({ history }) => {
  console.log("history 5", history);
  const { colors } = useTheme();
  const grouped_by_date = history.reduce((acc, cur) => {
    (acc[cur.date] = acc[cur.date] || []).push(cur);
    return acc;
  }, {});

  const sortedByDate = Object.entries(grouped_by_date).sort((a, b) => new Date(b[0]) - new Date(a[0]));
  return (
    <View>
      {sortedByDate.map(([date, items]) => (
        <View key={date}>
          <Text style={{ color: colors.text }}>{date}</Text>
          {items.map((item) => (
            <Text key={item.id} style={{ color: colors.text }}>
              {item.reps} x {item.weight} -- {item.type} - {item.notes}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

export default ExerciseHistory;
