import { AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';
import {
  AD_DISPLAY_TIMEOUT_MS,
  AD_LOAD_TIMEOUT_MS,
  INTERSTITIAL_AD_UNIT_ID,
} from '../constants/ads';
import { initializeAds } from './initializeAds';

/**
 * インタースティシャル広告を1回表示し、閉じられるまで待つ。
 *
 * 広告は「表示できたら嬉しい」程度の位置づけで、本来の機能（PDF生成）を
 * 止めてはいけない。そのため読み込み失敗・タイムアウト・表示中のエラーは
 * すべて握りつぶし、呼び出し側には一切例外を投げない。
 *
 * どの経路を通っても必ず解決することを保証する。イベントが来ないまま
 * 固まると、PDFが永久に生成されない状態になるため。
 *
 * @returns 広告を表示できたかどうか（呼び出し側の分岐用ではなく、計測・テスト用）
 */
export const showInterstitialAd = async (): Promise<boolean> => {
  return new Promise<boolean>(resolve => {
    let settled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const unsubscribers: (() => void)[] = [];

    const clearPendingTimeout = () => {
      if (timeoutId === undefined) return;
      clearTimeout(timeoutId);
      timeoutId = undefined;
    };

    // 二重解決を防ぎつつ、必ずリスナーとタイマーを片付ける
    const finish = (shown: boolean) => {
      if (settled) return;
      settled = true;
      clearPendingTimeout();
      unsubscribers.forEach(unsubscribe => unsubscribe());
      resolve(shown);
    };

    const startTimeout = (ms: number, shownOnTimeout: boolean) => {
      clearPendingTimeout();
      timeoutId = setTimeout(() => finish(shownOnTimeout), ms);
    };

    // 読み込みが終わらないまま利用者を待たせないための保険
    startTimeout(AD_LOAD_TIMEOUT_MS, false);

    const run = async () => {
      // SDKの初期化が終わる前に広告を要求すると必ず失敗するため待つ。
      // 初期化が長引いた場合は上のタイムアウトが先に発火する
      await initializeAds();
      if (settled) return;

      const interstitial = InterstitialAd.createForAdRequest(
        INTERSTITIAL_AD_UNIT_ID,
      );

      unsubscribers.push(
        interstitial.addAdEventListener(AdEventType.LOADED, () => {
          // タイムアウト後に読み込みが完了しても、もう表示しない
          if (settled) return;

          // ここからは表示フェーズ。閉じられるまで待つので読み込みの
          // タイムアウトは止める（残すと広告の裏でPDF生成が始まる）。
          // ただしイベントが来ないまま固まる事故に備え、十分に長い
          // 上限だけは残しておく
          startTimeout(AD_DISPLAY_TIMEOUT_MS, true);

          try {
            interstitial.show();
          } catch {
            finish(false);
          }
        }),
      );

      unsubscribers.push(
        interstitial.addAdEventListener(AdEventType.CLOSED, () => finish(true)),
      );

      unsubscribers.push(
        interstitial.addAdEventListener(AdEventType.ERROR, () => finish(false)),
      );

      interstitial.load();
    };

    // SDK が使えない環境（Expo Go など）でも落とさない
    run().catch(() => finish(false));
  });
};
