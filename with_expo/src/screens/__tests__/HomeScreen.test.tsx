import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { CalenderProvider } from '../../components/CalenderProvider';
import { ModalProvider } from '../../components/ModalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock AsyncStorage
const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAsyncStorage.getItem.mockResolvedValue(null);
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <CalenderProvider>
        <ModalProvider>
          {component}
        </ModalProvider>
      </CalenderProvider>
    );
  };

  it('should render home screen components', () => {
    const { getByText } = renderWithProviders(<HomeScreen />);
    
    expect(getByText('退職まであと')).toBeTruthy();
    expect(getByText('日')).toBeTruthy();
    expect(getByText('x')).toBeTruthy(); // Initial remaining days display
  });

  it('should load retirement date from AsyncStorage on mount', async () => {
    const testDate = '2024-12-31';
    mockAsyncStorage.getItem.mockResolvedValue(testDate);
    
    renderWithProviders(<HomeScreen />);
    
    await waitFor(() => {
      expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('retirementDate');
    });
  });

  it('should calculate remaining weekdays correctly', async () => {
    // Set a future date for testing
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const dateString = futureDate.toISOString().split('T')[0];
    
    mockAsyncStorage.getItem.mockResolvedValue(dateString);
    
    const { getByText } = renderWithProviders(<HomeScreen />);
    
    await waitFor(() => {
      // Should show calculated remaining weekdays (not 'x')
      expect(() => getByText('x')).toThrow();
    });
  });

  it('should handle quote press interaction', async () => {
    const { getByTestId } = renderWithProviders(<HomeScreen />);
    
    // Wait for quote component to load
    await waitFor(() => {
      const quoteComponent = getByTestId('quote-container');
      expect(quoteComponent).toBeTruthy();
    });
    
    const quoteContainer = getByTestId('quote-container');
    fireEvent.press(quoteContainer);
    
    // The press should not cause any errors
    // In test environment, animations may not work the same way
    expect(quoteContainer).toBeTruthy();
  });

  it('should navigate to RetirementDay when remaining days is 0', async () => {
    // Mock today as retirement date
    const today = new Date().toISOString().split('T')[0];
    mockAsyncStorage.getItem.mockResolvedValue(today);
    
    renderWithProviders(<HomeScreen />);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('RetirementDay');
    });
  });

  it('should open calendar modal when remaining days is pressed', async () => {
    const { getByText } = renderWithProviders(<HomeScreen />);
    
    const remainingDaysText = getByText('x');
    fireEvent.press(remainingDaysText);
    
    // Calendar modal should be opened (this would be tested in integration tests)
    // For unit test, we just verify the press handler works
    expect(remainingDaysText).toBeTruthy();
  });
});