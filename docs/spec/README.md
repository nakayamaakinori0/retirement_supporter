# Spec (SDD: Spec Driven Development)

実装の前に必ずここに spec を作る。spec なしのコード変更は原則行わない。

## ファイル命名

```
docs/spec/<issue番号>-<kebab-case-slug>.md
```

例: `docs/spec/15-clear-retirement-date.md`

## 書き方

[TEMPLATE.md](./TEMPLATE.md) をコピーして埋める。

## ライフサイクル

1. Issue 起票時、または実装ブランチを切る直前に `Status: Draft` で作成
2. draft PR の最初のコミットに spec を含める（spec がレビューの起点）
3. 内容が固まったら `Status: Approved`
4. 実装完了・マージ時に `Status: Implemented`

## 例外

typo 修正・依存更新・フォーマットのみの変更は spec 不要。
