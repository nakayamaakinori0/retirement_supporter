import {
  AdEventType,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import { showInterstitialAd } from '../interstitialAd';
import { AD_LOAD_TIMEOUT_MS } from '../../constants/ads';

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

describe('showInterstitialAd', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    createForAdRequestMock.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
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
    jest.advanceTimersByTime(AD_LOAD_TIMEOUT_MS);

    await expect(promise).resolves.toBe(false);
    expect(ad.show).not.toHaveBeenCalled();
  });

  it('タイムアウト後に読み込みが完了しても広告を表示しない', async () => {
    const { ad, emit } = createFakeAd();
    createForAdRequestMock.mockReturnValue(ad);

    const promise = showInterstitialAd();
    jest.advanceTimersByTime(AD_LOAD_TIMEOUT_MS);
    await expect(promise).resolves.toBe(false);

    emit(AdEventType.LOADED);
    expect(ad.show).not.toHaveBeenCalled();
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
