import React, {useState, useEffect} from 'react';
import dayjs from '@/src/libs/day';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/src/types';
import Quote from '@/src/components/Quote';
import {useCalender} from '@/src/hooks/useCalender';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Partner from '@/src/components/Partner';
import {useModal} from '@/src/hooks/useModal';
import CalenderModal from '@/src/components/CalenderModal';

const HomeScreen: React.FC<{}> = () => {
  const [remainingWeekday, setRemainingWeekdays] = useState<number | null>(
    null,
  );
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {retirementDate, setRetirementDate} = useCalender();

  const {showModal} = useModal();
  const onPress = () =>
    showModal(() => <CalenderModal></CalenderModal>, {}, 'upper', 'upper');


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
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>退職まであと</Text>
        </View>
        <TouchableOpacity onPress={onPress} >
          <Text style={styles.remainingWeekDay}>
            {remainingWeekday === null ? 'x' : remainingWeekday}
          </Text>
        </TouchableOpacity>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>日</Text>
        </View>
      </View>
      <View style={styles.quoteContainer}>
        <Quote></Quote>
      </View>
      <View style={styles.partnerContainer}>
        <Partner></Partner>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCF4',
  },
  container: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 25,
  },
  remainingWeekDay: {
  marginTop: 20,
    fontSize: 100,
    lineHeight: 110,
    color: '#000',
    fontWeight: 'bold',
  },
  subTitleContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  subTitle: {
    fontSize: 25,
    lineHeight: 25,
  },
  quoteContainer: {
    width: '80%',
    marginTop: 30,
  },
  partnerContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default HomeScreen;
