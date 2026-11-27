import { test, expect } from '@playwright/test';

test.describe('Riazi 1 v5 3-Stage Step Flow, Reset & Mobile', () => {
  test('moves from lesson to one-by-one examples, then exercises, and resets step mastery', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /فصل 1/ }).first().click();
    await expect(page.getByText('گام 1 از')).toBeVisible();

    // Enter one-by-one examples stage
    await page.getByRole('button', { name: /شروع مثال‌های حل‌شده/ }).click();
    await expect(page.getByText('مثال 1 از')).toBeVisible();

    // Reveal first example solution and advance to next example
    await page.getByRole('button', { name: /شروع حل گام‌به‌گام|نمایش راه‌حل کامل/ }).first().click();
    await page.getByRole('button', { name: 'مثال بعدی' }).click();
    await expect(page.getByText('مثال 2 از')).toBeVisible();

    // Jump to exercises stage via tab
    await page.getByRole('tab', { name: /تمرین‌ها/ }).click();
    await expect(page.getByText('تمرین 1 از')).toBeVisible();

    // Reset current step mastery via 2-tap confirmation
    await page.getByRole('button', { name: 'ریست این گام' }).click();
    await page.getByRole('button', { name: 'ریست گام؟' }).click();
    await expect(page.getByText('تسلط گام: 0٪')).toBeVisible();
  });

  test('has zero horizontal overflow on 375px mobile viewport on home and chapter pages', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    let overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);

    await page.getByRole('link', { name: /فصل 4/ }).first().click();
    overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
});
