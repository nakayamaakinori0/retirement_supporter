# CLAUDE.md

退職を決意した人をサポートする React Native / Expo アプリ。

App Store で公開中（[退職サポーター](https://apps.apple.com/jp/app/id6745181712)）。v1 は素の React Native 実装だったが、v2 で Expo に移行した。v1 のコードは削除済みで、必要なら git 履歴の `with_vanilla/` から参照できる。

## 開発フロー

SDD (Spec Driven Development)。**実装の前に必ず spec を書く。**

1. **起票** — GitHub Issue を作成し、Project「retirement_supporter」(#13) に追加する

   ```bash
   gh issue create --title "<タイトル>"
   gh project item-add 13 --owner nakayamaakinori0 --url <issue URL>
   ```

2. **spec 作成** — `docs/spec/<issue番号>-<slug>.md` を [TEMPLATE.md](./docs/spec/TEMPLATE.md) から作成する

3. **ブランチ + draft PR** — 実装ブランチを切り、spec をコミットして draft PR を作成する

   ```bash
   git switch -c <issue番号>-<slug>
   git commit -m "spec: <タイトル>"
   gh pr create --draft --title "<タイトル>" --body "Closes #<番号>"
   ```

4. **実装** — spec の受け入れ条件を満たすまで実装する。spec から外れる判断が必要になったら、コードではなく先に spec を更新する

5. **AIレビュー（提出前・最大5サイクル）** — PR を ready にする前に、AIレビューと修正を回す

   ```bash
   /code-review          # 差分をレビュー
   ```

   1サイクル = レビュー → 指摘の修正 → 再レビュー。**最大5サイクル**。
   5サイクル回しても指摘が収束しない場合は、そこで止めて人間のレビューに委ねる（サイクルを延長しない）。
   各サイクルの修正はコミットに残す。

6. **ready** — CI（typecheck / lint / test）が通ったら `gh pr ready` で draft を外す

7. **レビュー通過後にマージ** — 人間のレビューを通過してからマージする。マージ時に spec の `Status` を `Implemented` にする

### 補足

- typo 修正・依存更新・フォーマットのみの変更は spec 不要
- ブランチは main から切る。main への直接コミットはしない

## ドキュメント管理

ドキュメントはすべてこのリポジトリで管理する（外部の Notion 等に置かない）。

- `docs/spec/` — 機能ごとの spec
- `CLAUDE.md` — 開発フローとアーキテクチャ
- `README.md` — 概要とセットアップ

**ドキュメントの変更もコードと同じく PR を通す。** main への直接コミットはしない。
ドキュメントのみの変更は spec 不要で、`docs: <内容>` のコミットメッセージで PR を出す。

## CI

### ローカル（lefthook）

`npm install` 時に `prepare` スクリプトが git hook を設置する。設定は [lefthook.yml](./lefthook.yml)。

| フック | 内容 |
| --- | --- |
| pre-commit | `tsc --noEmit`（型チェック）+ 変更ファイルへの `eslint`（警告も許容しない） |
| pre-push | `npm test`（ユニットテスト） |

速い静的解析を commit 時、遅いテストを push 時に置いている。
緊急時は `LEFTHOOK=0 git commit ...` で回避できるが、原則使わない。

### GitHub Actions

[.github/workflows/ci.yml](./.github/workflows/ci.yml) が PR と main への push で typecheck / lint / test を実行する。

## コミットメッセージ

`Co-Authored-By:` 行は付けない。

## Development Commands

### 開発サーバーの起動

```bash
npm start            # Expo開発サーバーを起動
npm run ios          # iOSシミュレーターで起動
npm run android      # Androidエミュレーターで起動
npm run web          # ウェブブラウザで起動
```

### テストとリント

```bash
npm test             # Jestテストを実行
npm run lint         # ESLintでコードをチェック（警告も許容しない）
npm run typecheck    # tsc --noEmit で型チェック
```

### 単一テストの実行

```bash
npm test -- --testPathPattern="ファイル名"
npm test -- --testNamePattern="テスト名"
```

## Architecture Overview

Expo Router によるファイルベースルーティングを採用。

### 技術スタック

- **フレームワーク**: React Native 0.79 + Expo (SDK 53)
- **ルーティング**: Expo Router v5
- **状態管理**: Context API (`RetirementDateProvider`, `ModalProvider`)
- **永続化**: AsyncStorage
- **日付処理**: dayjs（`src/libs/day.ts` でプラグイン設定済みのインスタンスを default export）
- **PDF生成**: expo-print（HTML → PDF）+ expo-sharing（共有）
- **型**: TypeScript strict mode
- **スタイリング**: React Native StyleSheet
- **テスト**: Jest (jest-expo) + React Native Testing Library

### ディレクトリ構造

```
/app/                             # Expo Router のルーティングファイル
  ├── _layout.tsx                 # ルートレイアウト（Provider 群）
  ├── retirement-day.tsx          # 退職当日のお祝い画面
  ├── form-retirement-letter-confirm.tsx  # 退職願・退職届の確認/PDF生成画面
  └── (tabs)/
      ├── _layout.tsx             # タブレイアウト定義
      ├── index.tsx               # ホーム（残り営業日カウントダウン）
      ├── form-retirement-letter.tsx  # 退職願・退職届の入力フォーム
      └── font-styles.tsx         # フォント一覧

/src/
  ├── components/                 # UIコンポーネント + Context Provider
  │   ├── RetirementDateProvider.tsx  # 退職日の Context
  │   ├── ModalProvider.tsx           # モーダル状態の Context
  │   ├── CalenderModal.tsx           # 退職日選択モーダル
  │   ├── Partner.tsx                 # パートナー猫
  │   ├── Quote.tsx / Balloon.tsx / HamburgerButton.tsx
  │   └── __tests__/                  # コンポーネントテスト（コロケーション）
  ├── constants/
  │   ├── colors.ts               # 配色定義（Colors）
  │   └── images.ts               # 画像アセットの参照
  ├── hooks/
  │   └── useModal.ts
  └── libs/
      ├── day.ts                  # dayjs 設定（locale ja / TZ Asia/Tokyo / 各プラグイン）
      ├── generateRetirementLetterPDF.ts  # PDF用HTMLの生成
      └── isOuterAreaClick.ts

/assets/                          # 画像リソース（cats/ に猫画像）
/__tests__/                       # アプリ全体のテスト
```

### ルーティング構造

- タブ: `退職願・退職届` / `ホーム` / `フォント`（`app/(tabs)/_layout.tsx` の定義順）
- スタック: フォーム → `form-retirement-letter-confirm`（確認・PDF生成）、残り0営業日で `retirement-day` へ遷移

### Context Provider

1. **RetirementDateProvider** — 退職日（`YYYY-MM-DD` の文字列）を保持。永続化は AsyncStorage のキー `retirementDate` で、Provider ではなく各画面が読み書きしている
2. **ModalProvider** — `useModal()` の `showModal(render, props, ...)` でモーダルを表示

### 営業日計算

`app/(tabs)/index.tsx` の `calculateRemainingWeekdays` が、今日から退職日までの土日を除いた日数を数える。**祝日は未対応**。共通ロジックとして切り出されていない点に注意。

### 退職願・退職届の生成フロー

1. `(tabs)/form-retirement-letter.tsx` — 願/届の選択、会社名・氏名などを入力
2. `form-retirement-letter-confirm.tsx` — 縦書きレイアウトでプレビュー
3. `src/libs/generateRetirementLetterPDF.ts` の `generateRetirementLetterHTML()` で HTML を生成
4. `expo-print` で PDF 化し、`expo-sharing` で共有

`taishokutodoke_yoko_template.pdf` は参考テンプレート（アプリからは未使用）。

### 注意事項

- 配色は `src/constants/colors.ts` の `Colors` を使う。色をハードコードしない
  - 旧配色（緑系 `#F5FCF4` / `#2E7D32`）から Notion 風モノトーンへ移行中。`(tabs)/_layout.tsx`、`retirement-day.tsx`、`font-styles.tsx`、`src/components/` 配下は未移行
- パスエイリアス `@/*` がリポジトリルートを指す。ただし現状は相対パス import が多く混在している
- `package.json` に `react-native-html-to-pdf` / `react-native-pdf` / `react-native-share` が残っているが、PDF 生成は expo-print に移行済みで未使用
- TypeScript strict mode 有効
