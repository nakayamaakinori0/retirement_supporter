import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Balloon from '@/src/components/Balloon';
import {Animated} from 'react-native';
import {partnerEncourageTexts} from '@/src/config';

function Partner({showEncourage}: {showEncourage: boolean}) {

  const dogImages = [
    require('@/assets/101_dog/101_dog1.png'),
    require('@/assets/101_dog/101_dog2.png'),
    require('@/assets/101_dog/101_dog3.png'),
    require('@/assets/101_dog/101_dog4.png'),
    require('@/assets/101_dog/101_dog5.png'),
  ];

  const [currentImage, setCurrentImage] = useState(dogImages[0]);
  const imageIndexRef = useRef(0);
  const frameCountRef = useRef(0);
  const timerRef = useRef(0);

  // 切り替え間隔を設定（値を大きくすると遅くなる）
  const FRAME_DELAY = 12; // 約12フレーム（約200ms）ごとに切り替え→60fps / 12 = 5fps

  useEffect(() => {
    const switchImage = () => {
      frameCountRef.current += 1;

      // フレームカウントが遅延値に達したら画像を切り替え
      if (frameCountRef.current >= FRAME_DELAY) {
        frameCountRef.current = 0;
        imageIndexRef.current = (imageIndexRef.current + 1) % dogImages.length;
        setCurrentImage(dogImages[imageIndexRef.current]);
      }

      timerRef.current = requestAnimationFrame(switchImage);
    };

    timerRef.current = requestAnimationFrame(switchImage);

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [dogImages]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showEncourage) {
      setIsVisible(true);
      Animated.timing(fadeAnim, {
        toValue: showEncourage ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(finished => {
        if (finished) {
          setIsVisible(false);
        }
      });
    }
  }, [showEncourage, fadeAnim]);

  const encourageText = useMemo(() => {
    return partnerEncourageTexts[
      Math.floor(Math.random() * partnerEncourageTexts.length)
    ];
  }, [isVisible]);

  return (
    <View style={styles.container}>
      {isVisible && (
        <Animated.View
          style={{
            flex: 1,
            padding: 50,
            opacity: fadeAnim,
            ...styles.encourageWrapper,
          }}>
          <Balloon
            style={{
              backgroundColor: '#E4CCFF',
              shadowSize: 4,
              shadowColor: '#000',
              borderWidth: 2,
              borderColor: '#ba7eff',
              pickSize: 35,
              pickRadius: 15,
              pickThin: 0.5,
              pickLeft: 190,
            }}>
            <Text style={{fontSize: 20}}>{encourageText}</Text>
          </Balloon>
        </Animated.View>
      )}
      <View style={styles.partnerContainer}>
        <Image style={styles.partnerImage} source={currentImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    position: 'relative',
  },
  encourageWrapper: {
    position: 'absolute',
    top: -280,
    left: -210,
    zIndex: 100,
  },
  encourageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#E4CCFF',
    width: 250,
    height: 130,
    borderRadius: 10,
  },
  encourageText: {},
  partnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerImage: {
    resizeMode: 'contain',
  },
});

export default Partner;
