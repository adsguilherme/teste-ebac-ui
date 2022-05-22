/// <reference types="cypress" />

import EnderecoPage from '../support/page-object/endereco.page' // Realizando o import da classe 

const dadosEndereco = require('../fixtures/endereco.json') // podemos fazer um IMPORT ou CONST
// import dadosEndereco from '../fixtures/endereco.json'

describe('Funcionalidade Endereços - Faturamento e Entrega', () => {

  beforeEach(() => {
    cy.visit('minha-conta');
    cy.fixture('perfil').then((dados) => {
      cy.login(dados.usuario, dados.senha) // Custom command
    })
  })

  it('Deve fazer cadastro de faturamento com sucesso', () => {
    // Todo o código estará no arquivo endereco.page.js, deixando o arquivo de teste clean, reaproveitável e com uma manutenção fácil, devido o uso do padrão POM.
    EnderecoPage.editarEnderecoFaturamento('Isaque', 'Sousa', 'Tesla', 'Brasil', 'Av. Sky', '777', 'Osasco', 'São Paulo', '01001000', '1199999999', 'gscode@ebac.com.br' ) 
    // Resultado esperado não fica dentro da classe page object, deixamos dentro do teste. Lembrando que na classe POM deixamos apenas 'elementos e ações'.
    cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
  })

  it('Deve fazer cadastro de faturamento com sucesso - Usando arquivo de dados', () => {
    // Com o uso de lista, dentro dos parâmetros podemos passar qual a posição que desejamos utilizar. Neste caso, está utlizando a posição 1 da lista de dados, que consta no arquivo endereco.json.  
    EnderecoPage.editarEnderecoFaturamento(
      dadosEndereco[1].nome,
      dadosEndereco[1].sobrenome, 
      dadosEndereco[1].empresa, 
      dadosEndereco[1].pais, 
      dadosEndereco[1].endereco, 
      dadosEndereco[1].numero, 
      dadosEndereco[1].cidade, 
      dadosEndereco[1].estado, 
      dadosEndereco[1].cep, 
      dadosEndereco[1].telefone, 
      dadosEndereco[1].email) 
    cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
  })
})