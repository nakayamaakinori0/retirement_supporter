import {useContext} from 'react';
import {CalenderContext} from '../components/CalenderProvider';

export function useCalender() {
  return useContext(CalenderContext);
}
