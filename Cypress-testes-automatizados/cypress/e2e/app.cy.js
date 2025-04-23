import assert from 'assert'

class Registration {
  elements = {
    titleInput: () => cy.get('#title'), // <-- coleta de dado passado no Input
    titleFeedback: () => cy.get('#titleFeedback'), // <-- coleta de feedback do input
    urlInput: () => cy.get('#imageUrl'), // <-- coleta de dado passado no Input
    urlFeedback: () => cy.get('#urlFeedback'), // <-- coleta de feedback do input
    submitBtn: () => cy.get('#btnSubmit') // <-- btn submit 
  }

  // USO DE PROMMISE ASYNC E WAIGT NÃO USAR, CYPRESS TRABALHA DE UMA MANEIRA DIFERENTE COM REQUISIÇÕES ASSINCRONAS

  typeTitle(text) { // <-- função valida parametro vaziu + tipo texto
    if(!text) return; // <-- valida parametro vazio
    this.elements.titleInput().type(text) // <-- valida tipo text
  }

  typeUrl(text) { // <-- função valida parametro vaziu + tipo texto
    if(!text) return; // <-- valida parametro vazio
    this.elements.urlInput().type(text) // <-- valida tipo text
  }

  clickSubmit() { // <-- função detect click
    this.elements.submitBtn().click()
  }


}

const registration = new Registration()
const colors = {
    errors: 'rgb(220, 53, 69)',
    sucess: ''
}

describe('Image Registration', () => {
  describe('Submitting an image with invalid inputs', () => {
    after(() => {
      cy.clearAllLocalStorage() // limpar local Storage
    })

    const input =  {
      title: "",
      url: ""
    }

    it('I am on the image registration page', () => {
      cy.visit('/') // <- visita pagina base URL definida no arquivo de configuraçãoes

    })

    it(`When I enter ${input.title || ""} in the title field`, () => {
      registration.typeTitle(input.title)
    })
    it(`Then I enter ${input.url} in the URL field`, () => {
      registration.typeUrl(input.url)
    })
    it(`Then I click the submit button`, () => {
      registration.clickSubmit()
    })
    it(`Then I should see "Please type a title for the image" message above the title field`, () => {

      // registration.elements.titleFeedback().should(elements => {
      //   debugger
      // })
      registration.elements.titleFeedback().should('contains.text', 'Please type a title for the image.') // <-validando feedback do input

    })
    it(`And I should see "Please type a valid URL" message above the imageUrl field`, () => {
      registration.elements.urlFeedback().should('contains.text', 'Please type a valid URL') // <-validando feedback do input
    })
    it(`And I should see an exclamation icon in the title and URL fields`, ()=> {
      registration.elements.titleInput().should(([elements]) => {
        const styles = window.getComputedStyle(elements)
        const border = styles.getPropertyValue('border-right-color')
        assert.strictEqual(border, colors.errors)

        //debugger
      })
    })


  })
})