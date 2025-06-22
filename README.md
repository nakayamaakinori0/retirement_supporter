# 退職サポーター (Retirement Supporter)

退職までの平日をカウントダウンし、励ましの名言とパートナーキャラクターで退職への道のりをサポートするReact Nativeアプリです。

## 機能

- **タブナビゲーション**: ホーム画面とフォント設定画面をタブで切り替え
- **退職日カウントダウン**: 設定した退職日までの平日を自動計算・表示
- **励ましの名言**: 日々のモチベーション維持をサポート
- **パートナーキャラクター**: 可愛いキャラクターがユーザーを応援
- **カレンダー機能**: 退職日の設定と視覚的な確認
- **フォント設定**: アプリで使用するフォントスタイルの確認・選択

## 技術スタック

- **React Native**: 0.74.0
- **TypeScript**: 5.0.4
- **React Navigation**: v6 (タブナビゲーション、スタックナビゲーション)
- **AsyncStorage**: データの永続化
- **React Native Calendars**: カレンダー表示
- **その他**: Countdown Component、Safe Area Context、Screens

## セットアップ

### 必要な環境
- Node.js >= 18
- iOS: Xcode、CocoaPods (1.13+ < 1.15)
- Android: Android Studio/SDK

### インストール

```bash
# 依存関係のインストール
npm install

# iOS向けCocoaPodsのインストール
cd ios && pod install && cd ..
```

## 開発コマンド

```bash
# 開発サーバーの起動
npm start

# iOSアプリの起動
npm run ios

# Androidアプリの起動
npm run android

# リンターの実行
npm run lint

# テストの実行
npm test
```

## プロジェクト構造

```
src/
├── components/     # 再利用可能UIコンポーネント
│   ├── Balloon.tsx
│   ├── Calendar.tsx
│   ├── Partner.tsx
│   ├── Quote.tsx
│   ├── CalenderProvider.tsx
│   └── ModalProvider.tsx
├── screens/        # 画面コンポーネント
│   ├── HomeScreen.tsx
│   ├── RetirementDayScreen.tsx
│   └── FontStylesScreen.tsx
├── hooks/          # カスタムフック
│   ├── useCalender.tsx
│   └── useModal.tsx
├── libs/           # ユーティリティ
├── constants/      # 定数（画像等）
├── types.ts        # TypeScript型定義
└── config.ts       # アプリ設定
```

## ナビゲーション構造

- **タブナビゲーター**
  - ホーム（退職カウントダウン）
  - フォント（フォントスタイル確認）
- **スタックナビゲーター**
  - 退職日設定画面

## デザイン

UIデザインはFigmaで管理されています：
[Figmaデザインボード](https://www.figma.com/board/8HbG3OtZAPNrNTQORY7ax3/%E3%83%9C%E3%83%BC%E3%83%89?node-id=0-1&t=U2qeVxot8lWWvub9-1)

## 開発者向け情報

- パスエイリアス `@/` でプロジェクトルートを参照
- テーマカラー: `#F5FCF4` (淡い緑)
- コードスタイル: ESLint + Prettier (シングルクォート、trailing comma)
- 状態管理: React Context API
