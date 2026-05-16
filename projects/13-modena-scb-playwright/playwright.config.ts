// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  projects: [
    {
      name: 'ui-modena',
      testDir: './tests',
      use: {
        ...devices['Desktop Chrome'],
        // baseURL tidak perlu diset, atau bisa dikosongkan
      },
    },
  ],
});