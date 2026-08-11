import {
  AdEventType,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import {
  AD_LOAD_TIMEOUT_MS,
  INTERSTITIAL_AD_UNIT_ID,
} from '../constants/ads';

/**
 * インタースティシャル広告を1回表示し、閉じられるまで待つ。
 *
 * 広告は「表示できたら嬉しい」程度の位置づけで、本来の機能（PDF生成）を
 * 止めてはいけない。そのため読み込み失敗・タイムアウト・表示中のエラーは
 * すべて握りつぶし、呼び出し側には一切例外を投げない。
 *
 * @returns 広告を表示できたかどうか（呼び出し側の分岐用ではなく、計測・テスト用）
 */
export const showInterstitialAd = async (): Promise<boolean> => {
  return new Promise<boolean>(resolve => {
    let settled = false;
    const unsubscribers: (() => void)[] = [];

    // 二重解決を防ぎつつ、必ずリスナーを外す
    const finish = (shown: boolean) => {
      if (settled) return;
      settled = true;
      clearLoadTimeout();
      unsubscribers.forEach(unsubscribe => unsubscribe());
      resolve(shown);
    };

    // 読み込みが終わらないまま利用者を待たせないための保険。
    // これはあくまで「読み込み」の上限であり、表示中の広告を打ち切る用途では
    // ないため、読み込みが完了した時点で必ず止める
    let timeoutId: ReturnType<typeof setTimeout> | undefined = setTimeout(
      () => finish(false),
      AD_LOAD_TIMEOUT_MS,
    );

    const clearLoadTimeout = () => {
      if (timeoutId === undefined) return;
      clearTimeout(timeoutId);
      timeoutId = undefined;
    };

    try {
      const interstitial = InterstitialAd.createForAdRequest(
        INTERSTITIAL_AD_UNIT_ID,
      );

      unsubscribers.push(
        interstitial.addAdEventListener(AdEventType.LOADED, () => {
          // タイムアウト後に読み込みが完了しても、もう表示しない
          if (settled) return;

          // ここから先は表示フェーズ。閉じられるまで待つので読み込みの
          // タイムアウトは止める（残しておくと広告の裏でPDF生成が始まる）
          clearLoadTimeout();

          try {
            interstitial.show();
          } catch {
            finish(false);
          }
        }),
      );

      unsubscribers.push(
        interstitial.addAdEventListener(AdEventType.CLOSED, () =>
          finish(true),
        ),
      );

      unsubscribers.push(
        interstitial.addAdEventListener(AdEventType.ERROR, () => finish(false)),
      );

      interstitial.load();
    } catch {
      // SDK が使えない環境（Expo Go など）でも落とさない
      finish(false);
    }
  });
};
