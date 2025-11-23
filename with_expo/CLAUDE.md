# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### 開発サーバーの起動
```bash
npm start            # Expo開発サーバーを起動
npm run ios         # iOSシミュレーターで起動
npm run android     # Androidエミュレーターで起動
npm run web         # ウェブブラウザで起動
```

### テストとリント
```bash
npm test            # Jestテストを実行
npm run lint        # ESLintでコードをチェック
```

### 単一テストの実行
```bash
npm test -- --testPathPattern="ファイル名"
npm test -- --testNamePattern="テスト名"
```

## Architecture Overview

### プロジェクト構造
このアプリケーションは、退職を決意した人をサポートするReact Native/Expoアプリです。Expo Routerによるファイルベースルーティングを採用しています。

### 主要な技術スタック
- **フレームワーク**: React Native + Expo (SDK 53)
- **ルーティング**: Expo Router v5 (ファイルベースルーティング)
- **状態管理**: Context API (CalenderProvider, ModalProvider)
- **永続化ストレージ**: AsyncStorage
- **タイプチェック**: TypeScript (strict mode有効)
- **スタイリング**: React Native StyleSheet
- **テスト**: Jest + React Native Testing Library

### ディレクトリ構造とアーキテクチャ
```
/app/                   # Expo Routerのルーティングファイル
  ├── _layout.tsx      # ルートレイアウト（NavigationContainer）
  ├── (tabs)/          # タブナビゲーション
  │   ├── _layout.tsx  # タブレイアウト定義
  │   ├── index.tsx    # ホーム画面ルート
  │   └── ...          # その他のタブ画面
  └── ResignationLetter.tsx  # 退職願/退職届作成画面

/src/
  ├── components/      # 再利用可能なUIコンポーネント
  │   ├── CalenderModal.tsx    # 退職日選択モーダル
  │   ├── CatCarousel.tsx      # 猫キャラクターカルーセル
  │   └── ...
  ├── screens/         # 画面コンポーネント（ビジネスロジック含む）
  │   ├── HomeScreen.tsx       # ホーム画面（営業日カウントダウン）
  │   ├── ResignationLetterScreen.tsx  # 退職願作成
  │   └── ...
  ├── hooks/           # カスタムフック
  │   └── useAsync.tsx         # 非同期状態管理
  └── libs/            # ユーティリティ関数
      └── utils.ts             # 営業日計算など

/assets/              # 画像リソース（猫の画像など）
```

### 重要なコンテキストプロバイダー
1. **CalenderProvider**: 退職日の管理とカレンダーモーダルの制御
2. **ModalProvider**: 全体的なモーダル状態の管理

### ルーティング構造
- タブナビゲーション: ホーム、退職願作成、フォント一覧の3つのタブ
- スタックナビゲーション: 退職願/退職届作成画面への遷移

### 営業日計算ロジック
`src/libs/utils.ts`の`calculateBusinessDays`関数が、土日祝日を除いた営業日を計算します。日本の祝日対応が必要な場合は、この関数の拡張が必要です。

### テスト戦略
- コンポーネントテスト: `__tests__/components/`
- スクリーンテスト: `__tests__/screens/`
- モックファイル: `__mocks__/`（AsyncStorageなど）

### 注意事項
- PDF生成機能は現在モック実装のため、実装時は`react-native-html-to-pdf`の設定が必要
- 猫の画像アセットは`assets/images/cats/`に配置
- TypeScriptのstrict modeが有効なため、型定義を厳密に行うこと