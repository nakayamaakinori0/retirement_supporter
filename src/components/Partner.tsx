import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';

function Partner() {
  const dogImages = useMemo(
    () => [
    require('@/assets/101_dog/101_dog1.png'),
    require('@/assets/101_dog/101_dog2.png'),
    require('@/assets/101_dog/101_dog3.png'),
    require('@/assets/101_dog/101_dog4.png'),
    require('@/assets/101_dog/101_dog5.png'),
    ],
    [],
  );

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

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={currentImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
});

export default Partner;
