import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

function Partner() {
  return (
    <View>
      <Text>Partner</Text>
      <Image
        // style={styles.image}
        source={require('../../assets/test.gif')}></Image>
    </View>
  );
}

export default Partner;
