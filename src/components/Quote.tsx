import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {QuoteType} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from '../libs/day';

export default function Quote() {
  const [quote, setQuote] = useState<QuoteType>();

  const fetchQuotes = async () => {
    const now = dayjs().format('YYYY-MM-DD');
    const quoteGotDate = dayjs(
      await AsyncStorage.getItem('quoteGotDate'),
    ).format('YYYY-MM-DD');
    if (now === quoteGotDate) {
      const storedQuote = await AsyncStorage.getItem('quote');
      if (storedQuote !== null) {
        setQuote(JSON.parse(storedQuote));
        return;
      }
    }
    const response = await fetch(
      'https://meigen.doodlenote.net/api/json.php?c=1&e=1',
    );
    const data = await response.json();
    setQuote(data[0]);
    AsyncStorage.setItem('quoteGotDate', dayjs().format());
    AsyncStorage.setItem('quote', JSON.stringify(data[0]));
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <View>
      <Text style={styles.quote}>{quote?.meigen}</Text>
      <Text style={styles.author}>{`by ${quote?.auther}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  quote: {fontSize: 20, fontFamily: 'Papyrus'},
  author: {
    marginTop: 25,
    fontSize: 15,
    alignSelf: 'flex-end',
    fontFamily: 'Papyrus',
    paddingRight: 6,
  },
});
