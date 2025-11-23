import React, {
  createContext,
  useReducer,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Easing,
  Button,
  ViewStyle,
} from 'react-native';
import isOuterAreaClick from '@/src/libs/isOuterAreaClick';
import {useModal} from '@/src/hooks/useModal';

export const ModalContext = createContext<{
  showModal: (
    modalComponent: React.FC<any>,
    modalProps?: object,
    position?: 'upper' | 'center' | 'lower',
    from?: 'upper' | 'center' | 'lower',
  ) => void;
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
    (
      modalComponent: React.FC,
      modalProps: object = {},
      position: 'upper' | 'center' | 'lower' = 'center',
      from: 'upper' | 'center' | 'lower' = 'center',
    ) => {
      dispatch({
        type: 'add',
        value: {
          component: React.createElement(modalComponent),
          props: {...modalProps, position, from},
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
  position = 'center',
  from = 'center',
}: {
  closeButton?: boolean;
  outerAreaClose?: boolean;
  onClose?: (e: any) => void;
  children?: React.ReactNode;
  position?: 'upper' | 'center' | 'lower';
  from?: 'upper' | 'center' | 'lower';
}): JSX.Element {
  const viewRef = useRef<View>(null);
  const {hideModal} = useModal();
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const close = useCallback((e: any) => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      if (onClose && typeof onClose === 'function') {
        onClose(e);
      }
      hideModal();
    });
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

  const getFlexPosition = (): ViewStyle['justifyContent'] => {
    switch (position) {
      case 'upper':
        return 'flex-start';
      case 'lower':
        return 'flex-end';
      default:
        return 'center';
    }
  };

  const getSlideTransform = () => {
    const translateY = slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange:
        from === 'upper' ? [-1000, 0] : from === 'lower' ? [1000, 0] : [0, 0],
    });

    return {
      transform: [{translateY}],
    };
  };

  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      justifyContent: getFlexPosition(),
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      ...getSlideTransform(),
    },
    closeButton: {},
  });

  return (
    <TouchableWithoutFeedback onPress={onScreenClick}>
      <View style={styles.modal}>
        <Animated.View ref={viewRef} style={styles.modalContent}>
          <View style={styles.closeButton}>
            {closeButton && <Button title="X" onPress={close} />}
          </View>
          <View>{children}</View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
