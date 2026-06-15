// tests/pim.spec.ts
import { test, expect } from '@playwright/test';
import DashboardPage from '../pages/dashboardPage';
import PimPage from '../pages/pimPage';

test.describe('PIM Module - Employee Management', () => {
  let dashboardPage: DashboardPage;
  let pimPage: PimPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    pimPage = new PimPage(page);

    await page.goto('/web/index.php/pim/viewEmployeeList');

    await dashboardPage.verifyOnPIMPage();
  });

  test.describe('Add Employee', () => {
    test('TC-PIM-001: Should add employee with valid data', async () => {
      
      const timestamp = Date.now();

      const testEmployee = {
        firstName: `John${timestamp}`,
        lastName: `Doe${timestamp}`,
        middleName: 'Michael',
        employeeId: `EMP${timestamp}`,
      };

      await pimPage.gotoAddEmployee();

      await pimPage.addEmployee(
        testEmployee.firstName,
        testEmployee.lastName,
        testEmployee.middleName,
        testEmployee.employeeId
      );

      expect(await pimPage.verifySuccessMessage()).toBeTruthy();
      expect(await pimPage.getSuccessMessageText()).toContain('Successfully Saved');

      await pimPage.waitForPersonalDetailsPage();

      const nameHeader = pimPage.page.locator('.orangehrm-edit-employee-name');      await expect(nameHeader).toContainText(testEmployee.firstName, { timeout: 30000 });
      await expect(nameHeader).toContainText(testEmployee.lastName, { timeout: 30000 });
    });

    test('TC-PIM-002: Should show error when adding employee without first name', async () => {
      const timestamp = Date.now();

      await pimPage.gotoAddEmployee();

      await pimPage.lastNameInput.fill(`Doe${timestamp}`);
      await pimPage.saveButton.click();

      const errorMessage = pimPage.page.locator('.oxd-input-field-error-message').first();
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText('Required');
    });
  });

  test.describe('Navigate to Other Pages', () => {
    test('Should navigate from PIM to Admin page', async () => {
      await dashboardPage.navigateToAdmin();
      await dashboardPage.verifyOnAdminPage();
    });

    test('Should navigate from PIM to Leave page', async () => {
      await dashboardPage.navigateToLeave();
      await dashboardPage.verifyOnLeavePage();
    });

    test('Should navigate back to Dashboard', async () => {
      await dashboardPage.navigateToDashboard();
      await dashboardPage.verifyOnDashboard();
    });
  });
});