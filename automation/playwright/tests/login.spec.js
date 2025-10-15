
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
// import { allure } from 'allure-playwright';
const { MenuPage } = require('../pages/MenuPage');

const allure = require('allure-js-commons');


test.describe('Login Tests', () => {

  test('TC001: Verify login page loads successfully', async ({ page }) => {

    // 🔖 Allure metadata
    await allure.description('This test verifies that the Swag Labs login page loads successfully and all key elements are visible.');
    await allure.owner('Rosbel');
    await allure.severity('medium');
    await allure.feature('Login');
    await allure.story('User navigates to login page and verifies UI elements');

    const loginPage = new LoginPage(page);

    // 🪜 Step 1: Navigate to Swag Labs login page
    await allure.step('Navigate to the Swag Labs login page', async () => {
      await loginPage.goto();
    });

    // 🪜 Step 2: Verify page title
    await allure.step('Verify the page title is correct', async () => {
      await expect(page).toHaveTitle(/Swag Labs/);
    });

    // 🪜 Step 3: Verify username and password fields
    await allure.step('Verify username and password fields are visible', async () => {
      await expect(page.locator('[data-test="username"]')).toBeVisible();
      await expect(page.locator('[data-test="password"]')).toBeVisible();
    });

    // 🪜 Step 4: Verify login button
    await allure.step('Verify the login button is visible', async () => {
      await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    });

    // 🪜 Step 5: Verify logo or header text
    await allure.step('Verify the login page logo text', async () => {
      await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
    });
  });

  test('TC002: Login with valid credentials', async ({ page }) => {
    // 🔖 Allure metadata
    await allure.description('This test validates that a user with valid credentials can successfully log in to the Swag Labs application.');
    await allure.owner('Rosbel');
    await allure.severity('Critical');
    await allure.feature('Login');
    await allure.story('User logs in using valid credentials and is redirected to the products page.');

    const loginPage = new LoginPage(page);

    // 🪜 Step 1: Navigate to login page
    await allure.step('Navigate to the Swag Labs login page', async () => {
      await loginPage.goto();
    });

    // 🪜 Step 2: Enter valid credentials
    await allure.step('Enter valid username and password', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
    });

    // 🪜 Step 3: Verify user is redirected to inventory page
    await allure.step('Verify redirection to inventory page after login', async () => {
      await expect(page).toHaveURL(/inventory.html/);
    });

    // 🪜 Step 4: Verify the Products page title
    await allure.step('Verify the Products page title is displayed correctly', async () => {
      await expect(page.locator('.title')).toHaveText('Products');
    });

  });

  test('TC003: Login with invalid username', async ({ page }) => {

    // 🔖 Allure metadata
    await allure.description('This test verifies that login fails when using an invalid username.');
    await allure.owner('Rosbel');
    await allure.severity('high');
    await allure.feature('Login');
    await allure.story('User attempts to login with incorrect username.');

    const loginPage = new LoginPage(page);

    // 🪜 Step 1: Navigate to login page
    await allure.step('Navigate to Swag Labs login page', async () => {
      await loginPage.goto();
    });

    // 🪜 Step 2: Enter invalid username
    await allure.step('Enter invalid username and valid password', async () => {
      await loginPage.login('invalid_username', 'secret_sauce');
    });

    // 🪜 Step 3: Verify error message
    await allure.step('Verify error message for invalid username', async () => {
      await expect(await loginPage.getError()).toContainText(
        'Epic sadface: Username and password do not match any user in this service'
      );
    });
  });


  // 🔹 TC004: Login with blank fields
  test('TC004: Login with blank fields', async ({ page }) => {

    // 🔖 Allure metadata
    await allure.description('This test verifies that login fails when both username and password fields are left blank.');
    await allure.owner('Rosbel');
    await allure.severity('medium');
    await allure.feature('Login');
    await allure.story('User attempts to login without entering any credentials.');

    const loginPage = new LoginPage(page);

    // 🪜 Step 1: Navigate to login page
    await allure.step('Navigate to Swag Labs login page', async () => {
      await loginPage.goto();
    });

    // 🪜 Step 2: Leave both fields blank
    await allure.step('Attempt to login with empty username and password', async () => {
      await loginPage.login('', '');
    });

    // 🪜 Step 3: Verify error message
    await allure.step('Verify error message for empty credentials', async () => {
      await expect(await loginPage.getError()).toContainText(
        'Epic sadface: Username is required'
      );
    });
  });


  // 🔹 TC005: Login with invalid password
  test('TC005: Login with invalid password', async ({ page }) => {

    // 🔖 Allure metadata
    await allure.description('This test verifies that login fails when a valid username is used with an invalid password.');
    await allure.owner('Rosbel');
    await allure.severity('high');
    await allure.feature('Login');
    await allure.story('User attempts to login with incorrect password.');

    const loginPage = new LoginPage(page);

    // 🪜 Step 1: Navigate to login page
    await allure.step('Navigate to Swag Labs login page', async () => {
      await loginPage.goto();
    });

    // 🪜 Step 2: Enter valid username and invalid password
    await allure.step('Enter valid username but invalid password', async () => {
      await loginPage.login('standard_user', 'invalid_password');
    });

    // 🪜 Step 3: Verify error message
    await allure.step('Verify error message for invalid password', async () => {
      await expect(await loginPage.getError()).toContainText(
        'Epic sadface: Username and password do not match any user in this service'
      );
    });
  });


  // 🔹 TC006: Verify password field masking
  test('TC006: Verify password field masking', async ({ page }) => {

    // 🔖 Allure metadata
    await allure.description('This test verifies that the password field hides user input (masking) for security purposes.');
    await allure.owner('Rosbel');
    await allure.severity('medium');
    await allure.feature('Login');
    await allure.story('User checks password field input masking.');

    const loginPage = new LoginPage(page);

    // 🪜 Step 1: Navigate to login page
    await allure.step('Navigate to Swag Labs login page', async () => {
      await loginPage.goto();
    });

    // 🪜 Step 2: Verify password field type
    await allure.step('Verify the password field input type is "password"', async () => {
      const type = await page.locator('[data-test="password"]').getAttribute('type');
      await expect(type).toBe('password');
    });
  });


  // 🔹 TC010: Verify successful logout process
  test('TC010: Verify successful logout process', async ({ page }) => {

    // 🔖 Allure metadata
    await allure.description('This test verifies that a logged-in user can successfully log out and return to the login page.');
    await allure.owner('Rosbel');
    await allure.severity('critical');
    await allure.feature('Logout');
    await allure.story('User logs out successfully after logging in.');

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    // 🪜 Step 1: Login with valid credentials
    await allure.step('Login with valid credentials', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await expect(page).toHaveURL(/inventory.html/);
    });

    // 🪜 Step 2: Verify user is on Products page
    await allure.step('Verify Products page is displayed', async () => {
      await expect(page.locator('.title')).toHaveText('Products');
    });

    // 🪜 Step 3: Perform logout action
    await allure.step('Click menu and logout from application', async () => {
      await menuPage.logout();
    });

    // 🪜 Step 4: Verify user is redirected to login page
    await allure.step('Verify redirection to login page after logout', async () => {
      await expect(await menuPage.isLoginPageVisible()).toBeTruthy();
    });

    console.log('✅ User successfully logged out');
  });

  test('Invalid login with locked out shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(await loginPage.getError()).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});
