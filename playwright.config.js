// // playwright.config.js
// const { defineConfig, devices } = require('@playwright/test');

// module.exports = defineConfig({
//   testDir: './tests',
//   timeout: 30_000,
//   reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
//   use: {
//     baseURL: 'https://www.saucedemo.com/',
//     headless: true,
//     screenshot: 'only-on-failure',
//     video: 'retain-on-failure',
//     trace: 'on-first-retry',
//   },
//   projects: [
//     { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
//     { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
//     { name: 'webkit', use: { ...devices['Desktop Safari'] } },
//   ],
// });


// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  reporter: [
    ['list'],
    ['junit', { outputFile: 'test-results/results.xml' }], // JUnit for CI
    ['html', { outputFolder: 'playwright-report', open: 'never' }] // HTML report
  ],
  use: {
    baseURL: 'https://www.saucedemo.com/',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
