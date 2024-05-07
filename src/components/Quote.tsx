import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {QuoteType} from '../types';

export default function Quote() {
  const [quote, setQuote] = useState<QuoteType>();
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  const func = async () => {
    const response = await fetch(
      'https://meigen.doodlenote.net/api/json.php?c=1&e=1',
    );
    const data = await response.json();
    console.log('### data', data[0]);
    setQuote(data[0]);
  };
  useEffect(() => {
    func();
  }, []);
  return (
    <View style={styles.container}>
      <Button title="Reload" onPress={() => func()}></Button>
      <Text style={styles.meigen}>{quote?.meigen}</Text>
      <Text style={styles.auther}>{`by ${quote?.auther}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: 30, width: 300},
  meigen: {fontSize: 20, fontFamily: 'Papyrus'},
  auther: {
    marginTop: 10,
    fontSize: 15,
    textAlign: 'right',
    fontFamily: 'Papyrus',
  },
});
