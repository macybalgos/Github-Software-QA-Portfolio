
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
// import { allure } from 'allure-playwright';
 const { MenuPage } = require('../pages/MenuPage'); 

test.describe('Login tests', () => {

  
  test('TC001: Verify login page loads successfully', async ({ page }) => {
    // Step 1: Go to Swag Labs login page
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Step 2: Verify page title
    await expect(page).toHaveTitle(/Swag Labs/);
 
    // Step 3: Verify username and password fields are visible
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();

    // Step 4: Verify login button is visible
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // Step 5: (Optional) Check for logo or header text
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
  });

  test('TC002: Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

   test('TC003: Login with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid_username', 'secret_sauce');

    await expect(await loginPage.getError()).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('TC004: Login with blank fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');

    await expect(await loginPage.getError()).toContainText('Epic sadface: Username is required');
  });

    test('TC005: Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'invalid_password');

    await expect(await loginPage.getError()).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

   test('TC006: Verify password field masking', async ({ page }) => {
     const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');

      await expect(page).toHaveURL(/inventory.html/);
      await expect(page.locator('.title')).toHaveText('Products');

  });

     test('TC010: Verify successful logout process', async ({ page }) => {
     const loginPage = new LoginPage(page);
     const menuPage = new MenuPage(page);
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');

      await expect(page).toHaveURL(/inventory.html/);
      await expect(page.locator('.title')).toHaveText('Products');


      await menuPage.logout();
      await expect(await menuPage.isLoginPageVisible()).toBeTruthy();
     console.log('User is logged out')
  });




  test('Invalid login with locked out shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(await loginPage.getError()).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});
