import OrangeHRMLoginPage from '../../support/pages/OrangeHRMLoginPage.js';

describe('PIM Module - Employee Management', () => {
    context('Add New Employee', () => {
        beforeEach(() => {
            const loginPage = new OrangeHRMLoginPage();
            loginPage.visit();
            loginPage.enterUsername('Admin');
            loginPage.enterPassword('admin123');
            loginPage.clickLogin();

            //Navigasi ke PIM
            cy.contains('span', 'PIM').click();
        });

        it('should add a new employee successfully', () => {
            cy.contains('button', 'Add').click();
            cy.url().should('include', '/pim/addEmployee');
        });
    });
});