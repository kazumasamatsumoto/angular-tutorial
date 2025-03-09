import { test, expect } from '@playwright/test';

test.describe('カウンターアプリケーションのE2Eテスト', () => {
  // 各テストの前にページを読み込む
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ページタイトルが正しく表示されること', async ({ page }) => {
    // ページタイトルを確認
    await expect(page.locator('h1')).toHaveText('Angular Counter Test');
  });

  test('初期状態でカウンターの値が0であること', async ({ page }) => {
    // カウンターコンポーネントの初期値を確認
    await expect(page.locator('.counter-value')).toHaveText('0');
    
    // 表示コンポーネントの初期値を確認
    await expect(page.locator('.count-value')).toHaveText('0');
  });

  test('増加ボタンをクリックするとカウンターの値が増加すること', async ({ page }) => {
    // 増加ボタンを取得
    const incrementButton = page.locator('.increment-button');
    
    // 初期値を確認
    await expect(page.locator('.counter-value')).toHaveText('0');
    await expect(page.locator('.count-value')).toHaveText('0');
    
    // ボタンをクリック
    await incrementButton.click();
    
    // カウンターの値が1になったことを確認
    await expect(page.locator('.counter-value')).toHaveText('1');
    await expect(page.locator('.count-value')).toHaveText('1');
  });

  test('増加ボタンを複数回クリックするとカウンターの値が正しく増加すること', async ({ page }) => {
    // 増加ボタンを取得
    const incrementButton = page.locator('.increment-button');
    
    // 初期値を確認
    await expect(page.locator('.counter-value')).toHaveText('0');
    await expect(page.locator('.count-value')).toHaveText('0');
    
    // ボタンを3回クリック
    for (let i = 0; i < 3; i++) {
      await incrementButton.click();
    }
    
    // カウンターの値が3になったことを確認
    await expect(page.locator('.counter-value')).toHaveText('3');
    await expect(page.locator('.count-value')).toHaveText('3');
  });

  test('カウンターコンポーネントと表示コンポーネントの値が同期していること', async ({ page }) => {
    // 増加ボタンを取得
    const incrementButton = page.locator('.increment-button');
    
    // ボタンを5回クリック
    for (let i = 0; i < 5; i++) {
      await incrementButton.click();
      
      // 各クリック後に両方のコンポーネントの値が同じであることを確認
      const expectedValue = String(i + 1);
      await expect(page.locator('.counter-value')).toHaveText(expectedValue);
      await expect(page.locator('.count-value')).toHaveText(expectedValue);
    }
  });

  test('UIコンポーネントが正しく表示されていること', async ({ page }) => {
    // カウンターコンポーネントのタイトルを確認
    await expect(page.locator('.counter-container h2')).toHaveText('カウンター');
    
    // 表示コンポーネントのタイトルを確認
    await expect(page.locator('.display-container h2')).toHaveText('表示コンポーネント');
    
    // 増加ボタンのテキストを確認
    await expect(page.locator('.increment-button')).toHaveText('増加');
    
    // 表示コンポーネントの説明テキストを確認
    await expect(page.locator('.display-value p')).toContainText('カウンターの現在値:');
  });
});
