import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  // ✅ Opsional: tentukan pattern file test
  testMatch: /.*\.(spec|test)\.(js|ts)/,  // default sudah ini
  
  projects: [
    {
      name: 'ui-saucelabs',
      testDir: './tests',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com'
      },
    },
  ],
});