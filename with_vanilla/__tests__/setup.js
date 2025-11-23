import {jest} from '@jest/globals';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

// Mock react-native-calendars
jest.mock('react-native-calendars', () => ({
  Calendar: () => null,
}));

// Mock react-native-countdown-component
jest.mock('react-native-countdown-component', () => 'CountDown');

// Mock react-native-share
jest.mock('react-native-share', () => ({
  default: {
    open: jest.fn(),
  },
}));

// Mock react-native-html-to-pdf
jest.mock('react-native-html-to-pdf', () => ({
  convert: jest.fn(),
}));

// Mock dayjs
jest.mock('@/src/libs/day', () => {
  const mockDayjs = () => ({
    add: jest.fn().mockReturnValue({
      format: jest.fn().mockReturnValue('2025年02月23日'),
    }),
    format: jest.fn().mockReturnValue('2025年01月23日'),
  });
  mockDayjs.tz = {setDefault: jest.fn()};
  mockDayjs.locale = jest.fn();
  mockDayjs.extend = jest.fn();
  return {default: mockDayjs};
});