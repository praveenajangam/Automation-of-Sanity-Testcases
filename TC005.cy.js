//const { expect } = require("chai")

describe('TC005', () => {
    const productName = 'Prod-46'
    const projectName = 'project333'
  
    it("Login to the Design Studio", () => {
        cy.visit('https://gdfstudio.qa.concora.com/', { failOnStatusCode: false })
        cy.wait(2000)
        cy.get('button').contains('Log In').click()
        cy.wait(1000)
        //cy.get('input[type=email]').type('praveena.jangam@concora.com') 
        //cy.get('input[placeholder="Enter your email address"]').type('praveena.jangam@concora.com') 
        cy.get('.sc-ejRpRk > .exUtJa > .sc-ezWOiH').type('praveena.jangam@concora.com'); 
        cy.get('.sc-ejRpRk > .jHDfNU > .sc-ezWOiH').type('RohithCharan25#');
        cy.get('.sc-ejRpRk > .sc-bZkfAO').click()
        cy.wait(5000)
        //cy.url().should('eq', 'https://gdfstudio.qa.concora.com/')
    })
   
    it("Create and downaload Submittal", () => {
        cy.get('div').contains('Create a Submittal').click()
        cy.wait(2000)
        // select the first radio button
        cy.get('#useExistProject').click()
        //cy.get('#startNewProject').click()
        //following code is for existing project
        //cy.get('.css-qc6sy-singleValue').select(projectName,{force: true} )
        cy.get('#react-select-2-input').type(projectName)
        //cy.get('select').select(projectName)
        cy.get('button').contains('Select Project').click();
        //double clicking to move the focus
        cy.get('button').contains('Select Project').click()
        cy.wait(2000)
        cy.get('.sc-wAnfg > .sc-bczRLJ').click()
        cy.wait(2000)
        cy.get(':nth-child(1) > .sc-fmGnzW > :nth-child(1)').click()
        cy.wait(2000)
        cy.get('#btn-edit-project-details').click()
        cy.wait(2000)
        cy.get('#btn-review-submittal').click()
        cy.wait(2000)
        cy.get('#btn-download-submittal').click()
    })
   
})