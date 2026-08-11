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

/**
 * 広告を表示してから閉じられるまで待つ上限。
 *
 * 通常はSDKの CLOSED イベントで解決するが、イベントが来ないまま固まると
 * PDFが永久に生成されなくなる。その事故を防ぐためだけの保険なので、
 * 正常な視聴を打ち切らない十分に長い値にする。
 */
export const AD_DISPLAY_TIMEOUT_MS = 120000;
