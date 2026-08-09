# CLAUDE.md

このリポジトリで作業する際のガイド。

## リポジトリ構成

```
retirementSupporter/
├── with_vanilla/   # v1: 素の React Native。App Store 公開済み (id6745181712)
├── with_expo/      # v2: Expo SDK 53 + Expo Router v5。現在の開発対象
└── docs/spec/      # 実装仕様書 (SDD)
```

新規開発は `with_expo/` で行う。詳細は [with_expo/CLAUDE.md](./with_expo/CLAUDE.md)。

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

5. **ready** — テストと lint が通ったら `gh pr ready` で draft を外す

6. **レビュー通過後にマージ** — レビューを通過してからマージする。マージ時に spec の `Status` を `Implemented` にする

### 補足

- typo 修正・依存更新・フォーマットのみの変更は spec 不要
- ブランチは main から切る。main への直接コミットはしない

## コミットメッセージ

`Co-Authored-By:` 行は付けない。
