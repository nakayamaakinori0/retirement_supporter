import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Quote from '../Quote';
import dayjs from '../../libs/day';

global.fetch = jest.fn();

const getItemMock = AsyncStorage.getItem as jest.Mock;
const setItemMock = AsyncStorage.setItem as jest.Mock;

// コンポーネントは dayjs のローカル時刻で日付を比較するため、
// テスト側も UTC ではなく dayjs で日付を組み立てる
const today = dayjs().format('YYYY-MM-DD');
const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

/**
 * AsyncStorage.getItem の戻り値をキー単位で決める。
 * mockResolvedValueOnce は呼び出し順に依存し、消費されなかった値が
 * 次のテストへ漏れるため使わない。
 */
const mockStorage = (store: Record<string, string | null>) => {
  getItemMock.mockImplementation((key: string) =>
    Promise.resolve(store[key] ?? null),
  );
};

describe('Quote', () => {
  beforeEach(() => {
    // clearAllMocks は実装を残すので、明示的に reset して状態を持ち越さない
    getItemMock.mockReset();
    setItemMock.mockReset();
    setItemMock.mockResolvedValue(undefined);

    (fetch as jest.Mock).mockReset();
    (fetch as jest.Mock).mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue([{ auther: 'テスト著者', meigen: 'テスト名言' }]),
    });
  });

  it('キャッシュがなければAPIから取得して表示する', async () => {
    mockStorage({});

    const { getByText } = render(<Quote />);

    await waitFor(() => {
      expect(getByText('テスト名言')).toBeTruthy();
      expect(getByText('by テスト著者')).toBeTruthy();
    });
  });

  it('当日取得済みのキャッシュがあればAPIを叩かずキャッシュを表示する', async () => {
    mockStorage({
      quoteGotDate: today,
      quote: JSON.stringify({
        auther: 'キャッシュ著者',
        meigen: 'キャッシュ名言',
      }),
    });

    const { getByText } = render(<Quote />);

    await waitFor(() => {
      expect(getByText('キャッシュ名言')).toBeTruthy();
      expect(getByText('by キャッシュ著者')).toBeTruthy();
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('キャッシュが前日以前ならAPIから取得し直す', async () => {
    mockStorage({
      quoteGotDate: yesterday,
      quote: JSON.stringify({ auther: '古い著者', meigen: '古い名言' }),
    });

    const { getByText } = render(<Quote />);

    await waitFor(() => {
      expect(getByText('テスト名言')).toBeTruthy();
      expect(getByText('by テスト著者')).toBeTruthy();
    });
    expect(fetch).toHaveBeenCalledWith(
      'https://meigen.doodlenote.net/api/json.php?c=1&e=1',
    );
  });

  it('APIから取得した名言と取得日をAsyncStorageに保存する', async () => {
    mockStorage({});

    render(<Quote />);

    await waitFor(() => {
      expect(setItemMock).toHaveBeenCalledWith(
        'quoteGotDate',
        expect.any(String),
      );
      expect(setItemMock).toHaveBeenCalledWith(
        'quote',
        JSON.stringify({ auther: 'テスト著者', meigen: 'テスト名言' }),
      );
    });
  });
});
