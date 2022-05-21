class EnderecoPage {

  editarEnderecoFaturamento(nome, sobrenome, empresa, pais, endereco, numero, cidade, estado, cep, telefone, email) { // editarEnderecoFaturamento é o método
  // elementos + ações (type, click, select ...)
    cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a').click()
    cy.get(':nth-child(1) > .title > .edit').click()

    cy.get('#billing_first_name').clear().type(nome)
    cy.get('#billing_last_name').clear().type(sobrenome)
    cy.get('#billing_company').clear().type(empresa)

    cy.get('#select2-billing_country-container').click().type(pais).get('[aria-selected="true"]').click() // podemos fazer o uso do .get para ficar na mesma lógica do código, não precisado passar cy.get em linha abaixo.

    cy.get('#billing_address_1').clear().type(endereco)
    cy.get('#billing_address_2').clear().type(numero)
    cy.get('#billing_city').clear().type(cidade)
    cy.get('#select2-billing_state-container').click().type(estado + '{enter}') // utilizando ação de teclado em vez de clique .type('Paraná{enter}'). Quando usamos dados fixos fica de uma forma a escrita do códido. Quando utlizamos parâmetros deve ser feito o uso da concateção: type(estado + '{enter}')
    cy.get('#billing_postcode').clear().type(cep)
    cy.get('#billing_phone').clear().type(telefone)
    cy.get('#billing_email').clear().type(email)
    cy.get('.button[name="save_address"]').click() //Forma utlizada na aula: cy.get(':nth-child(2) > .button').click()
  }

  editarEnderecoEntrega() { 

  }

}

export default new EnderecoPage() 

// Para que essa classe fique exposta para que outros arquivos possam ver, usamos o export.
// Dessa forma podemos usar essa classe em outros arquivos de testes.