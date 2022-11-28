//const { expect } = require("chai")

describe('TC004', () => {
    const productName = 'Prod-46'
    var csv_file = 'GDF Studio Product Data 08242022T094445'
    var file_name = 'Cypress/downloads/'+productName+'/'+csv_file+'.csv'
    var productCreateFlag = 'New Product'
    var productCreateOldFlag = productCreateFlag
    var productPublishStatus = 'Product Publish'
    var revitFileUpload = 'Y'
    const zipCode = '30092'

    it("Login to the Studio Manager", () => {
        cy.visit('https://gdfstudio.qa.concora.com/', { failOnStatusCode: false })
        cy.get('button').contains('Log In').click()
        cy.wait(1000)
        //cy.get('input[type="email"]').type('praveena.jangam@concora.com') 
        //cy.get('.sc-ezWOiH').contains('Enter your email address').type('praveena.jangam@concora.com')
        cy.get('.sc-ejRpRk > .exUtJa > .sc-ezWOiH').type('praveena.jangam@concora.com'); 
        cy.get('.sc-ejRpRk > .jHDfNU > .sc-ezWOiH').type('RohithCharan25#');
        cy.get('.sc-ejRpRk > .sc-bZkfAO').click()
        //cy.get('#user_login').contains('Login', { timeout: 10000 }).click().should('not.exist');
        cy.wait(5000)
        cy.url().should('eq', 'https://gdfstudio.qa.concora.com/')
    })
    
    it("Contact Sales Rep", () => {
        cy.get('.sc-dHnBmY').click()
        cy.get(':nth-child(2) > :nth-child(2) > .sc-ezWOiH').type(zipCode)
        cy.get('.sc-gSAPjG').type('Test - Contact Sales Rep')
        cy.get('.sc-bZkfAO').click()
        cy.wait(2000)   
    })
    it("Request A Quote", () => {
        cy.wait(2000)   
        cy.get('.sc-izdjZO').type(productName)
        cy.get('h2').then(($body) => {
            if ($body.text().includes(productName)) {
              // yup found it
              cy.log($body.text())
              cy.get('div').contains(productName).click()
              cy.wait(10000)
            }
        })
        cy.get('button').contains('Request A Quote').click()
        cy.get(':nth-child(2) > :nth-child(2) > .sc-ezWOiH').type(zipCode)
        cy.get('.sc-gSAPjG').type('test - Request A Quote')
        cy.get('form > .sc-bZkfAO').click()
    })
})