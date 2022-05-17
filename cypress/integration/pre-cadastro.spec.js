/// <reference types="cypress" />

const { faker } = require('@faker-js/faker')

describe('Funcionalidade Pré Cadastro', () => {

  beforeEach(() => {
    cy.visit('minha-conta/edit-account')
  }
  )
  let nomeFaker = faker.name.firstName()
  let sobrenomeFaker = faker.name.lastName()
  let emailFaker = faker.internet.email(nomeFaker) // Aqui o email receberá o primeiro nome do usuário
  let emailFaker2 = faker.internet.email(nomeFaker) // Criada esse outra variável, pois o cenário 'Deve completar o pré-cadastro com sucesso - Usando comandos customizados', tem que utilizar um outro email. 
  
  it('Deve completar o pré cadastro com sucesso', () => {
    cy.get('#reg_email').type(emailFaker)
    // cy.get('#reg_email').type(faker.internet.email()) // Refatorando código
    cy.get('#reg_password').type('teste@teste')
    cy.get(':nth-child(4) > .button').click()

    cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
    cy.get('#account_first_name').type(nomeFaker)
    // cy.get('#account_first_name').type(faker.name.firstName()) // Refatorando código
    cy.get('#account_last_name').type(sobrenomeFaker)
    // cy.get('#account_last_name').type(faker.name.lastName()) // Refatorando código
    cy.get('.woocommerce-Button').click()

    cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
  })

  it('Deve completar o pré cadastro com sucesso - Usando comandos customizados ', () => {
    cy.preCadastro(emailFaker2, 'teste@teste', 'Guilherme', 'Sousa')
  })

})

