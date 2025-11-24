import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';

// Common fonts available across platforms
const commonFonts = [
  'System Font (Default)', // Default system font
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Arial',
  'Courier New',
  'Verdana',
  'Trebuchet MS',
  'Impact',
  'Comic Sans MS',
  'Palatino',
  'Bookman',
  'Helvetica Neue',
  'American Typewriter',
  'Avenir',
  'Baskerville',
  'Cochin',
  'Copperplate',
  'Futura',
  'Gill Sans',
  'Hoefler Text',
  'Marker Felt',
  'Optima',
  'Papyrus',
  'Times',
  'Zapfino',
];

export default function FontStylesScreen() {
  return (
    <ScrollView
      testID="font-scroll-view"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {commonFonts.map((fontName, index) => (
        <Text
          key={index}
          style={[
            styles.text,
            fontName !== 'System Font (Default)' ? { fontFamily: fontName } : {}
          ]}>
          {fontName}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCF4',
  },
  contentContainer: {
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});
