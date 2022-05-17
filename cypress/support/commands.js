// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/* Explicando o comando

Cypress.Commands.add('login', (usuario, senha) => { ... })
'login' é o método
(usuario, senha) são os parâmetros

*/

Cypress.Commands.add('login', (usuario, senha) => { 
  cy.get('#username').type(usuario) //.type é um método
  cy.get('#password').type(senha)
  cy.get('.woocommerce-form > .button').click() //.click é um método
})

Cypress.Commands.add('preCadastro', (email, senha, nome, sobrenome) => {
  cy.get('#reg_email').type(email)
  cy.get('#reg_password').type(senha)
  cy.get(':nth-child(4) > .button').click()

  cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
  cy.get('#account_first_name').type(nome)
  cy.get('#account_last_name').type(sobrenome)
  cy.get('.woocommerce-Button').click()
})

Cypress.Commands.add('addProduto', (produto, tamanho, cor, quantidade) => { // O método addProduto irá receber os parâmetros produto e quantidade.
  cy.get('[class="product-block grid"]')
      .contains(produto)
      .click()

  cy.get('.button-variable-item-' + tamanho).click()
  cy.get('.button-variable-item-' + cor).click()
  cy.get('.input-text')
    .clear() // O campo por default vem com o valor 1. Então deve ser limpo para depois receber o valor.
    .type(quantidade)
  cy.get('.single_add_to_cart_button').click()

  cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
  //TODO Refatorar essa linha 67 no trecho que tem template string, pois está dando erro no assert
  //cy.get('.woocommerce-message').should('contain', quantidade + ' × ' + `${\"produto\"}` + ' foram adicionados no seu carrinho.')
  cy.get('.woocommerce-message').should('contain', quantidade + ' × “Aero Daily Fitness Tee” foram adicionados no seu carrinho.')
})
