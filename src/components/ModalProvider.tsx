import React, {
  createContext,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from 'react';

import isOuterAreaClick from '../libs/isOuterAreaClick';

import {useModal} from '../hooks/useModal';
import {View, Button, StyleSheet, TouchableWithoutFeedback} from 'react-native';

export const ModalContext = createContext<{
  showModal: (modalComponent: React.FC, modalProps?: object) => void;
  hideModal: () => void;
}>({
  showModal: () => null,
  hideModal: () => null,
});

ModalContext.displayName = 'ModalContext';

let id = 0;
function generateId() {
  return id++;
}

const initialValue: any[] = [];
const reducer = (state: any, action: any) => {
  const newState = [...state];
  switch (action.type) {
    case 'add':
      newState.push(action.value);
      return newState;
    case 'remove':
      newState.pop();
      return newState;
    default:
      return state;
  }
};

export function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [modals, dispatch] = useReducer(reducer, initialValue);

  const showModal = useCallback(
    (modalComponent: React.FC, modalProps: object = {}) => {
      dispatch({
        type: 'add',
        value: {
          component: React.createElement(modalComponent),
          props: modalProps,
          key: `modal-${generateId()}`,
        },
      });
    },
    [],
  );

  const hideModal = useCallback(() => {
    dispatch({type: 'remove'});
  }, []);

  const contextValue = useMemo(
    () => ({
      showModal,
      hideModal,
    }),
    [showModal, hideModal],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {(modals as ModalElement[]).map(modal => (
        <Modal key={modal.key} {...modal.props}>
          {modal.component}
        </Modal>
      ))}
    </ModalContext.Provider>
  );
}
type ModalElement = {
  component: React.ReactNode;
  props: object;
  key: string;
};

export function Modal({
  closeButton = false,
  outerAreaClose = true,
  onClose = () => null,
  children,
}: {
  closeButton?: boolean;
  outerAreaClose?: boolean;
  onClose?: (e: any) => void;
  children?: React.ReactNode;
}): JSX.Element {
  const viewRef = useRef<View>(null);
  const {hideModal} = useModal();

  const close = useCallback((e: any) => {
    if (onClose && typeof onClose === 'function') {
      onClose(e);
    }
    hideModal();
  }, []);

  const onScreenClick = useCallback(
    async (e: any) => {
      if (!outerAreaClose) return false;
      e.persist();
      if (viewRef.current && (await isOuterAreaClick(viewRef.current, e))) {
        close(e);
      }
    },
    [outerAreaClose, viewRef],
  );

  return (
    <TouchableWithoutFeedback onPress={onScreenClick}>
      <View style={styles.modal}>
        <View ref={viewRef} style={styles.modalContent}>
          <View style={styles.closeButton}>
            {closeButton && <Button title="X" onPress={close}></Button>}
          </View>
          <View>{children}</View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {},
  closeButton: {},
});
