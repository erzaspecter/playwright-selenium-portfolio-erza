
import ModenaHomePage from '../support/pages/ModenaHomePage.js';

describe('Home Page Test', () => {
  it('should load homepage', () => {
    const home = new ModenaHomePage();
    home.visit();
  });
});


describe('Home Page Test', () => {
  it('should load homepage', () => {
    const home = new ModenaHomePage();
    home.visit();
  });
});

describe('MODENA Energy - Homepage Tests', () => {
  let modenaHomePage;
  Cypress.on('uncaught:exception', () => false);

  beforeEach(() => {
    modenaHomePage = new ModenaHomePage();
    modenaHomePage.visit();
  });

  it('Harus menampilkan logo MODENA dan judul yang benar', () => {
    modenaHomePage.getLogo().should('be.visible');
    cy.title().should('include', 'Energy');
  });

  it('Harus bisa navigasi ke menu Home Solutions', () => {
    modenaHomePage.clickHomeSolutions();
    modenaHomePage.verifyUrlContains('/home-solution');
    cy.get('h1, h4', { timeout: 15000 }).should('contain', 'Home');
  });

  it.only('Calculate Energy', function() {
    
    
    //cy.get('.lg\\:text-left > .hidden').scrollIntoView().should('be.visible');
    cy.contains('button, a', 'Calculate Now').scrollIntoView().should('be.visible');
    cy.contains('button, a', 'Calculate Now').click();
    
    //cy.get('.lg\\:text-left > .hidden').click();
    
       
    
    //cy.get('a.btn-home span.absolute').click();
    cy.get('a.btn-home').click();
    //cy.get('#select2-power_capacity_home-container').click();
    cy.get('[name="electricity_bill_home"]').click();
    cy.get('[name="electricity_bill_home"]').type('8.000.000');
    cy.get('label:nth-child(2) div.float-left').click();
    cy.get('#select2-power_capacity_home-container').click();
    cy.get('.select2-results__option').contains('1300 VA').click();
    cy.get('a.next-step-home').click();

    //cy.get('input.name').type('Erza Akbar');
    cy.get('input[name="name_home"]').type('Erza Akbar');
    cy.get('input[name="email_home"]').type('akbarerza3@gmail.com');
    cy.get('input[name="phone_home"]').type('081280984758');
    cy.get('#address-input-home').type('Jl. Merdeka No. 123, Jakarta');    
  });
});