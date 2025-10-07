
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');


test.describe('Login tests', () => {
  test('Valid login redirects to inventory', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Invalid login with invalid password shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');

    await expect(await loginPage.getError()).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Invalid login with locked out shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(await loginPage.getError()).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});
