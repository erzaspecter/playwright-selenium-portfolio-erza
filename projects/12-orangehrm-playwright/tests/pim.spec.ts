// tests/pim.spec.ts
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import DashboardPage from '../pages/dashboardPage';
import PimPage from '../pages/pimPage';

test.describe('PIM Module - Employee Management', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let pimPage: PimPage;

  const timestamp = Date.now();
  const testEmployee = {
    firstName: `John${timestamp}`,
    lastName: `Doe${timestamp}`,
    middleName: 'Michael',
    employeeId : `EMP${timestamp}`
  };

  // ✅ BEFORE EACH: Login dan navigasi ke PIM menggunakan DashboardPage
 // tests/pim.spec.ts
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  pimPage = new PimPage(page);

  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');
  
  // ✅ PAKAI METHOD INI - Verifikasi login berhasil
  await loginPage.assertLoginSuccess();
  
  // Baru navigasi ke PIM
  await dashboardPage.navigateToPIM();
  await dashboardPage.verifyOnPIMPage();
});

  test.describe('Add Employee', () => {
    
    test('TC-PIM-001: Should add employee with valid data', async () => {
      // Klik tombol Add (masih di halaman PIM List)
      await pimPage.gotoAddEmployee();
      
      // Isi form Add Employee
      await pimPage.addEmployee(
        testEmployee.firstName, 
        testEmployee.lastName, 
        testEmployee.middleName,
        testEmployee.employeeId
      );
      // Verifikasi sukses
      expect(await pimPage.verifySuccessMessage()).toBeTruthy();
      expect(await pimPage.getSuccessMessageText()).toContain('Successfully Saved');
      

      await pimPage.waitForPersonalDetailsPage();
      
      
       // ✅ LANGSUNG verifikasi nama dengan expect (akan retry otomatis)
  // Jangan pakai getEmployeeFirstName() dulu
  const nameHeader = pimPage.page.locator('.orangehrm-edit-employee-name');
  await expect(nameHeader).toContainText(testEmployee.firstName, { timeout: 30000 });
  await expect(nameHeader).toContainText(testEmployee.lastName, { timeout: 30000 });
    });

    test('TC-PIM-002: Should show error when adding employee without first name', async () => {
      await pimPage.gotoAddEmployee();
      await pimPage.lastNameInput.fill(testEmployee.lastName);
      await pimPage.saveButton.click();
      
      const errorMessage = await pimPage.page.locator('.oxd-input-field-error-message').first();
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