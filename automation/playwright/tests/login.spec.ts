import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MenuPage } from '../pages/MenuPage';
import { ReportHelper } from '../helpers/ReportHelper';
import { allure } from 'allure-playwright';

test.describe('Login Tests (with Performance + Resource Tracking)', () => {
  let startTime: number;
  let resources: {
    url: string;
    method: string;
    status: number;
    duration: number;
    type: string;
    sizeKB: number;
  }[];
  let consoleLogs: { type: string; message: string }[];

  test.beforeEach(async ({ page }) => {
    startTime = Date.now();
    resources = [];
    consoleLogs = [];

    // ✅ Capture console logs
    page.on('console', (msg) => {
      consoleLogs.push({
        type: msg.type(),
        message: msg.text(),
      });
    });

    // ✅ Capture request start times
    page.on('request', (req) => {
      (req as any)._startTime = Date.now();
    });

    // ✅ Capture all responses (API, image, CSS, JS, etc.)
    page.on('response', async (res) => {
      try {
        const req = res.request();
        const start = (req as any)._startTime || Date.now();
        const duration = Date.now() - start;

        const body = await res.body().catch(() => Buffer.from([]));
        const sizeKB = Buffer.byteLength(body) / 1024;

        resources.push({
          url: res.url(),
          method: req.method(),
          status: res.status(),
          duration,
          type: req.resourceType?.() || 'unknown',
          sizeKB,
        });
      } catch (err) {
        resources.push({
          url: res.url(),
          method: res.request().method(),
          status: res.status(),
          duration: 0,
          type: 'unknown',
          sizeKB: 0,
        });
      }
    });
  });

  test.afterEach(async ({}, testInfo) => {
    const duration = Date.now() - startTime;
    ReportHelper.recordPerformance(testInfo.title, duration, resources, consoleLogs);
  });

  test.afterAll(async () => {
    ReportHelper.saveReport();
  });

  // 🧪 TC001
  test('TC001: Verify login page loads successfully', async ({ page }) => {
    await allure.description('Verify login page loads successfully and key elements are visible.');
    await allure.owner('Rosbel');
    await allure.severity('medium');
    await allure.feature('Login');
    await allure.story('User navigates to login page and verifies UI elements');

    const loginPage = new LoginPage(page);

    await allure.step('Navigate to the Swag Labs login page', async () => {
      await loginPage.goto();
    });

    await allure.step('Verify the page title is correct', async () => {
      await expect(page).toHaveTitle(/Swag Labs/);
    });

    await allure.step('Verify username and password fields are visible', async () => {
      await expect(page.locator('[data-test="username"]')).toBeVisible();
      await expect(page.locator('[data-test="password"]')).toBeVisible();
    });

    await allure.step('Verify the login button is visible', async () => {
      await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    });

    await allure.step('Verify the login page logo text', async () => {
      await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
    });
  });

  // 🧪 TC002
  test('TC002: Login with valid credentials', async ({ page }) => {
    await allure.description('Validate that a user with valid credentials can successfully log in.');
    await allure.owner('Rosbel');
    await allure.severity('critical');
    await allure.feature('Login');
    await allure.story('User logs in using valid credentials.');

    const loginPage = new LoginPage(page);

    await allure.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await allure.step('Enter valid username and password', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
    });

    await allure.step('Verify redirection to inventory page', async () => {
      await expect(page).toHaveURL(/inventory.html/);
    });

    await allure.step('Verify Products page title', async () => {
      await expect(page.locator('.title')).toHaveText('Products');
    });
  });

  // 🧪 TC003
  test('TC003: Login with invalid username', async ({ page }) => {
    await allure.description('Verify login fails with an invalid username.');
    await allure.owner('Rosbel');
    await allure.severity('high');
    await allure.feature('Login');
    await allure.story('User attempts to login with incorrect username.');

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('invalid_username', 'secret_sauce');

    await expect(await loginPage.getError()).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  // 🧪 TC004
  test('TC004: Login with blank fields', async ({ page }) => {
    await allure.description('Verify login fails with blank username and password.');
    await allure.owner('Rosbel');
    await allure.severity('medium');
    await allure.feature('Login');
    await allure.story('User attempts to login without credentials.');

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');

    await expect(await loginPage.getError()).toContainText('Epic sadface: Username is required');
  });

  // 🧪 TC005
  test('TC005: Login with invalid password', async ({ page }) => {
    await allure.description('Verify login fails with a valid username and invalid password.');
    await allure.owner('Rosbel');
    await allure.severity('high');
    await allure.feature('Login');
    await allure.story('User attempts to login with incorrect password.');

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'invalid_password');

    await expect(await loginPage.getError()).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  // 🧪 TC006
  test('TC006: Verify password field masking', async ({ page }) => {
    await allure.description('Verify that the password field masks user input.');
    await allure.owner('Rosbel');
    await allure.severity('medium');
    await allure.feature('Login');
    await allure.story('User checks password field masking.');

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const type = await page.locator('[data-test="password"]').getAttribute('type');
    await expect(type).toBe('password');
  });

  // 🧪 TC010
  test('TC010: Verify successful logout process', async ({ page }) => {
    await allure.description('Verify that a logged-in user can successfully log out.');
    await allure.owner('Rosbel');
    await allure.severity('critical');
    await allure.feature('Logout');
    await allure.story('User logs out successfully.');

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);

    await expect(page.locator('.title')).toHaveText('Products');
    await menuPage.logout();

    await expect(await menuPage.isLoginPageVisible()).toBeTruthy();

    console.log('✅ User successfully logged out');
  });

  // 🧪 TC011
  test('TC011: Locked out user shows proper error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(await loginPage.getError()).toContainText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});
