import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {useCalender} from '@/src/hooks/useCalender';
import dayjs from '@/src/libs/day';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalenderModal() {
  const {retirementDate, setRetirementDate} = useCalender();
  const now = dayjs();
  return (
    <View style={styles.calenderModal}>
      <Calendar
        style={styles.calender}
        onDayPress={(day: DateData) => {
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
    width: Dimensions.get('window').width,
    height: 450,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  calender: {
    backgroundColor: '#F5FCF4',
    width: 350,
    borderRadius: 10,
    position: 'absolute',
    top: -150,
    left: -175,
  },
});
