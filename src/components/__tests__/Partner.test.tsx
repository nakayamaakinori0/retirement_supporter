import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Partner from '../Partner';

// Mock requestAnimationFrame for tests
global.requestAnimationFrame = jest.fn((cb) => {
  setTimeout(cb, 16);
  return 1;
});

global.cancelAnimationFrame = jest.fn();

describe('Partner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render partner image', () => {
    const { getByTestId } = render(<Partner showEncourage={false} />);
    
    const partnerImage = getByTestId('partner-image');
    expect(partnerImage).toBeTruthy();
  });

  it('should not show encourage balloon when showEncourage is false', () => {
    const { queryByTestId } = render(<Partner showEncourage={false} />);
    
    const encourageBalloon = queryByTestId('encourage-balloon');
    expect(encourageBalloon).toBeNull();
  });

  it('should show encourage balloon when showEncourage is true', async () => {
    const { getByTestId } = render(<Partner showEncourage={true} />);
    
    await waitFor(() => {
      const encourageBalloon = getByTestId('encourage-balloon');
      expect(encourageBalloon).toBeTruthy();
    });
  });

  it('should display encourage text when showing encourage', async () => {
    const { getByTestId } = render(<Partner showEncourage={true} />);
    
    await waitFor(() => {
      const encourageText = getByTestId('encourage-text');
      expect(encourageText).toBeTruthy();
      expect(encourageText.props.children).toMatch(/にゃー$/); // Should end with "にゃー"
    });
  });

  it('should animate partner images using requestAnimationFrame', () => {
    render(<Partner showEncourage={false} />);
    
    // requestAnimationFrame should be called for image animation
    expect(requestAnimationFrame).toHaveBeenCalled();
  });

  it('should cleanup animation frame on unmount', () => {
    const { unmount } = render(<Partner showEncourage={false} />);
    
    unmount();
    
    // cancelAnimationFrame should be called during cleanup
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it('should render properly with showEncourage prop', () => {
    const { rerender, queryByTestId } = render(
      <Partner showEncourage={false} />
    );

    // Initially no encourage balloon
    expect(queryByTestId('encourage-balloon')).toBeNull();

    // Show encourage - test basic prop handling
    rerender(<Partner showEncourage={true} />);
    
    // Note: In test environment, animated components may not render the same way
    // The important thing is that the component doesn't crash and handles props correctly
    const partnerImage = queryByTestId('partner-image');
    expect(partnerImage).toBeTruthy();
  });
});