// pages/dashboardPage.ts
import { Page, Locator, expect } from '@playwright/test';

export default class DashboardPage {
  readonly page: Page;

  readonly userDropdown: Locator;
  readonly logoutButton: Locator;
  readonly userProfileName: Locator;

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

  readonly quickAccessWidget: Locator;
  readonly myActionsWidget: Locator;

  readonly pageHeader: Locator;
  readonly breadcrumbModule: Locator;
  readonly breadcrumbLevel: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userDropdown = page.locator('.oxd-userdropdown');
    this.logoutButton = page.locator('a:has-text("Logout")');
    this.userProfileName = page.locator('.oxd-userdropdown-name');

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

    this.quickAccessWidget = page.locator('.oxd-grid-item').filter({ hasText: 'Quick Access' });
    this.myActionsWidget = page.locator('.oxd-grid-item').filter({ hasText: 'My Actions' });

    this.pageHeader = page.locator('.oxd-topbar-header-breadcrumb');
    this.breadcrumbModule = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.breadcrumbLevel = page.locator('.oxd-topbar-header-breadcrumb-level');
  }

  async navigateToPIM() {
    await this.pimMenu.click();
    await expect(this.page).toHaveURL(/.*\/pim\/viewEmployeeList/);
    await this.waitForPageLoad();
  }

  async navigateToAdmin() {
    await this.adminMenu.click();
    await expect(this.page).toHaveURL(/.*\/admin\/viewSystemUsers/);
    await this.waitForPageLoad();
  }

  async navigateToLeave() {
    await this.leaveMenu.click();
    await expect(this.page).toHaveURL(/.*\/leave\/viewLeaveList/);
    await this.waitForPageLoad();
  }

  async navigateToTime() {
    await this.timeMenu.click();
    await expect(this.page).toHaveURL(/.*\/time\/viewTimesheet/);
    await this.waitForPageLoad();
  }

  async navigateToRecruitment() {
    await this.recruitmentMenu.click();
    await expect(this.page).toHaveURL(/.*\/recruitment\/viewCandidates/);
    await this.waitForPageLoad();
  }

  async navigateToMyInfo() {
    await this.myInfoMenu.click();
    await expect(this.page).toHaveURL(/.*\/pim\/viewPersonalDetails/);
    await this.waitForPageLoad();
  }

  async navigateToDashboard() {
    await this.dashboardMenu.click();
    await expect(this.page).toHaveURL(/.*\/dashboard/);
    await this.waitForPageLoad();
  }

  async navigateToDirectory() {
    await this.directoryMenu.click();
    await expect(this.page).toHaveURL(/.*\/directory\/viewDirectory/);
    await this.waitForPageLoad();
  }

  async navigateToBuzz() {
    await this.buzzMenu.click();
    await expect(this.page).toHaveURL(/.*\/buzz\/viewBuzz/);
    await this.waitForPageLoad();
  }

  async getCurrentUsername(): Promise<string> {
    return (await this.userProfileName.textContent()) || '';
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutButton.click();
    await expect(this.page).toHaveURL(/.*\/auth\/login/);
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.dashboardMenu.isVisible();
  }

  async verifyOnPIMPage() {
    await expect(this.page).toHaveURL(/.*\/pim\/viewEmployeeList/);
    await expect(this.breadcrumbModule).toHaveText('PIM');
  }

  async verifyOnAdminPage() {
    await expect(this.page).toHaveURL(/.*\/admin\/viewSystemUsers/);
    await expect(this.breadcrumbModule).toHaveText('Admin');
  }

  async verifyOnLeavePage() {
    await expect(this.page).toHaveURL(/.*\/leave\/viewLeaveList/);
    await expect(this.breadcrumbModule).toHaveText('Leave');
  }

  async verifyOnDashboard() {
    await expect(this.page).toHaveURL(/.*\/dashboard/);
    await expect(this.breadcrumbModule).toHaveText('Dashboard');
  }

  async getPageTitle(): Promise<string> {
    return (await this.breadcrumbModule.textContent()) || '';
  }

  private async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async isMenuItemVisible(menuName: string): Promise<boolean> {
    const menu = this.page.locator('.oxd-main-menu-item').filter({ hasText: menuName });
    return await menu.isVisible();
  }

  async getAllMenuItems(): Promise<string[]> {
    const menuItems = await this.page.locator('.oxd-main-menu-item--name').allTextContents();
    return menuItems.filter(item => item.trim() !== '');
  }
}