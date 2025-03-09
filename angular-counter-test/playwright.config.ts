import { defineConfig, devices } from '@playwright/test';

/**
 * Playwrightの設定ファイル
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  /* テスト実行の最大時間 */
  timeout: 30 * 1000,
  /* テスト実行時の期待値 */
  expect: {
    /**
     * 期待値の最大待機時間
     * @see https://playwright.dev/docs/test-assertions
     */
    timeout: 5000
  },
  /* テスト実行時のレポート */
  reporter: 'html',
  /* 共有設定 */
  use: {
    /* ベースURL */
    baseURL: 'http://localhost:4200',
    /* すべてのテストでトレースを取得 */
    trace: 'on-first-retry',
    /* スクリーンショットを取得 */
    screenshot: 'only-on-failure',
  },

  /* プロジェクト設定 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* ローカルサーバーの設定 */
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env['CI'],
  },
});
