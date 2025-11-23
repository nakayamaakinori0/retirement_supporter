import {useContext} from 'react';
import {ModalContext} from '@/src/components/ModalProvider';

export function useModal() {
  return useContext(ModalContext);
}
