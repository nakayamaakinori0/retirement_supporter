import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function RetirementDayScreen() {
  return (
    <View style={styles.container} testID="retirement-container">
      <Image
        testID="hanamaru-image"
        style={styles.image}
        source={require('@/assets/hanamaru.png')}
      />
      <Text style={styles.congratulation}>
        {`
        退職おめでとう！！
        よく頑張りました！！
        `}
      </Text>

      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>
          過去ばかり振り向いていたのではダメだ。自分がこれまで何をして、これまでに誰だったのかを受け止めた上で、それを捨てればいい
        </Text>
        <Text style={styles.author}>by Steve Jobs</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCF4',
  },
  image: {
    width: 120,
    height: 120 * 0.8673,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  congratulation: {
    fontSize: 25,
  },
  quoteContainer: {
    alignItems: 'center',
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  quote: {
    fontSize: 20,
    fontFamily: 'Papyrus'
  },
  author: {
    marginTop: 15,
    fontSize: 15,
    alignSelf: 'flex-end',
    fontFamily: 'Papyrus',
    paddingRight: 6,
  },
});
