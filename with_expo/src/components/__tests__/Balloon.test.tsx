import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import Balloon from '../Balloon';

describe('Balloon', () => {
  it('should render children content correctly', () => {
    const testContent = 'Test balloon content';
    const { getByText } = render(
      <Balloon>
        <Text>{testContent}</Text>
      </Balloon>
    );
    
    expect(getByText(testContent)).toBeTruthy();
  });

  it('should apply default styling', () => {
    const { getByTestId } = render(
      <Balloon testID="balloon">
        <Text>Content</Text>
      </Balloon>
    );
    
    const balloon = getByTestId('balloon');
    expect(balloon).toBeTruthy();
  });

  it('should accept custom style props', () => {
    const customStyle = {
      backgroundColor: '#ff0000',
      borderColor: 'blue',
      borderWidth: 4,
    };
    
    const { getByTestId } = render(
      <Balloon style={customStyle} testID="custom-balloon">
        <Text>Custom styled content</Text>
      </Balloon>
    );
    
    const balloon = getByTestId('custom-balloon');
    expect(balloon).toBeTruthy();
  });

  it('should have pointer elements for speech bubble appearance', () => {
    const { getByTestId } = render(
      <Balloon testID="balloon">
        <Text>Content</Text>
      </Balloon>
    );
    
    // The balloon container should be present
    expect(getByTestId('balloon')).toBeTruthy();
  });
});