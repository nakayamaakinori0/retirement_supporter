import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function HamburgerButton() {
  return (
    <TouchableOpacity style={styles.hamburgerMenu}>
      {[...Array(3)].map((_, index) => {
        return (
          <View key={`bar_${index}`} style={styles.hamburgerMenuBar}></View>
        );
      })}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hamburgerMenu: {},
  hamburgerMenuBar: {
    width: 30,
    borderBottomWidth: 3,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#acacac',
    marginBottom: 5,
  },
});
