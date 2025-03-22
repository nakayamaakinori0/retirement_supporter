import {useContext} from 'react';
import {CalenderContext} from '@/src/components/CalenderProvider';

export function useCalender() {
  return useContext(CalenderContext);
}
