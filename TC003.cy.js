//const { expect } = require("chai")

describe('TC003', () => {
    const productName = 'Prod-46'
    var csv_file = 'GDF Studio Product Data 08242022T094445'
    var file_name = 'Cypress/downloads/'+productName+'/'+csv_file+'.csv'
    var productCreateFlag = 'New Product'
    var productCreateOldFlag = productCreateFlag
    var productPublishStatus = 'Product Publish'
    var revitFileUpload = 'Y'
    // https://www.us.kohler.com/us is not loading, hence Revit Files to be created manually
    /*it("Create CSV Files", () => {
        //cy.visit('https://www.us.kohler.com/us', { failOnStatusCode: false })
        //cy.get('.centre').click()
        cy.log('https://www.us.kohler.com/us is not loading, hence Revit Files to be created manually')
    })
    */
    it("Login to the Studio Manager", () => {
        cy.visit('https://gdfstudio.smartbim.us', { failOnStatusCode: false })
        cy.get('#user_email').type('praveena.jangam@concora.com'); 
        cy.get('#user_password').type('RohithCharan25#');
        cy.get('#user_login').contains('Login', { timeout: 10000 }).click().should('not.exist');
        cy.wait(1000)
        cy.url().should('eq', 'https://gdfstudio.smartbim.us/')
    })
    it("Import CSV File(s)", () => {
        cy.wait(5000)
        //cy.get('button').contains('Create Product').click()
        //cy.get('.modal-title').should("have.text", "Create a Product")
        cy.get('.button--grey').contains('Import CSV', { timeout: 5000 }).click()
        cy.get('.react-fine-uploader-file-input').click()
        cy.log('file Name'+file_name)
        cy.get('input[type=file]').selectFile(file_name)
        cy.wait(10000)
        //cy.get('button').contains('Start Processing').click().should('not.exist')
        cy.wait(5000)
        cy.get('.mb-1').then(($mb1) => {
            //cy.log('$mb1='+$mb1.text())
            if( $mb1.text() == '0 Products Created' )       
            {
                cy.log('No Products Created')
                revitFileUpload = 'N'
                assert.equal(revitFileUpload,'N', '_**No Products uploaded**_')
            } else
            {
                cy.log('Product "'+productName+'" Created')
            }     
        })
        cy.wait(2000)          
    })
    
    it("Download and Publish the Product", () => {
        //cy.get('.product__controls > .button--default').click()
        if(productCreateFlag == productCreateOldFlag){
            //assert.equal(productCreateFlag, productCreateOldFlag, '_**Product "'+productName+'" is Created **_');    
        }else{
            assert.equal(productCreateFlag,productCreateOldFlag, '_**New Product is NOT Created as**_');
        }     
        cy.get('h1').then(($body1) => {
            cy.log($body1.text())
            if ($body1.text() == productName) {
                //cy.get('button').contains('Download').click()
                cy.get('.product__controls > .button--default').click()
                cy.log('Product "'+productName+'" is Downloaded')
                cy.get('.button--green').click()
                //cy.get('button').contains('Publish').click()
                cy.wait(2000)
                cy.get('.modal-title').should("have.text", 'Publish '+productName)
                //cy.get('.modal-footer > :nth-child(1)').click()
                cy.get('.modal-footer > :nth-child(1)').click()
                //cy.get('button').contains('Confirm').click()
                //cy.wait(2000)
                cy.get('.modal-body').should("have.text", productName+' have been sent to be published.')
            
                cy.wait(5000)
                cy.get('.modal-footer > .button').click()
            
            } else {
                cy.log('Product "'+productName+'" is not Selected')
            }
        })
 
    })
    
    /* No Login needed to Design Studio
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
    })*/
    
    it("Search Product", () => {
        if(productCreateFlag == productCreateOldFlag){
            //assert.equal(productCreateFlag, productCreateOldFlag, '_**Product "'+productName+'" is Created **_');    
        }else{
            assert.equal(productCreateFlag,productCreateOldFlag, '_**New Product is NOT Created as**_');
        }
        //assert.equal('Product Publish',productPublishStatus, '_**Product Is NOT Published**_');
        cy.visit('https://gdfstudio.qa.concora.com')
        cy.wait(5000)
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
        cy.visit('https://gdfstudio.smartbim.us', { failOnStatusCode: false })
        cy.get('#user_email').type('praveena.jangam@concora.com');
        cy.get('#user_password').type('RohithCharan25#');
        cy.get('#user_login').contains('Login', { timeout: 5000 }).click().should('not.exist');
        //cy.wait(5000)
        //cy.url().should('eq', 'https://gdfstudio.smartbim.us/')
        cy.get('.input--text').type(productName)
        cy.wait(7000)
        cy.get('h4').then(($body) => {
            if ($body.text().includes(productName)) {
                // yup found it
                //cy.log($body.text())
                cy.get('h4').contains(productName).click()
                cy.wait(15000)
                cy.get('h1').then(($body1) => {
                    if ($body1.text() == productName) {
                        cy.log('Product "' + $body1.text()+'" Retrieved' )
                        cy.get('.product__controls').within(() => {
                            cy.get('button').then(($btn) => {
                                if($btn.hasClass('dropdown-toggle')){
                                    //cy.log(productName+' is published...')                        
                                    cy.get('div').then(($cntrl) => {
                                    if($cntrl.hasClass('dropdown__title')){
                                        cy.log('"'+productName+'" is a published product...')
                                        cy.get('#ProductHeaderControlsPublishButton').click()
                                        cy.wait(10000)
                                        cy.get('.dropdown__item').contains('Unpublish').click()
                                        cy.wait(5000)
                                        
                                        cy.get('.modal-title').should('contain','Unpublish')
                                        //cy.get('.modal-title').contains('Unpublish '+productName)
                                        cy.get('.modal-footer > :nth-child(1)').click()
                                        //cy.get('.button').contains('Confirm').click()
                                        cy.wait(5000)
                                        cy.get('.modal-footer > .button').click
                                                                                
                                    }else{
                                        cy.log('"'+productName+'" is NOT a published Product...')
                                        productPublishStatus = 'No'
                                        //assert.equal('Product Publish',productPublishStatus, '_**Product Is NOT Published**_');
                     
                                    }
                                })
                                }else{
                                    cy.log('"'+productName+'" is NOT a published Product...')
                                    productPublishStatus = 'No'
                                    //assert.equal('Product Publish',productPublishStatus, '_**Product Is NOT Published**_');
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
            cy.visit('https://gdfstudio.smartbim.us', { failOnStatusCode: false })
            cy.get('#user_email').type('praveena.jangam@concora.com');
            cy.get('#user_password').type('RohithCharan25#');
            cy.get('#user_login').contains('Login', { timeout: 5000 }).click().should('not.exist');
            //cy.get('.input--text').clear()    
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