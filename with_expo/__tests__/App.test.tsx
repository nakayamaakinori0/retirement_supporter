import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

// Mock expo modules for test environment  
jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

// Simple component for initial test
const TestComponent = () => <Text>Test Component</Text>;

describe('App', () => {
  it('should render test component', () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText('Test Component')).toBeTruthy();
  });
});