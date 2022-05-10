// Importando biblioteca do cypress, precisamos usar o cyref.

/// <reference types="cypress" />

// context é um bloco de função.
// it são os cenários de testes, e ficam agrupados na funcionalidade login.

context('Funcionalidade login', () => {
  it('Deve fazer login com sucesso', () => {
    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    cy.get('#username').type('aluno_ebac@teste.com') //.type é um método
    cy.get('#password').type('teste@teste.com')
    cy.get('.woocommerce-form > .button').click() //.click é um método
    
    cy.get('.page-title').should('contain', 'Minha conta')
    // cy.get('.page-title').contains('MINHA CONTA', { matchCase: false })
    // Esse exemplo usando o método contains não seria uma asserção.

    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac (não é aluno_ebac? Sair)')

  })

  it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    cy.get('#username').type('userinvalido@teste.com')
    cy.get('#password').type('teste@teste.com')
    cy.get('.woocommerce-form > .button').click()

    cy.get('.woocommerce-error > li').should('contain', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
    
  })
  it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    cy.get('#username').type('aluno_ebac@teste.com')
    cy.get('#password').type('senhainvalida@teste.com')
    cy.get('.woocommerce-form > .button').click()

    cy.get('.woocommerce-error > li').should('contain','Erro: A senha fornecida para o e-mail aluno_ebac@teste.com está incorreta. Perdeu a senha?')
    
  })

})
