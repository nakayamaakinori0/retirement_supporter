import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import ConfirmScreen from '../form-retirement-letter-confirm';
import { showInterstitialAd } from '../../src/libs/interstitialAd';

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
  useLocalSearchParams: () => ({
    formType: '届',
    submissionDate: '2026-08-11',
    companyName: 'テスト株式会社',
    employerName: 'テスト太郎',
    departmentName: '開発部',
    employeeName: 'テスト花子',
    retirementDate: '2026-09-30',
  }),
}));

jest.mock('expo-print', () => ({
  printToFileAsync: jest.fn(),
}));

jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn(),
  shareAsync: jest.fn(),
}));

jest.mock('../../src/libs/interstitialAd', () => ({
  showInterstitialAd: jest.fn(),
}));

const showInterstitialAdMock = showInterstitialAd as jest.Mock;
const printToFileAsyncMock = Print.printToFileAsync as jest.Mock;
const isAvailableAsyncMock = Sharing.isAvailableAsync as jest.Mock;
const shareAsyncMock = Sharing.shareAsync as jest.Mock;

describe('ConfirmScreen の広告とPDF生成', () => {
  beforeEach(() => {
    showInterstitialAdMock.mockReset();
    showInterstitialAdMock.mockResolvedValue(true);
    printToFileAsyncMock.mockReset();
    printToFileAsyncMock.mockResolvedValue({ uri: 'file:///retirement.pdf' });
    isAvailableAsyncMock.mockReset();
    isAvailableAsyncMock.mockResolvedValue(true);
    shareAsyncMock.mockReset();
    shareAsyncMock.mockResolvedValue(undefined);
  });

  it('広告を表示してからPDFを生成する', async () => {
    const { getByText } = render(<ConfirmScreen />);

    fireEvent.press(getByText('生成'));

    await waitFor(() => expect(printToFileAsyncMock).toHaveBeenCalled());
    expect(showInterstitialAdMock).toHaveBeenCalledTimes(1);

    // 広告 → PDF生成 の順であること
    const adOrder = showInterstitialAdMock.mock.invocationCallOrder[0];
    const printOrder = printToFileAsyncMock.mock.invocationCallOrder[0];
    expect(adOrder).toBeLessThan(printOrder);
  });

  it('広告を表示できなくてもPDFを生成する', async () => {
    showInterstitialAdMock.mockResolvedValue(false);

    const { getByText } = render(<ConfirmScreen />);
    fireEvent.press(getByText('生成'));

    await waitFor(() => expect(printToFileAsyncMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(shareAsyncMock).toHaveBeenCalledTimes(1));
  });

  it('広告の処理が例外を投げてもPDF生成を止めない', async () => {
    showInterstitialAdMock.mockRejectedValue(new Error('広告が壊れた'));
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { getByText } = render(<ConfirmScreen />);
    fireEvent.press(getByText('生成'));

    await waitFor(() => expect(printToFileAsyncMock).toHaveBeenCalledTimes(1));

    consoleError.mockRestore();
  });

  it('生成を連打しても広告とPDF生成は1回ずつしか走らない', async () => {
    const { getByText } = render(<ConfirmScreen />);

    const button = getByText('生成');
    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);

    await waitFor(() => expect(printToFileAsyncMock).toHaveBeenCalledTimes(1));
    expect(showInterstitialAdMock).toHaveBeenCalledTimes(1);
  });

  it('共有が使えない環境でもPDF生成まで完了する', async () => {
    isAvailableAsyncMock.mockResolvedValue(false);

    const { getByText } = render(<ConfirmScreen />);
    fireEvent.press(getByText('生成'));

    await waitFor(() => expect(printToFileAsyncMock).toHaveBeenCalledTimes(1));
    expect(shareAsyncMock).not.toHaveBeenCalled();
  });
});
