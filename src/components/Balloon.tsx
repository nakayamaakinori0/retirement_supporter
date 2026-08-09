import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface BalloonStyle {
  backgroundColor?: string;
  shadowSize?: number;
  shadowColor?: string;
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  pickSize?: number;
  pickRadius?: number;
  pickThin?: number;
  pickLeft?: number;
}

interface BalloonProps {
  children: ReactNode;
  style?: BalloonStyle;
  testID?: string;
}

const Balloon: React.FC<BalloonProps> = ({ children, style = {}, testID }) => {
  // デフォルト値を設定
  const backgroundColor = style.backgroundColor || '#f0f0d0';
  const shadowSize = style.shadowSize || 4;
  const shadowColor = style.shadowColor || '#000';
  const borderWidth = style.borderWidth || 2;
  const borderColor = style.borderColor || 'red';
  const borderRadius = style.borderRadius || 10;
  const pickSize = style.pickSize || 20;
  const pickRadius = style.pickRadius || 10;
  const pickThin = style.pickThin || 0.5;
  const pickLeft = style.pickLeft || 10;

  const styles = StyleSheet.create({
    balloonContainer: {
      backgroundColor: backgroundColor,
      width: 270,
      height: 200,
      borderWidth: borderWidth,
      borderColor: borderColor,
      borderRadius: borderRadius,
      position: 'absolute',
      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: shadowSize,
      },
      shadowOpacity: 0.8,
      shadowRadius: shadowSize,
      elevation: shadowSize, // Android用
    },

    balloon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    pointer: {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      left: pickLeft,
      borderTopColor: 'transparent',
      borderRightColor: backgroundColor,
      borderBottomColor: backgroundColor,
      borderLeftColor: 'transparent',
      bottom: -pickSize + 1,
      borderWidth: pickSize,
      borderRadius: pickRadius,
      transform: [{ scaleX: pickThin }, { rotate: '45deg' }],
      zIndex: 1,
    },

    pointerBorder: {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderTopColor: 'transparent',
      borderRightColor: borderColor,
      borderBottomColor: borderColor,
      borderLeftColor: 'transparent',
      bottom: -(pickSize + borderWidth * 2),
      left: pickLeft - borderWidth * 2,
      borderWidth: pickSize + borderWidth * 2,
      borderRadius: pickRadius,
      shadowColor: shadowColor,
      shadowOffset: {
        width: shadowSize * 1.2,
        height: shadowSize * 1.2,
      },
      shadowOpacity: 0.8,
      shadowRadius: shadowSize,
      elevation: shadowSize, // Android用
      transform: [{ scaleX: pickThin }, { rotate: '45deg' }],
    },
  });

  return (
    <View style={styles.balloonContainer} testID={testID}>
      <View style={styles.balloon}>
        <View>{children}</View>
      </View>
      <View style={styles.pointer} />
      <View style={styles.pointerBorder} />
    </View>
  );
};

export default Balloon;