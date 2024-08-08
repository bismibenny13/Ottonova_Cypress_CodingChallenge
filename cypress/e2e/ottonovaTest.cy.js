// Import the test data from the fixture
const testData = require('../fixtures/testData.json');

describe('Ottonova Beitragsrechner Tests', () => {

  beforeEach(() => {
    // Visit the Ottonova page
    cy.visit('https://www.ottonova.de/online-beitragsrechner');
    cy.acceptCookies();
    
    
    // Accept the cookies if the banner appears
   // cy.get('button').contains('Alles Akzeptieren').then(button => {
     // if (button.is(':visible')) {
       // cy.wrap(button).click();
      //}
    //});
  });

  it('should show validation error for underage users', () => {
    // Select "Angestellt" as employment
    cy.contains('span', 'Angestellt').click();

    // Enter income
    cy.get('input[data-cy="income-input"]').type(testData.income);
    cy.get('button[data-cy="employment-status-continue"]').click();

    // Select "Vollversicherung" and start date
    cy.contains('span', 'Vollversicherung').click();
    cy.get('select[data-cy="ingress-date"]').select(testData.startDateValue)
    .should('have.value', testData.startDateValue);
    cy.get('button[data-cy="insurance-product-continue"]').click();

    // Enter an underage birthdate
    const [day, month, year] = testData.invalidAgeBirthdate.split('.');
    cy.get('input[data-cy="day"]').type(day);
    cy.get('input[data-cy="month"]').type(month);
    cy.get('input[data-cy="year"]').type(year);
    
    // assert validation error
    
    cy.contains('Leider kannst du dich erst ab 16 Jahren alleine versichern.').should('be.visible');
    cy.get('button[data-cy="birthday-continue"]').should('be.disabled');
  });

  it('should show validation error for future birthdate', () => {
    // Select "Angestellt" as employment
    cy.contains('span', 'Angestellt').click();

    // Enter income
    cy.get('input[data-cy="income-input"]').type(testData.income);
    cy.get('button[data-cy="employment-status-continue"]').click();

    // Select "Vollversicherung" and start date
    cy.contains('span', 'Vollversicherung').click();
    cy.get('select[data-cy="ingress-date"]').select(testData.startDateValue)
      .should('have.value', testData.startDateValue);

    cy.get('button[data-cy="insurance-product-continue"]').click();

    // Enter a future birthdate
    const [day, month, year] = testData.futureBirthdate.split('.');
    cy.get('input[data-cy="day"]').type(day);
    cy.get('input[data-cy="month"]').type(month);
    cy.get('input[data-cy="year"]').type(year);
    
    //assert validation error
    
    cy.contains('Du bist in der Zukunft geboren? Bitte überprüfe deine Eingaben.').should('be.visible');
    cy.get('button[data-cy="birthday-continue"]').should('be.disabled');
  });

  it('should proceed to the next page with a valid birthdate', () => {
    // Select "Angestellt" as employment
    cy.contains('span', 'Angestellt').click();

    // Enter income
    cy.get('input[data-cy="income-input"]').type(testData.income);
    cy.get('button[data-cy="employment-status-continue"]').click();

    // Select "Vollversicherung" and start date
    cy.contains('span', 'Vollversicherung').click();
    cy.get('select[data-cy="ingress-date"]').select(testData.startDateValue)
      .should('have.value', testData.startDateValue);

    cy.get('button[data-cy="insurance-product-continue"]').click();

    // Enter a valid birthdate
    const [day, month, year] = testData.validBirthdate.split('.');
    cy.get('input[data-cy="day"]').type(day);
    cy.get('input[data-cy="month"]').type(month);
    cy.get('input[data-cy="year"]').type(year);
    
    // Click continue and assert that the next page is reached
    cy.get('button[data-cy="birthday-continue"]').should('be.enabled');
    cy.get('button[data-cy="birthday-continue"]').click();
    cy.url().should('include', 'persoenliche-situation/versicherungsstatus'); // Update with actual URL or part of it
  });

});
