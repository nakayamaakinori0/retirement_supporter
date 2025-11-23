import { useContext } from 'react';
import { ModalContext } from '../components/ModalProvider';

export function useModal() {
  return useContext(ModalContext);
}