import OrangeHRMLoginPage from '../../support/pages/OrangeHRMLoginPage.js';


describe('OrangeHRM - Login Form Validation', () => {
  let loginPage;

  beforeEach(()=> {
    loginPage = new OrangeHRMLoginPage();
    loginPage.visit();
  });

  it('should be able to login with valid credentials', () => {
    loginPage.enterUsername('Admin');
    loginPage.enterPassword('admin123');
    loginPage.clickLogin();

    // ✅ TAMBAHKAN ASSERTION
  // cy.url().should('include', '/dashboard');  // atau
  // cy.contains('Dashboard').should('be.visible');  // atau
  // cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
  });

});