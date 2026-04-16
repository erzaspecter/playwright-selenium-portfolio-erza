describe('Ciao MODENA - Service & Support Portal', () => {
  
  beforeEach(() => {
    // Kunjungi website Ciao MODENA
    cy.visit('https://ciao.modena.com/en');
  });

  it('should display the main landing page correctly', () => {
    // Memastikan logo atau elemen identitas ada
    cy.get('img[alt*="MODENA"]').should('be.visible');
    cy.contains('Product Registration and Claims').should('be.visible');
    
       
    
    cy.get('#toRegisterHeader').click();
    cy.get('label.flex').click();
    cy.get('#agreement').check();
    cy.get('#start').click();
    // Page URL changed.
    cy.url()
      .should('eq', 'https://ciao.modena.com/en/registration')
    // A step indicator with 'Document', 'Category', 'Identity', and 'Review' is now visible.
    cy.get('ul.indicator > li')
      .should('have.length', 4)
    // The page title changed from 'Easy Steps to Claim Cashback and Free Item' to 'Register Products and Claim Rewards'.
    cy.get('div.px-4.text-center')
      .should('contain.text', 'Register Products and Claim Rewards')
    
  });

});