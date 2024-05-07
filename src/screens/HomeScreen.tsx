import React, {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import {View, Text, Alert, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import Quote from '../components/Quote';

const HomeScreen: React.FC<{}> = () => {
  const [remainingWeekday, setRemainingWeekdays] = useState<number>(0);
  const retirementDate: string = '2024-06-14';
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const calculateRemainingWeekdays: () => void = () => {
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
      <Text style={styles.title}>退職まであと</Text>
      <Text style={styles.remainingWeekDay}>{remainingWeekday}</Text>
      <Text style={styles.subTitle}>日</Text>
      <Quote></Quote>
      <Button
        title="Go to RetirementDay"
        onPress={() => navigation.navigate('RetirementDay')}></Button>
      <Button
        title="Go to FontStyles"
        onPress={() => navigation.navigate('FontStyles')}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCF4',
  },
  title: {
    marginTop: 50,
    fontSize: 25,
    marginRight: 40,
  },
  remainingWeekDay: {
    fontSize: 100,
    color: '#000',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 25,
    marginLeft: 120,
    marginTop: -10,
  },
});

export default HomeScreen;
