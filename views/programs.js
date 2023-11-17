import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { get_programs } from "../controllers/get_programs";

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const programs = await get_programs();
      setPrograms(programs);
    };
    fetchPrograms();
  }, []);

  const ProgramItem = ({ item, clickable_children }) => (
    <View style={styles.programItemContainer}>
      <Text style={styles.programItemName}>{item.name}</Text>
      {item.wo_groups && item.wo_groups.length > 0 && (
        <View style={styles.woGroupsContiner}>
          {item.wo_groups.map((child, index) => {
            if (clickable_children) {
              return (
                <Text
                  key={index}
                  style={styles.woGroupText}
                  onPress={() => {
                    console.log("navigate to wo_group", child.id);
                  }}>
                  {child.name}
                </Text>
              );
            } else {
              return (
                <Text key={index} style={styles.woGroupText}>
                  {child.name}
                </Text>
              );
            }
          })}
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={programs}
      renderItem={({ item }) => <ProgramItem item={item} clickable_children={true} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  programItemContainer: {
    padding: 13,
  },
  programItemName: {
    color: "#eee",
    fontSize: 28,
    fontWeight: "bold",
  },
  woGroupsContiner: {
    marginLeft: 20,
  },
  woGroupText: {
    color: "#eee",
    fontSize: 22,
    marginTop: 28,
    borderWidth: 0.1, // sets the width of the border
    borderColor: "#fff", // sets the color of the border
    borderRadius: 5,
    shadowColor: "#fff", // sets the color of the shadow
    shadowOffset: { width: 0, height: 2 }, // sets the offset of the shadow
    shadowOpacity: 0.5, // increase this to make the shadow more visible
    shadowRadius: 15, // increase this to make the shadow fuzzier
    padding: 10, // add some padding around the text
  },
});

export default ProgramList;
