import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CalenderModal from '../CalenderModal';
import { CalenderProvider } from '../CalenderProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('CalenderModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = (component: React.ReactElement) => {
    return render(
      <CalenderProvider>
        {component}
      </CalenderProvider>
    );
  };

  it('should render calendar component', () => {
    const { getByTestId } = renderWithProvider(<CalenderModal />);
    
    // Calendar component should be rendered
    const calendar = getByTestId('calendar');
    expect(calendar).toBeTruthy();
  });

  it('should handle day press and update retirement date', async () => {
    const { getByTestId } = renderWithProvider(<CalenderModal />);
    
    const calendar = getByTestId('calendar');
    
    // Simulate day press with future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const dateString = futureDate.toISOString().split('T')[0];
    
    fireEvent(calendar, 'onDayPress', {
      dateString: dateString,
      day: futureDate.getDate(),
      month: futureDate.getMonth() + 1,
      year: futureDate.getFullYear(),
      timestamp: futureDate.getTime(),
    });
    
    // Should save to AsyncStorage
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('retirementDate', dateString);
  });

  it('should not allow selecting past dates', () => {
    const { getByTestId } = renderWithProvider(<CalenderModal />);
    
    const calendar = getByTestId('calendar');
    
    // Simulate day press with past date
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 30);
    const dateString = pastDate.toISOString().split('T')[0];
    
    fireEvent(calendar, 'onDayPress', {
      dateString: dateString,
      day: pastDate.getDate(),
      month: pastDate.getMonth() + 1,
      year: pastDate.getFullYear(),
      timestamp: pastDate.getTime(),
    });
    
    // Should not save to AsyncStorage for past dates
    expect(mockAsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('should mark selected retirement date', () => {
    const { getByTestId } = renderWithProvider(<CalenderModal />);
    
    const calendar = getByTestId('calendar');
    expect(calendar).toBeTruthy();
    
    // The calendar should be configured with markedDates
    expect(calendar.props.markedDates).toBeDefined();
  });
});