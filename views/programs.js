import React from "react";
import { View, Text, FlatList } from "react-native";

const programs = [
  { id: 1, name: "Beginner Program" },
  { id: 2, name: "Intermediate Program" },
  { id: 3, name: "Advanced Program" },
];

const ProgramList = () => {
  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text style={{ color: "#eee" }}>{item.name}</Text>
    </View>
  );

  return <FlatList data={programs} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />;
};

export default ProgramList;
