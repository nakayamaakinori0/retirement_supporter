import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useModal} from '@/src/hooks/useModal';
import CalenderModal from '@/src/components/CalenderModal';

export default function HamburgerButton() {
  const {showModal} = useModal();
  const onPress = () =>
    showModal(() => <CalenderModal></CalenderModal>, {}, 'upper', 'upper');
  return (
    <TouchableOpacity onPress={onPress} style={styles.hamburgerMenu}>
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
