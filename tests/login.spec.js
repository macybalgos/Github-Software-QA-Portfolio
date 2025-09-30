// // tests/swag-login.spec.js
// const { test, expect } = require('@playwright/test');

// test('Swag Labs login with valid user', async ({ page }) => {
//   await page.goto('/');
//   await page.fill('#user-name', 'standard_user');
//   await page.fill('#password', 'secret_sauce');
//   await page.click('#login-button');

//   // Verify we landed on inventory page
//   await expect(page).toHaveURL(/inventory.html/);
//   await expect(page.locator('.title')).toHaveText('Products');
// });

// test('Swag Labs login with invalid user', async ({ page }) => {
//   await page.goto('/');
//   await page.fill('#user-name', 'invalid_user');
//   await page.fill('#password', 'wrong_password');
//   await page.click('#login-button');

//   // Verify error message
//   await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface');
// });

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login tests', () => {
  test('valid login redirects to inventory', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('invalid login shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');

    await expect(await loginPage.getError()).toContainText('Epic sadface');
  });
});
