import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

interface CalenderModalProps {
  onDayPress: (day: DateData) => void;
  selectedDate: string;
  minDate?: string;
}

export default function CalenderModal({
  onDayPress,
  selectedDate,
  minDate,
}: CalenderModalProps) {
  const [localSelectedDate, setLocalSelectedDate] = useState(selectedDate);

  const handleDayPress = (day: DateData) => {
    setLocalSelectedDate(day.dateString);
    onDayPress(day);
  };

  return (
    <View style={styles.calenderModal}>
      <Calendar
        style={styles.calender}
        onDayPress={handleDayPress}
        minDate={minDate}
        disableAllTouchEventsForDisabledDays={true}
        markedDates={{
          [localSelectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: "orange",
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calenderModal: {
    backgroundColor: "#F5FCF4",
    width: Dimensions.get("window").width,
    height: 450,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  calender: {
    backgroundColor: "#F5FCF4",
    width: 350,
    borderRadius: 10,
    position: "absolute",
    top: -150,
    left: -175,
  },
});
