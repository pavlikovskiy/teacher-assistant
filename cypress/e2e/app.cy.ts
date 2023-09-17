/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test

const host = 'http://localhost:3000/'

describe('Unit Conversion flows', () => {

  it('does correct temperature conversion (Celsius -> Kelvin)', () => {
    cy.visit(host)
    cy.get('input[id="input-measure"]').type('Celsius')
    cy.get('input[id="target-measure"]').type('Kelvin')
    cy.get('input[id="unit-input"]').type('1')
    cy.get('input[id="student-response"]').type('274.15')
    cy.get('button[id="validate-btn"]').click()

    cy.get('span[id="status"]').contains('Correct')

    cy.get('button[id="done-btn"]').click()
  })

  it('does incorrect temperature conversion (Celsius -> Kelvin)', () => {
    cy.visit(host)
    cy.get('input[id="input-measure"]').type('Celsius')
    cy.get('input[id="target-measure"]').type('Kelvin')
    cy.get('input[id="unit-input"]').type('1')
    cy.get('input[id="student-response"]').type('111')
    cy.get('button[id="validate-btn"]').click()

    cy.get('span[id="status"]').contains('Incorrect')

    cy.get('button[id="done-btn"]').click()
  })

  it('does invalid temperature conversion (Celsius -> Kelvin)', () => {
    cy.visit(host)
    cy.get('input[id="input-measure"]').type('Celsius')
    cy.get('input[id="target-measure"]').type('Dog')
    cy.get('input[id="unit-input"]').type('1')
    cy.get('input[id="student-response"]').type('111')
    cy.get('button[id="validate-btn"]').click()

    cy.get('span[id="status"]').contains('Invalid')

    cy.get('button[id="done-btn"]').click()
  })

  it('checks if validate button is disabled until all fields have data', () => {
    cy.visit(host)
    cy.get('input[id="input-measure"]').type('Celsius')
    cy.get('button[id="validate-btn"]').should('be.disabled')
    cy.get('input[id="target-measure"]').type('Kelvin')
    cy.get('button[id="validate-btn"]').should('be.disabled')
    cy.get('input[id="unit-input"]').type('1')
    cy.get('button[id="validate-btn"]').should('be.disabled')
    cy.get('input[id="student-response"]').type('274.15')
    // all data => button enabled
    cy.get('button[id="validate-btn"]').should('not.be.disabled')
  })

  it('checks if done button resets all fields', () => {
    cy.visit(host)
    cy.get('input[id="input-measure"]').type('Celsius')
    cy.get('input[id="target-measure"]').type('Kelvin')
    cy.get('input[id="unit-input"]').type('1')
    cy.get('input[id="student-response"]').type('274.15')

    cy.get('button[id="validate-btn"]').click()

    // all fields have data
    cy.get('input[id="input-measure"]').invoke('val').should('not.be.empty')
    cy.get('input[id="target-measure"]').invoke('val').should('not.be.empty')
    cy.get('input[id="unit-input"]').invoke('val').should('not.be.empty')
    cy.get('input[id="student-response"]').invoke('val').should('not.be.empty')

    cy.get('button[id="done-btn"]').click()

    cy.get('input[id="input-measure"]').invoke('val').should('be.empty')
    cy.get('input[id="target-measure"]').invoke('val').should('be.empty')
    cy.get('input[id="unit-input"]').invoke('val').should('be.empty')
    cy.get('input[id="student-response"]').invoke('val').should('be.empty')
  })

})

// Prevent TypeScript from reading file as legacy script
export {}
