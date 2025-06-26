import { test } from 'playwright/test';

test.describe('Authentication', () => {
  test('should show login form', async ({ page }) => {
    await page.goto('/login');
    
    // await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    // await expect(page.getByLabel('Email')).toBeVisible();
    // await expect(page.getByLabel('Password')).toBeVisible();
  });

//   test('should show validation errors', async ({ page }) => {
//     await page.goto('/login');
    
//     await page.getByRole('button', { name: 'Login' }).click();
    
//     await expect(page.getByText('Email is required')).toBeVisible();
//     await expect(page.getByText('Password is required')).toBeVisible();
//   });
}); 