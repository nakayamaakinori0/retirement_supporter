import {
  AdEventType,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import { showInterstitialAd } from '../interstitialAd';
import { resetAdsInitializationForTest } from '../initializeAds';
import {
  AD_DISPLAY_TIMEOUT_MS,
  AD_LOAD_TIMEOUT_MS,
} from '../../constants/ads';

const createForAdRequestMock = InterstitialAd.createForAdRequest as jest.Mock;

type Listener = () => void;

/**
 * 広告オブジェクトの偽物。
 * load() を呼んだときに何が起きるかをテストごとに差し替える。
 */
const createFakeAd = () => {
  const listeners: Record<string, Listener[]> = {};
  const unsubscribed: string[] = [];

  const emit = (type: string) => {
    (listeners[type] ?? []).forEach(listener => listener());
  };

  const ad = {
    show: jest.fn(),
    load: jest.fn(),
    addAdEventListener: jest.fn((type: string, listener: Listener) => {
      listeners[type] = [...(listeners[type] ?? []), listener];
      return () => {
        unsubscribed.push(type);
      };
    }),
  };

  return { ad, emit, unsubscribed };
};

/**
 * showInterstitialAd はSDKの初期化を await してから広告を要求するため、
 * タイマーを進める前にその分のマイクロタスクを流す必要がある
 */
const flushInit = async () => {
  for (let i = 0; i < 5; i += 1) {
    await Promise.resolve();
  }
};

describe('showInterstitialAd', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    createForAdRequestMock.mockReset();
    resetAdsInitializationForTest();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('広告が閉じられないまま固まっても最終的には必ず解決する', async () => {
    const { ad, emit } = createFakeAd();
    // 読み込みは成功して表示されたが、CLOSED も ERROR も来ない状況
    ad.load.mockImplementation(() => emit(AdEventType.LOADED));
    createForAdRequestMock.mockReturnValue(ad);

    const promise = showInterstitialAd();
    await flushInit();

    jest.advanceTimersByTime(AD_DISPLAY_TIMEOUT_MS);

    // ここで解決しないと、PDFが永久に生成されない
    await expect(promise).resolves.toBe(true);
  });

  it('SDKの初期化が終わってから広告を要求する', async () => {
    const { ad, emit } = createFakeAd();
    ad.load.mockImplementation(() => {
      emit(AdEventType.LOADED);
      emit(AdEventType.CLOSED);
    });
    createForAdRequestMock.mockReturnValue(ad);

    const promise = showInterstitialAd();

    // 初期化の解決前は広告を要求していない
    expect(createForAdRequestMock).not.toHaveBeenCalled();

    await flushInit();
    await promise;

    expect(createForAdRequestMock).toHaveBeenCalledTimes(1);
  });

  it('広告を読み込めたら表示し、閉じられたら true を返す', async () => {
    const { ad, emit } = createFakeAd();
    ad.load.mockImplementation(() => {
      emit(AdEventType.LOADED);
      emit(AdEventType.CLOSED);
    });
    createForAdRequestMock.mockReturnValue(ad);

    await expect(showInterstitialAd()).resolves.toBe(true);
    expect(ad.show).toHaveBeenCalledTimes(1);
  });

  it('読み込みに失敗したら表示せず false を返す', async () => {
    const { ad, emit } = createFakeAd();
    ad.load.mockImplementation(() => emit(AdEventType.ERROR));
    createForAdRequestMock.mockReturnValue(ad);

    await expect(showInterstitialAd()).resolves.toBe(false);
    expect(ad.show).not.toHaveBeenCalled();
  });

  it('読み込みが終わらなければタイムアウトして false を返す', async () => {
    const { ad } = createFakeAd();
    ad.load.mockImplementation(() => {
      // 何も起きない = 読み込みが返ってこない状況
    });
    createForAdRequestMock.mockReturnValue(ad);

    const promise = showInterstitialAd();
    await flushInit();
    jest.advanceTimersByTime(AD_LOAD_TIMEOUT_MS);

    await expect(promise).resolves.toBe(false);
    expect(ad.show).not.toHaveBeenCalled();
  });

  it('タイムアウト後に読み込みが完了しても広告を表示しない', async () => {
    const { ad, emit } = createFakeAd();
    createForAdRequestMock.mockReturnValue(ad);

    const promise = showInterstitialAd();
    await flushInit();
    jest.advanceTimersByTime(AD_LOAD_TIMEOUT_MS);
    await expect(promise).resolves.toBe(false);

    emit(AdEventType.LOADED);
    expect(ad.show).not.toHaveBeenCalled();
  });

  it('広告の表示中はタイムアウトで打ち切らない', async () => {
    const { ad, emit } = createFakeAd();
    // 読み込みは間に合ったが、利用者が広告をしばらく見ている状況
    ad.load.mockImplementation(() => emit(AdEventType.LOADED));
    createForAdRequestMock.mockReturnValue(ad);

    const promise = showInterstitialAd();
    let settled = false;
    promise.then(() => {
      settled = true;
    });
    await flushInit();

    // 読み込みのタイムアウトを大きく超えて広告が表示され続けている
    jest.advanceTimersByTime(AD_LOAD_TIMEOUT_MS * 3);
    await Promise.resolve();

    // ここで解決してしまうと広告の裏でPDF生成が始まってしまう
    expect(settled).toBe(false);

    emit(AdEventType.CLOSED);
    await expect(promise).resolves.toBe(true);
  });

  it('show() が例外を投げても false を返して落ちない', async () => {
    const { ad, emit } = createFakeAd();
    ad.show.mockImplementation(() => {
      throw new Error('表示できない');
    });
    ad.load.mockImplementation(() => emit(AdEventType.LOADED));
    createForAdRequestMock.mockReturnValue(ad);

    await expect(showInterstitialAd()).resolves.toBe(false);
  });

  it('SDKが利用できない環境でも例外を投げず false を返す', async () => {
    createForAdRequestMock.mockImplementation(() => {
      throw new Error('ネイティブモジュールがありません');
    });

    await expect(showInterstitialAd()).resolves.toBe(false);
  });

  it('解決後はイベントリスナーを解除する', async () => {
    const { ad, emit, unsubscribed } = createFakeAd();
    ad.load.mockImplementation(() => {
      emit(AdEventType.LOADED);
      emit(AdEventType.CLOSED);
    });
    createForAdRequestMock.mockReturnValue(ad);

    await showInterstitialAd();

    expect(unsubscribed).toEqual(
      expect.arrayContaining([
        AdEventType.LOADED,
        AdEventType.CLOSED,
        AdEventType.ERROR,
      ]),
    );
  });
});
