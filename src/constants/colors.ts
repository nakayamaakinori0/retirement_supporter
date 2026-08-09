/**
 * アプリケーション全体で使用する配色定義
 * Notionライクなシンプルで落ち着いた配色
 */

export const Colors = {
  // Primary colors
  primary: '#37352F',    // ほぼ黒（CTA、見出し）
  secondary: '#9B9A97',  // グレー（補助テキスト、アイコン）
  accent: '#FFFFFF',     // 白（ボタン内テキスト、反転時）

  // Background colors
  bg: '#FFFFFF',
  bgSecondary: '#F7F6F3', // セカンダリ背景（より薄い）
  border: '#E6E6E4',

  // Status colors
  error: '#E03E3E',
  success: '#4DAB9A',
  warning: '#CB7B37',
} as const;

export type ColorKey = keyof typeof Colors;
