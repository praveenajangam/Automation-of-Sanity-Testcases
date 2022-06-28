//const { expect } = require("chai")

describe('TC001', () => {
    const productName = 'Prod-39'
    var productCreateFlag = 'New Product'
    var productCreateOldFlag = productCreateFlag
    var productPublishStatus = 'Product Publish'
/*    before(function () {
        cy.getCookie('has-failed-test').then(function(cookie) {
            if (cookie && typeof cookie === 'object' && cookie.value === 'true') {
                Cypress.runner.stop();
            }
        });
    });
*/    
    it("Login to the Studio Manager", () => {
        cy.visit('https://gdfstudio.smartbim.us/login', { failOnStatusCode: false })
        //cy.visit(Cypress.env('Design Manager'))
        cy.get('#user_email').type('praveena.jangam@concora.com');
        cy.get('#user_password').type('RohithCharan25#');
        cy.get('#user_login').contains('Login', { timeout: 5000 }).click().should('not.exist');
        cy.url().should('eq', 'https://gdfstudio.smartbim.us/')
    })
    it("Create Product", () => {
        //cy.get('.input--text').type(productName)
        cy.wait(5000)
        cy.get('button').contains('Create Product').click()
        //cy.log('Create a Product: First window ........')
        cy.get('.modal-title').should("have.text", "Create a Product")
        cy.get('.panel-button').contains('Start from scratch', { timeout: 5000 }).click()
        //cy.log('Create a Product: Second window ........')
        cy.get('.modal-title').should("have.text", "Create a Product")
        cy.get('.mb-1').should("have.text", "Name the Product")

        cy.get('.form-control').type(productName)
        //cy.log('.form-control.text() 1'+ cy.get('.form-control').title())
        //cy.get('.modal-body > :nth-child(1) > .button').click()
        
        cy.get('.modal-body > :nth-child(1) > .button').click()  //.should('not.exist')
        //cy.get('.modal-body > :nth-child(1) > .button').should('be')
        cy.wait(10000)

        cy.get('div').then(($div) => {
            if($div.hasClass('modal-body')){
                //cy.log('Product "'+productName+'" exists, please create a new product')
                cy.get('.close > [aria-hidden="true"]').click()
                //cy.get('prodctCreateFlag').invoke('text').as('N')
                //cy.get('var[name="prodctCreateFlag"]').type('N')  
                productCreateOldFlag = 'Old Product'
                if(productCreateFlag == productCreateOldFlag){
                    assert.equal(productCreateFlag, productCreateOldFlag, '_**Product "'+productName+'" is Created **_');    
                }else{
                    assert.equal(productCreateFlag,productCreateOldFlag, '_**New Product is NOT Created as**_');
                }     
            }else{
                cy.log('production creation successful***')
                //productCreateFlag = ''
                //cy.wait(1000)
            }
        })
        
    })
    

    
    it("Verify the Product Creation", () => {
        //cy.url().should("include", "products")
        if(productCreateFlag == productCreateOldFlag){
            assert.equal(productCreateFlag, productCreateOldFlag, '_**Product "'+productName+'" is Created **_');    
        }else{
            assert.equal(productCreateFlag,productCreateOldFlag, '_**New Product is NOT Created as**_');
        }     
        //expect(productCreateFlag).to.equal('Y')
        cy.get('.input--text').clear()
        cy.get('.input--text').type(productName)
        cy.wait(10000)
        cy.get('h4').then(($body) => {
            if ($body.text().includes(productName)) {
                // yup found it
                //cy.log($body.text())
                cy.get('h4').contains(productName).click()
                cy.wait(12000)
                cy.get('h1').then(($body1) => {
                    if ($body1.text() == productName) {
                        cy.log('Product "' + $body1.text()+'" Successfully Created')
                    } else {
                        cy.log('Product "'+productName+'" is not Created')
                    }
                })

            } else {
                //cy.log($body.text())
                cy.log('Product "'+productName+'" is not Created')
            }
        })
        
    })
    
    it("Download and Publish the Product", () => {
        //cy.get('.product__controls > .button--default').click()
        if(productCreateFlag == productCreateOldFlag){
            //assert.equal(productCreateFlag, productCreateOldFlag, '_**Product "'+productName+'" is Created **_');    
        }else{
            assert.equal(productCreateFlag,productCreateOldFlag, '_**New Product is NOT Created as**_');
        }     
        cy.get('h1').then(($body1) => {
            if ($body1.text() == productName) {
                cy.get('button').contains('Download').click()
                cy.log('Product "'+productName+'" is Downloaded')
                cy.get('button').contains('Publish').click()
                cy.get('.modal-title').should("have.text", 'Publish '+productName)
                //cy.get('.modal-footer > :nth-child(1)').click()
                cy.get('button').contains('Confirm').click()
                cy.get('.modal-body').should("have.text", productName+' has successfully published.')
                cy.get('.modal-footer > .button').click()
                cy.wait(5000)
                if(cy.get('.mb-1').contains('Product is Being Published...')){
                    cy.log('Product "'+productName+'" is Being Published ....')
                    productPublishStatus = 'No'
                    assert.equal('Product Publish',productPublishStatus, '_**Product Is NOT Published**_');
                    
                    //cy.contains("Product Not Published");
                    //cy.return(false)
                }
            } else {
                cy.log('Product "'+productName+'" is not Selected')
            }
        })
 
    })
    
    it("Login to the Design Studio", () => {
        if(productCreateFlag == productCreateOldFlag){
            //assert.equal(productCreateFlag, productCreateOldFlag, '_**Product "'+productName+'" is Created **_');    
        }else{
            assert.equal(productCreateFlag,productCreateOldFlag, '_**New Product is NOT Created as**_');
        }     
        cy.visit('https://gdfstudio.qa.concora.com/login')
        cy.wait(5000)
        cy.get('.sc-fsyvLD > .exUtJa > .sc-ezWOiH').type('praveena.jangam@concora.com')
        //cy.get('.sc-fsyvLD').should('have.length','0')
        cy.get('.sc-fsyvLD > .jHDfNU > .sc-ezWOiH').type('RohithCharan25#')
        cy.get('.sc-fsyvLD > .sc-bZkfAO').click()
        cy.get('.sc-bZkfAO').contains('Log In').click()
        cy.wait(10000)
    })
    it("Search Product", () => {
        if(productCreateFlag == productCreateOldFlag){
            //assert.equal(productCreateFlag, productCreateOldFlag, '_**Product "'+productName+'" is Created **_');    
        }else{
            assert.equal(productCreateFlag,productCreateOldFlag, '_**New Product is NOT Created as**_');
        }
        //assert.equal('Product Publish',productPublishStatus, '_**Product Is NOT Published**_');
        
        cy.get('.sc-bVFNGH').type(productName)
        cy.get('.sc-iNWwEs').click();
        cy.wait(10000)
        cy.get('.clamp-lines').then(($clamp) => {
            if ($clamp.text().includes(productName)) {
                cy.get('.clamp-lines').contains(productName).click()
                cy.wait(1000)
                cy.get('.sc-bZnhIo').then(($body2) => {
                    if ($body2.text() == productName) {
                        cy.log('Product "'+productName+'" Retrieved')
                    } else {
                        cy.log('Product "'+productName+'" Doesnt Exist')
                    }
                })
                //cy.log(productName+' exists')
            } else {
                cy.log('Product "'+productName+'" Doesnt Exist')
            }
        })
    })
    
    it("UnPublish the Product", () => {
        if(productCreateFlag == productCreateOldFlag){
            //assert.equal(productCreateFlag, productCreateOldFlag, '_**Product "'+productName+'" is Created **_');    
        }else{
            assert.equal(productCreateFlag,productCreateOldFlag, '_**New Product is NOT Created as**_');
        } 
        cy.visit('https://gdfstudio.smartbim.us/login', { failOnStatusCode: false })
        cy.get('#user_email').type('praveena.jangam@concora.com');
        cy.get('#user_password').type('RohithCharan25#');
        cy.get('#user_login').contains('Login', { timeout: 5000 }).click().should('not.exist');
        //cy.wait(5000)
        cy.url().should('eq', 'https://gdfstudio.smartbim.us/')
        cy.get('.input--text').type(productName)
        cy.wait(5000)
        cy.get('h4').then(($body) => {
            if ($body.text().includes(productName)) {
                // yup found it
                //cy.log($body.text())
                cy.get('h4').contains(productName).click()
                cy.wait(12000)
                cy.get('h1').then(($body1) => {
                    if ($body1.text() == productName) {
                        cy.log('Product "' + $body1.text()+'" Retrieved' )
                        cy.get('.product__controls').within(() => {
                            cy.get('button').then(($btn) => {
                                if($btn.hasClass('dropdown-toggle')){
                                    //cy.log(productName+' is published...')                        
                                    cy.get('div').then(($cntrl) => {
                                    if($cntrl.hasClass('dropdown__title')){
                                        cy.log('Product "'+productName+'" is published...')
                                        cy.get('#ProductHeaderControlsPublishButton').click()
                                        cy.wait(1000)
                                        cy.get('.product__controls > .dropdown > .dropdown-menu > :nth-child(2) > a').click()
                                        //to enable below commands for published product testing
                                        cy.get('.modal-footer > :nth-child(1)').click().should('not.exist')
                                        cy.get('.modal-footer > .button').click
                                        
                                    }else{
                                        cy.log('"'+productName+'" is NOT a published Product...')
                                        productPublishStatus = 'No'
                                        assert.equal('Product Publish',productPublishStatus, '_**Product Is NOT Published**_');
                     
                                    }
                                })
                                }else{
                                    cy.log('"'+productName+'" is NOT a published Product...')
                                    productPublishStatus = 'No'
                                    assert.equal('Product Publish',productPublishStatus, '_**Product Is NOT Published**_');
                                                 }
                                
                            })

                        })
                    } else {
                        cy.log('Product "'+productName+' " is not Retrieved')
                        cy.log('Product "'+productName+' " cant be unpublished')
                    }
                })

            } else {
                cy.log($body.text())
                cy.log('Product "'+productName+'" doesnt exist')
            }
        })

    })
    
        it("Delete the Product", () => {    
            if(productCreateFlag == productCreateOldFlag){
                //assert.equal(productCreateFlag, productCreateOldFlag, '_**Product "'+productName+'" is Created **_');    
            }else{
                assert.equal(productCreateFlag,productCreateOldFlag, '_**New Product is NOT Created as**_');
            } 
            cy.get('.input--text').clear()    
            cy.get('.input--text').type(productName)
                cy.wait(5000)
                cy.get('h4').then(($body) => {
                    if ($body.text().includes(productName)) {
                      // yup found it
                      //cy.log($body.text())
                      cy.get('h4').contains(productName).click()
                      cy.wait(10000)
                      cy.get('h1').then(($body1) => {     
                        if ($body1.text() == productName) {
                          //cy.log('Exists='+$body1.text() + 'string='+$body1.text().toString)
                          cy.get('.product__controls > .button--red').click()
                          cy.contains('Yes, Delete').click().should('not.exist')
                          cy.get('.modal-footer > .button').click().should('not.exist')
                          cy.log('Product "'+productName+'" deleted ')
                         } else {
                          //cy.log('length='+$body1.text())
                          cy.log('Product "'+productName+'" cant be deleted as it doesnt exist')
                        }
                      })
        
                    } else {
                      //cy.log($body.text())
                      cy.log('Product "'+productName+'" cant be deleted as it doesnt exist')
                    }
                })
                cy.get('.input--text').clear()    
                cy.get('.input--text').type(productName)
            })

})

