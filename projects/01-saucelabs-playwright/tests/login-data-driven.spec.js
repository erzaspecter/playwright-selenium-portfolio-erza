const { test, expect } = require('@playwright/test');
const testData = require('../data/test-data.json');
const LoginPage = require('../pages/LoginPage');

test.describe('Data-Driven Login Tests', () => {
  testData.validUsers.forEach(({ username, password }) => {
    test(`should login with ${username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(username, password);
      await expect(page).toHaveURL(/.*inventory.html/);
    });
  });

  testData.invalidUsers.forEach(({ username, password }) => {
    test(`should fail login with ${username || 'empty credentials'}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(username, password);
      await expect(loginPage.errorMessage).toBeVisible();
    });
  });
});