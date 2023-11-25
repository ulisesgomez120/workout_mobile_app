import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { get_programs } from "../controllers/get_programs";

const ProgramList = ({ navigation }) => {
  const [programs, setPrograms] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    const fetchPrograms = async () => {
      const programs = await get_programs();
      setPrograms(programs);
    };
    fetchPrograms();
  }, []);

  const ProgramItem = ({ item }) => (
    <View style={styles.programItemContainer}>
      <Text style={{ color: colors.text, ...styles.programItemName }}>{item.name}</Text>
      {item.wo_groups && item.wo_groups.length > 0 && (
        <View style={styles.woGroupsContiner}>
          {item.wo_groups.map((group, index) => {
            const workouts = JSON.parse(group.workouts);
            return (
              <>
                <Text key={item.name + group.name} style={{ color: colors.text, ...styles.woGroupText }}>
                  {group.name}
                </Text>
                {workouts.length > 0 && (
                  <View style={styles.woGroupsContiner}>
                    {workouts.map((wo, index) => {
                      return (
                        <Pressable
                          key={wo.group + item.name + group.name}
                          onPress={() => {
                            navigation.navigate("Exercises", { exercises: wo.exercise });
                          }}>
                          <Text style={{ color: colors.text, ...styles.woGroupText }}>{wo.group}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </>
            );
          })}
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={programs}
      renderItem={({ item }) => <ProgramItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  programItemContainer: {
    padding: 13,
  },
  programItemName: {
    fontSize: 28,
    fontWeight: "bold",
  },
  woGroupsContiner: {
    marginLeft: 12,
  },
  woGroupText: {
    fontSize: 25,
    marginTop: 12,
    borderWidth: 0.1, // sets the width of the border
    // borderColor: "#fff", // sets the color of the border
    borderRadius: 5,
    // shadowColor: "#fff", // sets the color of the shadow
    // shadowOffset: { width: 0, height: 2 }, // sets the offset of the shadow
    // shadowOpacity: 0.5, // increase this to make the shadow more visible
    // shadowRadius: 15, // increase this to make the shadow fuzzier
    padding: 10, // add some padding around the text
  },
  clickable: {
    fontSize: 22,
    marginTop: 15,
    marginLeft: 15,
    padding: 14,
  },
});

export default ProgramList;
