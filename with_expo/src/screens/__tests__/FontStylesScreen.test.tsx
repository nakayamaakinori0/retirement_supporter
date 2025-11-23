import React from 'react';
import { render } from '@testing-library/react-native';
import FontStylesScreen from '../FontStylesScreen';

describe('FontStylesScreen', () => {
  it('should render font list correctly', () => {
    const { getByText } = render(<FontStylesScreen />);
    
    // Check for some common fonts
    expect(getByText('System Font (Default)')).toBeTruthy();
    expect(getByText('Helvetica')).toBeTruthy();
    expect(getByText('Georgia')).toBeTruthy();
  });

  it('should render in scroll view', () => {
    const { getByTestId } = render(<FontStylesScreen />);
    
    const scrollView = getByTestId('font-scroll-view');
    expect(scrollView).toBeTruthy();
  });

  it('should display font names as sample text', () => {
    const { getByText } = render(<FontStylesScreen />);
    
    // Each font should display its own name as sample text
    const systemFont = getByText('System Font (Default)');
    expect(systemFont).toBeTruthy();
  });
});