# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application called "retirementSupporter" (退職サポーター) that helps users count down working days until retirement with motivational quotes and a partner character.

## Essential Commands

### Development
```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios
# or
npx react-native run-ios

# Run on Android
npm run android

# Run linter
npm run lint

# Run tests
npm test
```

### iOS-specific setup
```bash
cd ios && pod install
```

## Architecture

### Technology Stack
- **React Native 0.74.0** with TypeScript 5.0.4
- **Navigation**: React Navigation v6 (Native Stack)
- **State Management**: React Context API (ModalProvider, CalenderProvider)
- **Storage**: AsyncStorage for persistence
- **Testing**: Jest with react-test-renderer

### Project Structure
```
src/
├── components/     # Reusable UI components (Balloon, Calendar, Partner, Quote)
├── screens/        # Screen components (Home, RetirementDay, FontStyles)
├── hooks/          # Custom hooks (useCalender, useModal)
├── libs/           # Utilities (day.js wrapper, click detection)
├── constants/      # App constants (images)
├── types.ts        # TypeScript definitions
└── config.ts       # App configuration
```

### Key Patterns

1. **Path Aliasing**: `@/` maps to project root (configured in tsconfig.json, babel.config.js, and metro.config.js)

2. **Navigation Flow**: 
   - Stack Navigator with three screens: Home → RetirementDay → FontStyles
   - Navigation managed through React Navigation's native stack

3. **State Management**:
   - Global state via Context providers wrapped in App.tsx
   - Custom hooks (useCalender, useModal) for accessing context
   - Retirement date persisted in AsyncStorage

4. **Component Architecture**:
   - Functional components with TypeScript
   - StyleSheet.create() for optimized styles
   - Consistent green theme (#F5FCF4 background)

### Development Notes

- **Node Version**: Requires Node.js >=18
- **Platform Requirements**: 
  - iOS: Xcode, CocoaPods (1.13+ but <1.15)
  - Android: Android Studio/SDK
- **Code Style**: ESLint + Prettier (single quotes, no arrow parens, trailing commas)
- **Design Reference**: Figma design linked in README.md

### Common Tasks

- When adding new dependencies: Run `cd ios && pod install` for iOS
- When modifying navigation: Update stack navigator in App.tsx
- When adding new images: Add to src/constants/images.ts
- When creating new components: Follow existing pattern in src/components/