// Silence various warnings
global.__DEV__ = true;

// Mock console methods
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock expo modules completely
jest.mock('expo', () => ({}));
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));
jest.mock('expo-constants', () => ({
  default: {
    statusBarHeight: 20,
  },
}));

// Mock specific problematic imports
global.__ExpoImportMetaRegistry = {};

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useFocusEffect: jest.fn(),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock other libraries
jest.mock('react-native-calendars', () => ({
  Calendar: 'Calendar',
  CalendarList: 'CalendarList',
  Agenda: 'Agenda',
}));

jest.mock('react-native-countdown-component', () => 'CountDown');
jest.mock('react-native-swiper', () => 'Swiper');

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock React Native components that may cause issues
jest.mock('react-native-gesture-handler', () => ({
  PanGestureHandler: 'PanGestureHandler',
  TapGestureHandler: 'TapGestureHandler',
  State: {},
  Directions: {},
}));