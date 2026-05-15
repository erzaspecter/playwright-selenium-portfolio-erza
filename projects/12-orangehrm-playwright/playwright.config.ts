// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,  // Tambah retry untuk test lambat
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  // ✅ TAMBAHKAN INI - Timeout global untuk setiap test
  timeout: 120000,  // 2 menit (naik dari default 30 detik)
  
  use: {
    headless: false,  // Kamu sudah punya ini
    
    // ✅ TAMBAHKAN INI - Timeout untuk setiap action
    actionTimeout: 30000,      // 30 detik untuk setiap action (click, fill, dll)
    navigationTimeout: 60000,  // 60 detik untuk navigasi halaman
    
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  
  // ✅ TAMBAHKAN INI - Expect timeout untuk assertions
  expect: {
    timeout: 30000,  // 30 detik untuk expect().toBeVisible() dll
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});