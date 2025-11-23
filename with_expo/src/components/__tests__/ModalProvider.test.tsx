import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { View, Text, Button } from 'react-native';
import { ModalProvider } from '../ModalProvider';
import { useModal } from '../../hooks/useModal';

// Test modal component
const TestModal = ({ title = 'Test Modal' }: { title?: string }) => (
  <View testID="test-modal">
    <Text>{title}</Text>
  </View>
);

// Test component that uses the modal context
const TestComponent = () => {
  const { showModal, hideModal } = useModal();

  return (
    <View>
      <Button
        title="Show Modal"
        onPress={() => showModal(TestModal, { title: 'Custom Title' })}
        testID="show-modal-button"
      />
      <Button
        title="Hide Modal"
        onPress={hideModal}
        testID="hide-modal-button"
      />
    </View>
  );
};

describe('ModalProvider', () => {
  it('should provide showModal and hideModal functions', () => {
    const { getByTestId } = render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    expect(getByTestId('show-modal-button')).toBeTruthy();
    expect(getByTestId('hide-modal-button')).toBeTruthy();
  });

  it('should show modal when showModal is called', async () => {
    const { getByTestId, queryByTestId } = render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    // Modal should not be visible initially
    expect(queryByTestId('test-modal')).toBeNull();

    // Show modal
    fireEvent.press(getByTestId('show-modal-button'));

    // Modal should be visible
    await waitFor(() => {
      expect(getByTestId('test-modal')).toBeTruthy();
    });
  });

  it('should pass props to modal component', async () => {
    const { getByTestId, getByText } = render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    // Show modal with custom props
    fireEvent.press(getByTestId('show-modal-button'));

    // Check if custom title is rendered
    await waitFor(() => {
      expect(getByText('Custom Title')).toBeTruthy();
    });
  });

  it('should hide modal when hideModal is called', async () => {
    const { getByTestId, queryByTestId } = render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    // Show modal first
    fireEvent.press(getByTestId('show-modal-button'));
    
    await waitFor(() => {
      expect(getByTestId('test-modal')).toBeTruthy();
    });

    // Hide modal
    fireEvent.press(getByTestId('hide-modal-button'));

    // Modal should be hidden (may need to wait for animation)
    await waitFor(() => {
      expect(queryByTestId('test-modal')).toBeNull();
    }, { timeout: 1000 });
  });

  it('should support multiple modals (stack)', async () => {
    const SecondModal = () => (
      <View testID="second-modal">
        <Text>Second Modal</Text>
      </View>
    );

    const TestComponentMultiple = () => {
      const { showModal } = useModal();

      return (
        <View>
          <Button
            title="Show First Modal"
            onPress={() => showModal(TestModal)}
            testID="show-first-modal"
          />
          <Button
            title="Show Second Modal"
            onPress={() => showModal(SecondModal)}
            testID="show-second-modal"
          />
        </View>
      );
    };

    const { getByTestId } = render(
      <ModalProvider>
        <TestComponentMultiple />
      </ModalProvider>
    );

    // Show first modal
    fireEvent.press(getByTestId('show-first-modal'));
    
    await waitFor(() => {
      expect(getByTestId('test-modal')).toBeTruthy();
    });

    // Show second modal
    fireEvent.press(getByTestId('show-second-modal'));
    
    await waitFor(() => {
      expect(getByTestId('second-modal')).toBeTruthy();
      // First modal should still exist
      expect(getByTestId('test-modal')).toBeTruthy();
    });
  });
});