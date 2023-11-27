import React, { useReducer, useEffect } from "react";
import { View, Text, Button, TextInput, FlatList, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { add_completed_exercise } from "../controllers/set_exercise";
import { get_history } from "../controllers/get_exercise_history";
import ExerciseHistory from "./components/exercise_history";
import Timer from "./components/timer";

const initialState = {
  weight: "0",
  reps: "0",
  rpe: "0",
  alt_name: "",
  notes: "",
  workout_history: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WEIGHT":
      return { ...state, weight: action.payload };
    case "SET_REPS":
      return { ...state, reps: action.payload };
    case "SET_RPE":
      return { ...state, rpe: action.payload };
    case "SET_ALT_NAME":
      return { ...state, alt_name: action.payload };
    case "SET_NOTES":
      return { ...state, notes: action.payload };
    case "SET_WORKOUT_HISTORY":
      return { ...state, workout_history: [...action.payload, ...state.workout_history] };
    default:
      return state;
  }
};

const ExercisePage = ({ navigation, route }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { colors } = useTheme();
  const { exercise } = route.params;
  useEffect(() => {
    const fetchHistory = async () => {
      const history = await get_history(exercise.id);
      dispatch({ type: "SET_WORKOUT_HISTORY", payload: history });
    };
    fetchHistory();
  }, []);

  const handleFormSubmit = () => {
    const date = new Date();
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = `${date.toLocaleDateString("en-US", options)} - ${date.toLocaleDateString("en-US", {
      weekday: "long",
    })}`;
    const workout = {
      weight: state.weight,
      reps: state.reps,
      rpe: state.rpe,
      alt_name: state.alt_name,
      notes: state.notes.trim(),
      type: "working",
      workout_id: exercise.id,
      date: formattedDate,
    };
    add_completed_exercise(workout);
    dispatch({ type: "SET_WORKOUT_HISTORY", payload: [workout] });
    dispatch({ type: "SET_WEIGHT", payload: "" });
    dispatch({ type: "SET_REPS", payload: "" });
    dispatch({ type: "SET_RPE", payload: "" });
    dispatch({ type: "SET_ALT_NAME", payload: "" });
    dispatch({ type: "SET_NOTES", payload: "" });
  };

  return (
    <ScrollView>
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
      <Timer />
      <View>
        <Text style={{ color: colors.text, ...styles.label }}>Weight:</Text>
        <TextInput
          style={styles.workoutInput}
          inputMode='numeric'
          placeholder='Weight'
          selectTextOnFocus={true}
          value={state.weight}
          onChangeText={(text) => dispatch({ type: "SET_WEIGHT", payload: text })}
        />
        <Text style={{ color: colors.text, ...styles.label }}>Reps:</Text>
        <TextInput
          style={styles.workoutInput}
          inputMode='numeric'
          selectTextOnFocus={true}
          placeholder='Reps'
          value={state.reps}
          onChangeText={(text) => dispatch({ type: "SET_REPS", payload: text })}
        />
        <Text style={{ color: colors.text, ...styles.label }}>RPE:</Text>
        <TextInput
          style={styles.workoutInput}
          inputMode='numeric'
          selectTextOnFocus={true}
          placeholder='RPE'
          value={state.rpe}
          onChangeText={(text) => dispatch({ type: "SET_RPE", payload: text })}
        />
        <Text style={{ color: colors.text, ...styles.label }}>Alt Exercise Name:</Text>
        <TextInput
          style={styles.workoutInput}
          placeholder='Alternate Name'
          value={state.alt_name}
          onChangeText={(text) => dispatch({ type: "SET_ALT_NAME", payload: text })}
        />
        <Text style={{ color: colors.text, ...styles.label }}>Notes:</Text>
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
      <ExerciseHistory history={state.workout_history} />
    </ScrollView>
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
  label: {
    marginBottom: 5,
  },
};
