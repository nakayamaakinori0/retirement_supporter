import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useCalender} from '../hooks/useCalender';
import dayjs from '../libs/day';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalenderModal() {
  const {retirementDate, setRetirementDate} = useCalender();
  const now = dayjs();
  return (
    <View style={styles.calenderModal}>
      <Calendar
        style={styles.calender}
        onDayPress={day => {
          if (now.isBefore(dayjs(day.dateString))) {
            setRetirementDate(day.dateString);
            AsyncStorage.setItem('retirementDate', day.dateString);
          }
        }}
        markedDates={{
          [retirementDate ? retirementDate?.toString() : '']: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'orange',
          },
        }}></Calendar>
    </View>
  );
}

const styles = StyleSheet.create({
  calenderModal: {
    backgroundColor: '#F5FCF4',
    width: 350,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  calender: {
    backgroundColor: '#F5FCF4',
    width: 300,
    borderRadius: 10,
    position: 'absolute',
    top: -180,
    left: -150,
  },
});
