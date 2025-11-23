import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FormRetirementLetterScreen } from '../FormRetirementLetterScreen';
import { Alert } from 'react-native';

// Mock Alert
jest.spyOn(Alert, 'alert');

// Mock PDF generation libraries
jest.mock('react-native-html-to-pdf', () => ({
  convert: jest.fn(() => Promise.resolve({ filePath: '/mock/path/document.pdf' })),
}));

jest.mock('react-native-share', () => ({
  open: jest.fn(() => Promise.resolve()),
}));

describe('FormRetirementLetterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form inputs correctly', () => {
    const { getByPlaceholderText, getByText } = render(<FormRetirementLetterScreen />);
    
    expect(getByText('書類タイプ')).toBeTruthy();
    expect(getByText('退職願')).toBeTruthy();
    expect(getByText('退職届')).toBeTruthy();
    
    expect(getByPlaceholderText('株式会社〇〇')).toBeTruthy();
    expect(getByPlaceholderText('〇〇部長')).toBeTruthy();
    expect(getByPlaceholderText('山田太郎')).toBeTruthy();
    expect(getByPlaceholderText('一身上の都合')).toBeTruthy();
  });

  it('should toggle between 退職願 and 退職届', () => {
    const { getByText } = render(<FormRetirementLetterScreen />);
    
    const wishButton = getByText('退職願');
    const noticeButton = getByText('退職届');
    
    // Default should be 退職願
    expect(wishButton.props.style).toContainEqual({ color: '#fff', fontWeight: 'bold' });
    
    // Switch to 退職届
    fireEvent.press(noticeButton);
    expect(noticeButton.props.style).toContainEqual({ color: '#fff', fontWeight: 'bold' });
  });

  it('should update input values when typed', () => {
    const { getByPlaceholderText } = render(<FormRetirementLetterScreen />);
    
    const companyInput = getByPlaceholderText('株式会社〇〇');
    const nameInput = getByPlaceholderText('山田太郎');
    
    fireEvent.changeText(companyInput, 'テスト株式会社');
    fireEvent.changeText(nameInput, 'テスト太郎');
    
    expect(companyInput.props.value).toBe('テスト株式会社');
    expect(nameInput.props.value).toBe('テスト太郎');
  });

  it('should show error when required fields are empty', async () => {
    const { getByText } = render(<FormRetirementLetterScreen />);
    
    const generateButton = getByText('PDFを生成');
    fireEvent.press(generateButton);
    
    expect(Alert.alert).toHaveBeenCalledWith('エラー', '会社名と氏名は必須です');
  });

  it('should generate PDF when form is valid', async () => {
    const { getByPlaceholderText, getByText } = render(<FormRetirementLetterScreen />);
    
    // Fill required fields
    fireEvent.changeText(getByPlaceholderText('株式会社〇〇'), 'テスト株式会社');
    fireEvent.changeText(getByPlaceholderText('山田太郎'), 'テスト太郎');
    
    const generateButton = getByText('PDFを生成');
    fireEvent.press(generateButton);
    
    // Should not show error
    expect(Alert.alert).not.toHaveBeenCalledWith('エラー', '会社名と氏名は必須です');
  });

  it('should have correct default values', () => {
    const { getByDisplayValue } = render(<FormRetirementLetterScreen />);
    
    expect(getByDisplayValue('一身上の都合')).toBeTruthy();
    expect(getByDisplayValue('2025年02月23日')).toBeTruthy();
    expect(getByDisplayValue('2025年01月23日')).toBeTruthy();
  });
});