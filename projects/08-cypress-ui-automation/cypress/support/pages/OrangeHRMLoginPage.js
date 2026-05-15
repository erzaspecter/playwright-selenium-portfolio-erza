// cypress/support/pages/OrangeHRMLoginPage.js

export default class OrangeHRMLoginPage {

  // Selectors
   
    usernameInput = () => cy.get('input[name="username"]');
    passwordInput = () => cy.get('input[name="password"]');
  

  // Actions / Methods
  visit() {
    cy.viewport(1920, 1080);
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
      timeout: 60000,
      failOnStatusCode: false
    });
    cy.get('input[name="username"]', { timeout: 15000 }).should('be.visible'); // atau tunggu elemen penting
  }

  enterUsername(username) {
    this.usernameInput().clear().should('be.visible').type(username);
    return this;
  }
  
  enterPassword(password) {
    this.passwordInput().clear().should('be.visible').type(password);
    return this;
  }

  clickLogin(){
    cy.get('button[type="submit"]').should('be.visible').click();
  }



  
}

// Export instance agar bisa langsung dipakai
//export const orangeHRMLoginPage = new OrangeHRMLoginPage();