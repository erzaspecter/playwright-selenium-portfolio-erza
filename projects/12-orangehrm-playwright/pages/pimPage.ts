// pages/pimPage.ts
import { Page, Locator, expect } from '@playwright/test';

export default class PimPage {
  readonly page: Page;
  
  // Employee List Page Elements
  readonly addEmployeeButton: Locator;
  readonly employeeListTab: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly employeeNameInput: Locator;
  readonly searchResults: Locator;
  
  // Add Employee Page Elements
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  
  // Create Login Details (optional)
  readonly createLoginCheckbox: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  
  // Personal Details Page (after save)
  readonly successToast: Locator;
  readonly employeeFirstName: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Employee List
    this.addEmployeeButton = page.locator('button:has-text("Add")');
    this.employeeListTab = page.locator('a:has-text("Employee List")');
    this.searchButton = page.locator('button[type="submit"]').filter({ hasText: 'Search' });
    this.resetButton = page.locator('button:has-text("Reset")');
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]');
    this.searchResults = page.locator('.oxd-table-card');
    
    // Add Employee Form
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('input.oxd-input.oxd-input--active').first();
    this.saveButton = page.locator('button[type="submit"]');
    this.cancelButton = page.locator('button:has-text("Cancel")');
    
    // Login Details
    this.createLoginCheckbox = page.locator('.oxd-switch-input');
    this.usernameInput = page.locator('input[autocomplete="off"]');
    this.passwordInput = page.locator('input[type="password"]').first();
    this.confirmPasswordInput = page.locator('input[type="password"]').nth(1);
    
    // After Save
    this.successToast = page.locator('.oxd-toast:has-text("Success")');
    this.employeeFirstName = page.locator('input[name="firstName"]');
  }

  // ========== Navigation Methods ==========
  
  async gotoAddEmployee() {
    await this.addEmployeeButton.click();
    await expect(this.page).toHaveURL(/.*addEmployee/);
  }

  async gotoEmployeeList() {
    await this.employeeListTab.click();
    await expect(this.page).toHaveURL(/.*viewEmployeeList/);
  }

  // ========== Add Employee Methods ==========
  
  async addEmployee(firstName: string, lastName: string, middleName?: string, 
    employeeId?: string
  ) {
    await this.firstNameInput.fill(firstName);
    if (middleName) await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);
    if (employeeId) await this.employeeIdInput.fill(employeeId);
    await this.saveButton.click();
  }

  async addEmployeeWithLoginDetails(
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    
    // Enable Create Login Details
    await this.createLoginCheckbox.check();
    
    // Fill credentials
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    
    await this.saveButton.click();
  }

  // ========== Search Employee Methods ==========
  
  async searchEmployeeByName(employeeName: string) {
    await this.gotoEmployeeList();
    await this.employeeNameInput.fill(employeeName);
    await this.searchButton.click();
    await this.page.waitForTimeout(2000); // Wait for search results
  }

  async searchEmployeeById(employeeId: string) {
    await this.gotoEmployeeList();
    await this.page.locator('input.oxd-input').nth(1).fill(employeeId);
    await this.searchButton.click();
    await this.page.waitForTimeout(2000);
  }

  // ========== Edit Employee Methods ==========
  
  async clickEditOnFirstResult() {
    await this.searchResults.first().locator('.bi-pencil').click();
    await expect(this.page).toHaveURL(/.*viewPersonalDetails/);
  }

  async updateFirstName(newFirstName: string) {
    await this.firstNameInput.fill(newFirstName);
    await this.saveButton.click();
  }

  // ========== Delete Employee Methods ==========
  
  async deleteFirstEmployee() {
    await this.searchResults.first().locator('.bi-trash').click();
    await this.page.locator('.oxd-button--label-danger').click(); // Confirm delete
  }

  // ========== Verification Methods ==========
  
  async verifySuccessMessage(): Promise<boolean> {
    await this.successToast.waitFor({ timeout: 10000 });
    return await this.successToast.isVisible();
  }

  async verifyEmployeeExists(employeeName: string): Promise<boolean> {
    await this.searchEmployeeByName(employeeName);
    const resultCount = await this.searchResults.count();
    return resultCount > 0;
  }

  async getSuccessMessageText(): Promise<string> {
    await this.successToast.waitFor({ timeout: 10000 });
    return (await this.successToast.textContent()) || '';
  }

  async getEmployeeFirstName(): Promise<string> {
    return (await this.employeeFirstName.textContent()) || '';
  }



// Atau buat method yang lebih robust
async waitForPersonalDetailsPage(): Promise<void> {
  // Tunggu URL berubah ke personal details
  await this.page.waitForURL(/.*\/pim\/viewPersonalDetails/, { timeout: 30000 });
  
  // Tunggu network idle
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  
  // Tunggu elemen utama halaman personal details
  await this.page.locator('.orangehrm-edit-employee-name').waitFor({ 
    state: 'visible', 
    timeout: 30000 
  });
  
  // Tambahan buffer untuk OrangeHRM yang super lambat
  await this.page.waitForTimeout(3000);
}
}