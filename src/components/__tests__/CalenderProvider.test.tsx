import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, Button } from 'react-native';
import { CalenderProvider } from '../CalenderProvider';
import { useCalender } from '../../hooks/useCalender';

// Test component that uses the calendar context
const TestComponent = () => {
  const { retirementDate, setRetirementDate } = useCalender();

  return (
    <View>
      <Button
        title={`Date: ${retirementDate || 'None'}`}
        onPress={() => setRetirementDate('2024-12-31')}
        testID="date-button"
      />
    </View>
  );
};

describe('CalenderProvider', () => {
  it('should provide initial retirement date as null', () => {
    const { getByText } = render(
      <CalenderProvider>
        <TestComponent />
      </CalenderProvider>
    );

    expect(getByText('Date: None')).toBeTruthy();
  });

  it('should update retirement date when setRetirementDate is called', () => {
    const { getByText, getByTestId } = render(
      <CalenderProvider>
        <TestComponent />
      </CalenderProvider>
    );

    // Initial state
    expect(getByText('Date: None')).toBeTruthy();
    
    // Update date
    const button = getByTestId('date-button');
    fireEvent.press(button);
    expect(getByText('Date: 2024-12-31')).toBeTruthy();
  });

  it('should share retirement date state between multiple consumers', () => {
    const TestComponent2 = () => {
      const { retirementDate } = useCalender();
      return (
        <View testID="second-component">
          <Button
            title={`Second: ${retirementDate || 'None'}`}
            onPress={() => {}}
            testID="second-button"
          />
        </View>
      );
    };

    const { getByText, getByTestId } = render(
      <CalenderProvider>
        <TestComponent />
        <TestComponent2 />
      </CalenderProvider>
    );
    
    // Both should show initial state
    expect(getByText('Date: None')).toBeTruthy();
    expect(getByText('Second: None')).toBeTruthy();
    
    // Update through first component
    const firstButton = getByTestId('date-button');
    fireEvent.press(firstButton);
    
    // Both should reflect the change
    expect(getByText('Date: 2024-12-31')).toBeTruthy();
    expect(getByText('Second: 2024-12-31')).toBeTruthy();
  });
});