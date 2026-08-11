import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import mobileAds from 'react-native-google-mobile-ads';

/**
 * 広告SDKを初期化する。
 *
 * iOS では IDFA へアクセスする前に App Tracking Transparency の同意を
 * 求める必要がある。同意を得られなくても広告は表示できる（非パーソナライズ
 * 広告になる）ため、結果によらず初期化まで進める。
 *
 * 初期化に失敗しても、広告が出ないだけでアプリの機能には影響しない。
 * そのため例外は投げず、ログに残すだけにする。
 */
export const initializeAds = async (): Promise<void> => {
  try {
    // ATT のプロンプトは初期化より前に出す必要がある
    await requestTrackingPermissionsAsync();
    await mobileAds().initialize();
  } catch (error) {
    console.error('広告の初期化に失敗しました:', error);
  }
};
