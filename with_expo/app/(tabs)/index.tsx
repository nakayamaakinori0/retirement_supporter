import React, { useState, useEffect, useContext } from "react";
import dayjs from "../../src/libs/day";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Quote from "../../src/components/Quote";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Partner from "../../src/components/Partner";
import { useModal } from "../../src/hooks/useModal";
import CalenderModal from "../../src/components/CalenderModal";
import { RetirementDateContext } from "../../src/components/RetirementDateProvider";
import { DateData } from "react-native-calendars";

export default function HomeScreen() {
  const [remainingWeekday, setRemainingWeekdays] = useState<number | null>(
    null
  );
  const { retirementDate, setRetirementDate } = useContext(
    RetirementDateContext
  );

  const { showModal } = useModal();
  const now = dayjs();
  const today = now.format("YYYY-MM-DD");
  const handleOnDayPress = (day: DateData) => {
    setRetirementDate(day.dateString);
    AsyncStorage.setItem("retirementDate", day.dateString);
  };
  const handleOpenCalender = () =>
    showModal(
      () => (
        <CalenderModal
          onDayPress={handleOnDayPress}
          selectedDate={retirementDate}
          minDate={today}
        />
      ),
      {},
      "upper",
      "upper"
    );

  const [showEncourage, setShowEncourage] = useState<boolean>(false);

  // deviceStorageの中に保存されている退職日を取り出して設定する
  useEffect(() => {
    const func = async () => {
      const testRetirementDate = await AsyncStorage.getItem("retirementDate");
      if (testRetirementDate) {
        setRetirementDate(testRetirementDate);
      }
    };
    func();
  }, [setRetirementDate]);

  // 退職日から現在の日時と比較して残り何営業日か算出して設定する
  useEffect(() => {
    const calculateRemainingWeekdays = (): void => {
      if (retirementDate === null) return;
      let currentDate: dayjs.Dayjs = dayjs();
      const endDate: dayjs.Dayjs = dayjs(retirementDate);
      let count: number = 0;
      while (currentDate.isSameOrBefore(endDate, "day")) {
        if (currentDate.isoWeekday() !== 6 && currentDate.isoWeekday() !== 7) {
          count++;
        }
        currentDate = currentDate.add(1, "day");
      }
      setRemainingWeekdays(count);
    };
    calculateRemainingWeekdays();
  }, [retirementDate]);

  // 0日になったらretirementDateにredirectする
  useEffect(() => {
    if (retirementDate !== null && remainingWeekday === 0) {
      router.push("/retirement-day");
    }
  }, [remainingWeekday, retirementDate]);

  const handleShowEncouragement = () => {
    if (showEncourage) return;
    setShowEncourage(true);
    setTimeout(() => setShowEncourage(false), 2000);
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>退職まであと</Text>
        </View>
        <TouchableOpacity onPress={handleOpenCalender}>
          <Text style={styles.remainingWeekDay}>
            {remainingWeekday === null ? "x" : remainingWeekday}
          </Text>
        </TouchableOpacity>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>日</Text>
        </View>
      </View>
      <View style={styles.quoteContainer}>
        <Quote />
      </View>
      <View style={styles.partnerContainer}>
        <TouchableOpacity onPress={handleShowEncouragement}>
          <Partner showEncourage={showEncourage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCF4",
  },
  container: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
  },
  titleContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 25,
  },
  remainingWeekDay: {
    marginTop: 20,
    fontSize: 100,
    lineHeight: 110,
    color: "#000",
    fontWeight: "bold",
  },
  subTitleContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  subTitle: {
    fontSize: 25,
    lineHeight: 25,
  },
  quoteContainer: {
    width: "80%",
    marginTop: 30,
  },
  partnerContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
