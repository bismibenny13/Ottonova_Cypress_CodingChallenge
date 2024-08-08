import CalculatorPage from '../../support/pages/CalculatorPage';
const testData = require('../../fixtures/testData.json');

describe('Ottonova Beitragsrechner Tests', () => {
  const calculatorPage = new CalculatorPage();

  beforeEach(() => {
    cy.visit('https://www.ottonova.de/online-beitragsrechner');
    cy.acceptCookies();
  });

  context('Validation Error Tests', () => {

  it('should show validation error for underage users', () => {
    calculatorPage.selectEmployment('Angestellt');
    calculatorPage.enterIncome(testData.income);
    calculatorPage.continueEmployment();
    calculatorPage.selectInsuranceProduct('Vollversicherung');
    calculatorPage.selectIngressDate(testData.startDateValue);
    calculatorPage.continueInsuranceProduct();

    const [day, month, year] = testData.invalidAgeBirthdate.split('.');
    calculatorPage.enterBirthdate(day, month, year);
    calculatorPage.assertValidationMessage('Leider kannst du dich erst ab 16 Jahren alleine versichern.');
    calculatorPage.assertContinueButtonDisabled();
  });

  it('should show validation error for future birthdate', () => {
    calculatorPage.selectEmployment('Angestellt');
    calculatorPage.enterIncome(testData.income);
    calculatorPage.continueEmployment();
    calculatorPage.selectInsuranceProduct('Vollversicherung');
    calculatorPage.selectIngressDate(testData.startDateValue);
    calculatorPage.continueInsuranceProduct();

    const [day, month, year] = testData.futureBirthdate.split('.');
    calculatorPage.enterBirthdate(day, month, year);
    calculatorPage.assertValidationMessage('Du bist in der Zukunft geboren? Bitte überprüfe deine Eingaben.');
    calculatorPage.assertContinueButtonDisabled();
  });

})

context('Succesfull Navigation Tests', () => {

  it('should proceed to the next page with a valid birthdate', () => {
    calculatorPage.selectEmployment('Angestellt');
    calculatorPage.enterIncome(testData.income);
    calculatorPage.continueEmployment();
    calculatorPage.selectInsuranceProduct('Vollversicherung');
    calculatorPage.selectIngressDate(testData.startDateValue);
    calculatorPage.continueInsuranceProduct();

    const [day, month, year] = testData.validBirthdate.split('.');
    calculatorPage.enterBirthdate(day, month, year);
    calculatorPage.continueBirthday();
    cy.url().should('include', 'persoenliche-situation/versicherungsstatus');
  });
});
});
