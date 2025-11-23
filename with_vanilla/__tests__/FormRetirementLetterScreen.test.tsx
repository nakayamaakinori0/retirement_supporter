/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {FormRetirementLetterScreen} from '../src/screens/FormRetirementLetterScreen';
import {Alert} from 'react-native';
import {waitFor} from '@testing-library/react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

// Mocks are already handled in setup.js

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('FormRetirementLetterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(
      <FormRetirementLetterScreen />,
    );

    expect(getByText('書類タイプ')).toBeTruthy();
    expect(getByText('退職願')).toBeTruthy();
    expect(getByText('退職届')).toBeTruthy();
    expect(getByPlaceholderText('株式会社〇〇')).toBeTruthy();
    expect(getByPlaceholderText('山田太郎')).toBeTruthy();
    expect(getByText('PDFを生成')).toBeTruthy();
  });

  it('switches between 退職願 and 退職届', async () => {
    const {getByText} = render(<FormRetirementLetterScreen />);

    const taishokuNegai = getByText('退職願');
    const taishokuTodoke = getByText('退職届');

    // Get the parent TouchableOpacity elements
    const negaiButton = taishokuNegai.parent?.parent;
    const todokeButton = taishokuTodoke.parent?.parent;

    // Initially 退職願 should be active
    expect(negaiButton?.props.style).toMatchObject({
      backgroundColor: '#2E7D32',
    });

    // Switch to 退職届
    fireEvent.press(taishokuTodoke);

    // Now 退職届 should be active - wait for state update
    await waitFor(() => {
      const updatedTodokeButton = getByText('退職届').parent?.parent;
      expect(updatedTodokeButton?.props.style).toMatchObject({
        backgroundColor: '#2E7D32',
      });
    });
  });

  it('shows error when required fields are empty', async () => {
    const {getByText} = render(<FormRetirementLetterScreen />);

    const generateButton = getByText('PDFを生成');
    fireEvent.press(generateButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'エラー',
        '会社名と氏名は必須です',
      );
    });
  });

  it('generates PDF when all required fields are filled', async () => {
    const mockFilePath = '/path/to/generated.pdf';
    (RNHTMLtoPDF.convert as jest.Mock).mockResolvedValue({
      filePath: mockFilePath,
    });

    const {getByText, getByPlaceholderText} = render(
      <FormRetirementLetterScreen />,
    );

    // Fill required fields
    fireEvent.changeText(getByPlaceholderText('株式会社〇〇'), 'テスト会社');
    fireEvent.changeText(getByPlaceholderText('山田太郎'), 'テスト太郎');

    // Generate PDF
    const generateButton = getByText('PDFを生成');
    fireEvent.press(generateButton);

    await waitFor(() => {
      expect(RNHTMLtoPDF.convert).toHaveBeenCalledWith(
        expect.objectContaining({
          fileName: expect.stringContaining('退職願_'),
          directory: expect.any(String),
          html: expect.stringContaining('退職願'),
        }),
      );
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        '成功',
        'PDFが生成されました',
        expect.any(Array),
      );
    });
  });

  it.skip('shares PDF when share button is pressed', async () => {
    const mockFilePath = '/path/to/generated.pdf';
    (RNHTMLtoPDF.convert as jest.Mock).mockResolvedValue({
      filePath: mockFilePath,
    });

    const {getByText, getByPlaceholderText} = render(
      <FormRetirementLetterScreen />,
    );

    // Fill required fields
    fireEvent.changeText(getByPlaceholderText('株式会社〇〇'), 'テスト会社');
    fireEvent.changeText(getByPlaceholderText('山田太郎'), 'テスト太郎');

    // Generate PDF
    const generateButton = getByText('PDFを生成');
    fireEvent.press(generateButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalled();
    });

    // Simulate pressing share button
    const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
    const shareButton = alertCall[2].find(
      (button: any) => button.text === '共有',
    );
    shareButton.onPress();

    await waitFor(() => {
      expect(Share.default.open).toHaveBeenCalledWith({
        url: expect.stringContaining(mockFilePath),
        type: 'application/pdf',
      });
    });
  });
});