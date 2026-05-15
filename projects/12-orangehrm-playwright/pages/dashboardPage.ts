// pages/dashboardPage.ts
import { Page, Locator, expect } from '@playwright/test';

export default class DashboardPage {
  readonly page: Page;
  
  // Top Bar Elements
  readonly userDropdown: Locator;
  readonly logoutButton: Locator;
  readonly userProfileName: Locator;
  
  // Main Menu Elements (Sidebar)
  readonly adminMenu: Locator;
  readonly pimMenu: Locator;
  readonly leaveMenu: Locator;
  readonly timeMenu: Locator;
  readonly recruitmentMenu: Locator;
  readonly myInfoMenu: Locator;
  readonly performanceMenu: Locator;
  readonly dashboardMenu: Locator;
  readonly directoryMenu: Locator;
  readonly maintenanceMenu: Locator;
  readonly buzzMenu: Locator;
  
  // Quick Access Widget (Dashboard page)
  readonly quickAccessWidget: Locator;
  readonly myActionsWidget: Locator;
  
  // Header Elements
  readonly pageHeader: Locator;
  readonly breadcrumb: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Top Bar
    this.userDropdown = page.locator('.oxd-userdropdown');
    this.logoutButton = page.locator('a:has-text("Logout")');
    this.userProfileName = page.locator('.oxd-userdropdown-name');
    
    // Main Menu Items - Left Sidebar
    // Menggunakan filter karena teks "PIM" ada di span
    this.adminMenu = page.locator('.oxd-main-menu-item').filter({ hasText: 'Admin' });
    this.pimMenu = page.locator('.oxd-main-menu-item').filter({ hasText: 'PIM' });
    this.leaveMenu = page.locator('.oxd-main-menu-item').filter({ hasText: 'Leave' });
    this.timeMenu = page.locator('.oxd-main-menu-item').filter({ hasText: 'Time' });
    this.recruitmentMenu = page.locator('.oxd-main-menu-item').filter({ hasText: 'Recruitment' });
    this.myInfoMenu = page.locator('.oxd-main-menu-item').filter({ hasText: 'My Info' });
    this.performanceMenu = page.locator('.oxd-main-menu-item').filter({ hasText: 'Performance' });
    this.dashboardMenu = page.locator('.oxd-main-menu-item').filter({ hasText: 'Dashboard' });
    this.directoryMenu = page.locator('.oxd-main-menu-item').filter({ hasText: 'Directory' });
    this.maintenanceMenu = page.locator('.oxd-main-menu-item').filter({ hasText: 'Maintenance' });
    this.buzzMenu = page.locator('.oxd-main-menu-item').filter({ hasText: 'Buzz' });
    
    // Widgets (on Dashboard page)
    this.quickAccessWidget = page.locator('.oxd-grid-item').filter({ hasText: 'Quick Access' });
    this.myActionsWidget = page.locator('.oxd-grid-item').filter({ hasText: 'My Actions' });
    
    // Header
    this.pageHeader = page.locator('.oxd-topbar-header-breadcrumb');
    this.breadcrumb = page.locator('.oxd-topbar-header-breadcrumb > h6');
  }

  // ========== Navigation Methods ==========
  
  /**
   * Navigate to PIM (Employee Management) page
   */
  async navigateToPIM() {
    await this.pimMenu.click();
    await expect(this.page).toHaveURL(/.*\/pim\/viewEmployeeList/);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to Admin page
   */
  async navigateToAdmin() {
    await this.adminMenu.click();
    await expect(this.page).toHaveURL(/.*\/admin\/viewSystemUsers/);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to Leave page
   */
  async navigateToLeave() {
    await this.leaveMenu.click();
    await expect(this.page).toHaveURL(/.*\/leave\/viewLeaveList/);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to Time page
   */
  async navigateToTime() {
    await this.timeMenu.click();
    await expect(this.page).toHaveURL(/.*\/time\/viewTimesheet/);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to Recruitment page
   */
  async navigateToRecruitment() {
    await this.recruitmentMenu.click();
    await expect(this.page).toHaveURL(/.*\/recruitment\/viewCandidates/);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to My Info page
   */
  async navigateToMyInfo() {
    await this.myInfoMenu.click();
    await expect(this.page).toHaveURL(/.*\/pim\/viewPersonalDetails/);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to Dashboard page
   */
  async navigateToDashboard() {
    await this.dashboardMenu.click();
    await expect(this.page).toHaveURL(/.*\/dashboard/);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to Directory page
   */
  async navigateToDirectory() {
    await this.directoryMenu.click();
    await expect(this.page).toHaveURL(/.*\/directory\/viewDirectory/);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to Buzz page (social media-like feed)
   */
  async navigateToBuzz() {
    await this.buzzMenu.click();
    await expect(this.page).toHaveURL(/.*\/buzz\/viewBuzz/);
    await this.waitForPageLoad();
  }

  // ========== User Actions ==========
  
  /**
   * Get current logged-in username
   */
  async getCurrentUsername(): Promise<string> {
    return (await this.userProfileName.textContent()) || '';
  }

  /**
   * Logout from the application
   */
  async logout() {
    await this.userDropdown.click();
    await this.logoutButton.click();
    await expect(this.page).toHaveURL(/.*\/auth\/login/);
  }

  /**
   * Check if user is logged in (Dashboard is visible)
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.dashboardMenu.isVisible();
  }

  // ========== Verification Methods ==========
  
  /**
   * Verify current page is PIM page
   */
  async verifyOnPIMPage() {
    await expect(this.page).toHaveURL(/.*\/pim\/viewEmployeeList/);
    await expect(this.breadcrumb).toContainText('PIM');
  }

  /**
   * Verify current page is Admin page
   */
  async verifyOnAdminPage() {
    await expect(this.page).toHaveURL(/.*\/admin\/viewSystemUsers/);
    await expect(this.breadcrumb).toContainText('Admin');
  }

  /**
   * Verify current page is Leave page
   */
  async verifyOnLeavePage() {
    await expect(this.page).toHaveURL(/.*\/leave\/viewLeaveList/);
    await expect(this.breadcrumb).toContainText('Leave');
  }

  /**
   * Verify current page is Dashboard
   */
  async verifyOnDashboard() {
    await expect(this.page).toHaveURL(/.*\/dashboard/);
    await expect(this.breadcrumb).toContainText('Dashboard');
  }

  /**
   * Get page title/breadcrumb text
   */
  async getPageTitle(): Promise<string> {
    return (await this.breadcrumb.textContent()) || '';
  }

  // ========== Helper Methods ==========
  
  /**
   * Wait for page to fully load (network idle)
   */
  private async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000); // Additional buffer for OrangeHRM
  }

  /**
   * Check if a menu item is visible in sidebar
   */
  async isMenuItemVisible(menuName: string): Promise<boolean> {
    const menu = this.page.locator('.oxd-main-menu-item').filter({ hasText: menuName });
    return await menu.isVisible();
  }

  /**
   * Get all visible menu items
   */
  async getAllMenuItems(): Promise<string[]> {
    const menuItems = await this.page.locator('.oxd-main-menu-item--name').allTextContents();
    return menuItems.filter(item => item.trim() !== '');
  }
}