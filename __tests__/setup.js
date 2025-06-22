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