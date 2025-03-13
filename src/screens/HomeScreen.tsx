import React, {useState, useEffect} from 'react';
import dayjs from '../libs/day';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import Quote from '../components/Quote';
import {useCalender} from '../hooks/useCalender';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Partner from '../components/Partner';

const HomeScreen: React.FC<{}> = () => {
  const [remainingWeekday, setRemainingWeekdays] = useState<number | null>(
    null,
  );
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {retirementDate, setRetirementDate} = useCalender();

  // deviceStorageの中に保存されている退職日を取り出して設定する;
  useEffect(() => {
    const func = async () => {
      const testRetirementDate = await AsyncStorage.getItem('retirementDate');
      if (testRetirementDate) {
        setRetirementDate(testRetirementDate);
      }
    };
    func();
  }, []);

  // 退職日から現在の日時と比較して残り何営業日か算出して設定する
  useEffect(() => {
    const calculateRemainingWeekdays = (): void => {
      if (retirementDate === null) return;
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
  }, [retirementDate]);

  // 0日になったらretirementDateにredirectする
  useEffect(() => {
    if (retirementDate !== null && remainingWeekday === 0) {
      navigation.navigate('RetirementDay');
    }
  }, [remainingWeekday]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>退職まであと</Text>
      <Text style={styles.remainingWeekDay}>
        {remainingWeekday === null ? 'x' : remainingWeekday}
      </Text>
      <Text style={styles.subTitle}>日</Text>
      <Quote></Quote>
      <View style={styles.partnerContainer}>
        <Partner></Partner>
      </View>
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
  partnerContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default HomeScreen;
