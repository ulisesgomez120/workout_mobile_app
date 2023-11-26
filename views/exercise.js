import React, { useReducer } from "react";
import { View, Text, Button, TextInput, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";

const initialState = {
  // timer: 0,
  // timerDisplay: "00:00",
  // isTimerRunning: false,
  weight: "",
  reps: "",
  rpe: "",
  altName: "",
  notes: "",
  // workoutHistory: [],
};
// const formatTime = (time) => {
//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;
//   return minutes.toString().padStart(2, 0) + ":" + seconds.toString().padStart(2, 0);
// };
const reducer = (state, action) => {
  switch (action.type) {
    // case "SET_TIMER":
    //   return { ...state, timer: state.timer + 1 };
    // case "SET_IS_TIMER_RUNNING":
    //   return { ...state, isTimerRunning: action.payload };
    case "SET_WEIGHT":
      return { ...state, weight: action.payload };
    case "SET_REPS":
      return { ...state, reps: action.payload };
    case "SET_RPE":
      return { ...state, rpe: action.payload };
    case "SET_ALT_NAME":
      return { ...state, altName: action.payload };
    case "SET_NOTES":
      return { ...state, notes: action.payload };
    // case "SET_WORKOUT_HISTORY":
    //   return { ...state, workoutHistory: action.payload };
    // case "SET_TIMER_DISPLAY":
    //   return { ...state, timerDisplay: formatTime(state.timer) };
    default:
      return state;
  }
};

const ExercisePage = ({ navigation, route }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { colors } = useTheme();
  const { exercise } = route.params;

  // const handleTimerToggle = () => {
  //   if (state.isTimerRunning) {
  //     dispatch({ type: "SET_TIMER", payload: 0 });
  //     dispatch({ type: "SET_TIMER_DISPLAY", payload: "00:00" });
  //     dispatch({ type: "SET_IS_TIMER_RUNNING", payload: false });
  //   } else {
  //     dispatch({ type: "SET_IS_TIMER_RUNNING", payload: true });
  //     startTimer();
  //   }
  // };

  // const startTimer = () => {
  //   setInterval(() => {
  //     dispatch({ type: "SET_TIMER" });
  //     dispatch({ type: "SET_TIMER_DISPLAY" });
  //   }, 1000);
  // };

  const handleFormSubmit = () => {
    const workout = {
      weight: state.weight,
      reps: state.reps,
      rpe: state.rpe,
      altName: state.altName,
      notes: state.notes,
      date: new Date().toLocaleDateString(),
    };
    // dispatch((prevState) => ({ type: "SET_WORKOUT_HISTORY", payload: [...prevState.workoutHistory, workout] }));
    dispatch({ type: "SET_WEIGHT", payload: "" });
    dispatch({ type: "SET_REPS", payload: "" });
    dispatch({ type: "SET_RPE", payload: "" });
    dispatch({ type: "SET_ALT_NAME", payload: "" });
    dispatch({ type: "SET_NOTES", payload: "" });
  };

  // const renderWorkoutItem = ({ item }) => (
  //   <View>
  //     <Text>Date: {item.date}</Text>
  //     <Text>Weight: {item.weight}</Text>
  //     <Text>Reps: {item.reps}</Text>
  //     <Text>RPE: {item.rpe}</Text>
  //     <Text>Alternate Name: {item.altName}</Text>
  //     <Text>Notes: {item.notes}</Text>
  //   </View>
  // );

  return (
    <View>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ padding: 20 }}>
            <Text style={{ color: colors.text, textAlign: "center", fontSize: 16 }}>Sets</Text>
            <Text style={{ color: colors.text, textAlign: "center", fontSize: 23 }}>{exercise.sets}</Text>
          </View>
          <View style={{ padding: 20 }}>
            <Text style={{ color: colors.text, textAlign: "center", fontSize: 16 }}>Reps</Text>
            <Text style={{ color: colors.text, textAlign: "center", fontSize: 23 }}>{exercise.reps}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ padding: 20 }}>
            <Text style={{ color: colors.text, textAlign: "center", fontSize: 16 }}>RPE</Text>
            <Text style={{ color: colors.text, textAlign: "center", fontSize: 23 }}>{exercise.rpe}</Text>
          </View>
          <View style={{ padding: 20 }}>
            <Text style={{ color: colors.text, textAlign: "center", fontSize: 16 }}>Rest</Text>
            <Text style={{ color: colors.text, textAlign: "center", fontSize: 23 }}>{exercise.rest}</Text>
          </View>
        </View>
      </View>
      {/* <View>
        <View style={{ backgroundColor: "rgba(255, 255, 255, .1)", padding: 20 }}>
          <Button title={state.isTimerRunning ? "Pause Timer" : "Start Timer"} onPress={handleTimerToggle} />
        </View>
        <Text style={{ color: colors.text }}>{state.timerDisplay}</Text>
      </View> */}
      <View>
        <TextInput
          style={styles.workoutInput}
          inputMode='numeric'
          placeholder='Weight'
          value={state.weight}
          onChangeText={(text) => dispatch({ type: "SET_WEIGHT", payload: text })}
        />
        <TextInput
          style={styles.workoutInput}
          inputMode='numeric'
          placeholder='Reps'
          value={state.reps}
          onChangeText={(text) => dispatch({ type: "SET_REPS", payload: text })}
        />
        <TextInput
          style={styles.workoutInput}
          inputMode='numeric'
          placeholder='RPE'
          value={state.rpe}
          onChangeText={(text) => dispatch({ type: "SET_RPE", payload: text })}
        />
        <TextInput
          style={styles.workoutInput}
          placeholder='Alternate Name'
          value={state.altName}
          onChangeText={(text) => dispatch({ type: "SET_ALT_NAME", payload: text })}
        />
        <TextInput
          style={{ ...styles.workoutInput, ...styles.textArea }}
          value={state.notes}
          multiline
          numberOfLines={4}
          onChangeText={(text) => dispatch({ type: "SET_NOTES", payload: text })}
        />
        <View style={{ backgroundColor: "rgba(255, 255, 255, .1)", padding: 20 }}>
          <Button title='Submit' onPress={handleFormSubmit} />
        </View>
      </View>
      {/* <View>
        <FlatList
          data={state.workoutHistory}
          renderItem={renderWorkoutItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View> */}
    </View>
  );
};

export default ExercisePage;

const styles = {
  workoutInput: {
    backgroundColor: "rgba(255, 255, 255, .1)",
    color: "#fff",
    padding: 20,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
};
