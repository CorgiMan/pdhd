import { test } from 'playwright/test';

test.describe('Posts', () => {
//   test.beforeEach(async ({ page }) => {
//     // Login before each test
//     await page.goto('/login');
//     await page.getByLabel('Email').fill('test@example.com');
//     await page.getByLabel('Password').fill('password123');
//     await page.getByRole('button', { name: 'Login' }).click();
//   });

//   test('should create a new post', async ({ page }) => {
//     await page.goto('/posts');
    
//     await page.getByRole('button', { name: 'New Post' }).click();
//     await page.getByLabel('Title').fill('Test Post');
//     await page.getByLabel('Content').fill('This is a test post');
//     await page.getByRole('button', { name: 'Save' }).click();
    
//     await expect(page.getByText('Test Post')).toBeVisible();
//   });

//   test('should delete a post', async ({ page }) => {
//     await page.goto('/posts');
    
//     await page.getByRole('button', { name: 'Delete' }).first().click();
//     await page.getByRole('button', { name: 'Confirm' }).click();
    
//     await expect(page.getByText('Post deleted successfully')).toBeVisible();
//   });
}); 