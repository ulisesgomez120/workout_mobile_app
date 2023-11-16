import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { get_programs } from "../controllers/get_programs";

// const programs = get_programs();

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const programs = await get_programs();
      setPrograms(programs);
    };
    fetchPrograms();
  }, []);

  const ClickableItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text style={{ color: "#eee" }}>{item.name}</Text>
      <Text style={{ color: "#eee" }}>{item.id}</Text>
      <Text style={{ color: "#eee" }}>{item.wo_groups[0].name}</Text>
    </View>
  );
  console.log(programs);
  return (
    <FlatList
      data={programs}
      renderItem={({ item }) => <ClickableItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default ProgramList;
