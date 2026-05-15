// pages/loginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  
  // ✅ Tambahan untuk verifikasi
  readonly dashboardHeader: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    
    // ✅ Elements untuk verifikasi
    this.dashboardHeader = page.locator('.oxd-topbar-header-breadcrumb');
    this.errorMessage = page.locator('.oxd-alert-content-text');
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
      timeout: 60000
    });
  }

  async login(username: string, password: string) {
    await this.usernameInput.waitFor({ state: 'visible', timeout: 30000 });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // ✅ TAMBAH METHOD INI - Assert login berhasil
  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/.*dashboard/, { timeout: 30000 });
    await expect(this.dashboardHeader).toBeVisible({ timeout: 30000 });
    await expect(this.dashboardHeader).toContainText('Dashboard');
  }

  // ✅ TAMBAH METHOD INI - Assert login gagal
  async assertLoginFailure(expectedError?: string) {
    await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
    if (expectedError) {
      await expect(this.errorMessage).toContainText(expectedError);
    }
  }

  async isOnLoginPage(): Promise<boolean> {
    return await this.usernameInput.isVisible();
  }
}