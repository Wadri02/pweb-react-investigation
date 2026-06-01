describe('Login exitoso', () => {
  it('muestra mensaje de bienvenida con credenciales válidas', () => {
    cy.visit('/')
    cy.get('[data-cy=email]').type('usuario@email.com')
    cy.get('[data-cy=password]').type('password123')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=mensaje-exito]').should('be.visible').and('contain.text', 'Bienvenido')
  })
})

describe('Login fallido', () => {
  it('muestra error con email sin @', () => {
    cy.visit('/')
    cy.get('[data-cy=email]').type('emailsinarroba')
    cy.get('[data-cy=password]').type('password123')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=mensaje-error]').should('be.visible')
  })

  it('muestra error con password corto', () => {
    cy.visit('/')
    cy.get('[data-cy=email]').type('usuario@email.com')
    cy.get('[data-cy=password]').type('abc')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=mensaje-error]').should('be.visible')
  })
})
