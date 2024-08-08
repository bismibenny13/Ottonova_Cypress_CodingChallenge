// cypress/support/pages/CalculatorPage.js
class CalculatorPage {
    selectEmployment(status) {
      cy.contains('span', status, { timeout: 10000 }).click();
    }
  
    enterIncome(income) {
      cy.get('input[data-cy="income-input"]').type(income);
    }
  
    continueEmployment() {
      cy.get('button[data-cy="employment-status-continue"]').click();
    }
    selectInsuranceProduct(Vollversicherung) {
        cy.contains('span', Vollversicherung,{ timeout: 10000 }).click()
      }
   
  
    selectIngressDate(dateToSelect) {
      // Select date from dropdown dynamically
    cy.get('select[data-cy="ingress-date"]').then($dropdown => {
        const options = $dropdown.find('option');
        cy.wrap(options).each(option => {
          const $option = Cypress.$(option);
          if ($option.text().trim() === dateToSelect) {
            cy.wrap($dropdown).select($option.val()).should('have.value', $option.val());
            return false; // Exit loop once the correct option is found and selected
          }
        });
      });
    }
  
    continueInsuranceProduct() {
      cy.get('button[data-cy="insurance-product-continue"]').click();
    }
  
    enterBirthdate(day, month, year) {
      cy.get('input[data-cy="day"]').type(day);
      cy.get('input[data-cy="month"]').type(month);
      cy.get('input[data-cy="year"]').type(year);
    }
  
    continueBirthday() {
      cy.get('button[data-cy="birthday-continue"]').click();
    }
  
    assertValidationMessage(message) {
      cy.contains(message).should('be.visible');
      
    
    }
  
    assertContinueButtonDisabled() {
      cy.get('button[data-cy="birthday-continue"]').should('be.disabled');
    }
  }
  
  export default CalculatorPage;
  