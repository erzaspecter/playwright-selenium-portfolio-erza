import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  projects: [
    {
      name: 'ui-saucelabs',
      testDir: './01-saucelabs-project/tests',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com'
      },
    },
    {
      name: 'api-testing',
      testDir: './02-api-testing/tests',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com'
      },
    },
  ],
});