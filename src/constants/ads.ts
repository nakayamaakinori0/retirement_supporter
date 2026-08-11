import { TestIds } from 'react-native-google-mobile-ads';

/**
 * 退職届（願）生成前に表示するインタースティシャル広告のユニットID
 *
 * 開発中に実広告を読み込むと AdMob のポリシー上「無効なトラフィック」と
 * 判定され、アカウント停止のリスクがあるため必ず __DEV__ で分岐する。
 *
 * これらのIDはアプリのバイナリに埋め込まれる公開情報で、秘匿の必要はない。
 */
export const INTERSTITIAL_AD_UNIT_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-8035028352595890/6870296100';

/** 広告の読み込みを待つ上限。これを超えたら広告なしで先に進む */
export const AD_LOAD_TIMEOUT_MS = 5000;
