import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import mobileAds from 'react-native-google-mobile-ads';

let initialization: Promise<void> | undefined;

/**
 * 広告SDKを初期化する。何度呼んでも初回の結果を使い回す。
 *
 * iOS では IDFA へアクセスする前に App Tracking Transparency の同意を
 * 求める必要がある。同意を得られなくても広告は表示できる（非パーソナライズ
 * 広告になる）ため、結果によらず初期化まで進める。
 *
 * 初期化に失敗しても、広告が出ないだけでアプリの機能には影響しない。
 * そのため例外は投げず、ログに残すだけにする。
 */
export const initializeAds = (): Promise<void> => {
  if (initialization) return initialization;

  initialization = (async () => {
    try {
      // ATT のプロンプトは初期化より前に出す必要がある
      await requestTrackingPermissionsAsync();
      await mobileAds().initialize();
    } catch (error) {
      console.error('広告の初期化に失敗しました:', error);
    }
  })();

  return initialization;
};

/** テスト用。初期化済みの状態をリセットする */
export const resetAdsInitializationForTest = () => {
  initialization = undefined;
};
