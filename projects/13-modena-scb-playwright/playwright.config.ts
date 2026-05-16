// playwright.config.js
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
      name: 'ui-modena',
      testDir: './tests',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.modena.com/seamless-go-subscription/id_en', // ← base URL
      },
    },
  ],
});