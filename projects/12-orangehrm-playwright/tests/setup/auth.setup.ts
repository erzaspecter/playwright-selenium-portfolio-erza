// tests/setup/auth.setup.ts
import { test as setup } from '@playwright/test';

const authFile = 'storage/user.auth.json';

setup('authenticate', async ({ page }) => {
  console.log('🔐 Starting authentication...');
  
  // Login ke OrangeHRM
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  
  // Tunggu form login muncul
  await page.locator('input[name="username"]').waitFor({ state: 'visible', timeout: 30000 });
  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();
  
  // Tunggu dashboard muncul (tanda login berhasil)
  await page.waitForURL(/.*dashboard/, { timeout: 30000 });
  await page.locator('.oxd-topbar-header-breadcrumb').waitFor({ state: 'visible', timeout: 30000 });
  
  // Simpan session ke file
  await page.context().storageState({ path: authFile });
  console.log(`✅ Authentication state saved to ${authFile}`);
});