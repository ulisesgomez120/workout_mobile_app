import React, { useReducer } from "react";
import { View, Text, Button, TextInput, FlatList, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";

const initialState = {
  timer: 0,
  timer_display: "00:00",
  is_running: false,
  interval_ref: null,
};
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return minutes.toString().padStart(2, 0) + ":" + seconds.toString().padStart(2, 0);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TIMER":
      let timer = action.payload != undefined ? action.payload : state.timer + 1;
      return { ...state, timer: timer };
    case "SET_IS_TIMER_RUNNING":
      return { ...state, is_running: action.payload };
    case "SET_TIMER_DISPLAY":
      return { ...state, timer_display: formatTime(state.timer) };
    case "SET_INTERVAL_REF":
      return { ...state, interval_ref: action.payload };
    default:
      return state;
  }
};

const Timer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { colors } = useTheme();
  const handleTimerToggle = () => {
    if (state.is_running) {
      clearInterval(state.interval_ref);
      dispatch({ type: "SET_TIMER", payload: 0 });
      dispatch({ type: "SET_IS_TIMER_RUNNING", payload: false });
      dispatch({ type: "SET_INTERVAL_REF", payload: null });
      dispatch({ type: "SET_TIMER_DISPLAY" });
    } else {
      dispatch({ type: "SET_IS_TIMER_RUNNING", payload: true });
      startTimer();
    }
  };

  const startTimer = () => {
    const interval_id = setInterval(() => {
      dispatch({ type: "SET_TIMER" });
      dispatch({ type: "SET_TIMER_DISPLAY" });
    }, 1000);
    dispatch({ type: "SET_INTERVAL_REF", payload: interval_id });
  };
  return (
    <View style={{ marginTop: 20, marginBottom: 20 }}>
      <Text style={{ color: colors.text, textAlign: "center", fontSize: 20, paddingBottom: 18 }}>
        {state.timer_display}
      </Text>
      <View style={{ backgroundColor: "rgba(255, 255, 255, .1)", padding: 20 }}>
        <Button title={state.is_running ? "Pause Timer" : "Start Timer"} onPress={handleTimerToggle} />
      </View>
    </View>
  );
};

export default Timer;
