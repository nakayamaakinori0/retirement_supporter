import React, {useState, useEffect} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [remainingWeekday, setRemainingWeekdays] = useState<number>(0);
  const retirementDate: string = '2024-05-31';

  useEffect(() => {
    const calculateRemainingWeekdays = (): void => {
      let currentDate: dayjs.Dayjs = dayjs();
      const endDate: dayjs.Dayjs = dayjs(retirementDate);
      let count: number = 0;
      while (currentDate.isSameOrBefore(endDate, 'day')) {
        if (currentDate.isoWeekday() !== 6 && currentDate.isoWeekday() !== 7) {
          count++;
        }
        currentDate = currentDate.add(1, 'day');
      }
      setRemainingWeekdays(count);
    };
    calculateRemainingWeekdays();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>退職までの営業日数</Text>
      <Text style={styles.remainingWeekDay}>{remainingWeekday}</Text>
      <Text style={styles.retirementDate}>退職日: {retirementDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCF4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  remainingWeekDay: {
    fontSize: 30,
    backgroundColor: '#FFF',
    color: '#000',
  },
  retirementDate: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default App;
