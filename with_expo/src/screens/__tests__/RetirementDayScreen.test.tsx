import React from 'react';
import { render } from '@testing-library/react-native';
import RetirementDayScreen from '../RetirementDayScreen';

describe('RetirementDayScreen', () => {
  it('should render congratulation message', () => {
    const { getByText } = render(<RetirementDayScreen />);
    
    expect(getByText(/退職おめでとう！！/)).toBeTruthy();
    expect(getByText(/よく頑張りました！！/)).toBeTruthy();
  });

  it('should render Steve Jobs quote', () => {
    const { getByText } = render(<RetirementDayScreen />);
    
    expect(getByText(/過去ばかり振り向いていたのではダメだ/)).toBeTruthy();
    expect(getByText('by Steve Jobs')).toBeTruthy();
  });

  it('should render hanamaru image', () => {
    const { getByTestId } = render(<RetirementDayScreen />);
    
    const image = getByTestId('hanamaru-image');
    expect(image).toBeTruthy();
  });

  it('should have correct styling and layout', () => {
    const { getByTestId } = render(<RetirementDayScreen />);
    
    const container = getByTestId('retirement-container');
    expect(container).toBeTruthy();
    expect(container.props.style).toMatchObject({
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F5FCF4',
    });
  });
});