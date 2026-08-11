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

// Mock React Native components that may cause issues
jest.mock('react-native-gesture-handler', () => ({
  PanGestureHandler: 'PanGestureHandler',
  TapGestureHandler: 'TapGestureHandler',
  State: {},
  Directions: {},
}));
// 広告SDKはネイティブモジュールを含むためテスト環境では読み込めない。
// 個別のテストで振る舞いを差し替えられるよう、最小限のモックを置く。
jest.mock('react-native-google-mobile-ads', () => {
  const AdEventType = {
    LOADED: 'loaded',
    CLOSED: 'closed',
    ERROR: 'error',
    OPENED: 'opened',
  };

  return {
    __esModule: true,
    AdEventType,
    TestIds: { INTERSTITIAL: 'test-interstitial-id' },
    InterstitialAd: {
      createForAdRequest: jest.fn(),
    },
    default: jest.fn(() => ({
      initialize: jest.fn(() => Promise.resolve()),
    })),
  };
});

jest.mock('expo-tracking-transparency', () => ({
  requestTrackingPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: 'granted' }),
  ),
}));
