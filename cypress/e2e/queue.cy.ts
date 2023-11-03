import { urlTest } from '../../src/constants/testConstants';

describe('stack works correctly', function() {
    beforeEach(function() {
        cy.visit(urlTest);
        cy.get('[data-cy="queuePage"]').click();
        cy.get('[data-testid="input"]').clear()
    });

    it('button is locked when the input is empty', function() {
        cy.get('[data-testid="input"]').should('contain', '')
        cy.get('[data-testid="add__button"]').should('be.disabled')
    });

    it('element adds correctly' , function() {
        const text = '10';
        cy.get('[data-testid="input"]').type(text)
        cy.get('[data-testid="add__button"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')

        cy.wait(100);

        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)')
            .should('have.text', '10')

        cy.get('div[class*="circle_head"]')
            .eq(0)
            .contains('head')

        cy.get('div[class*="circle_tail"]')
            .eq(0)
            .contains('tail')

        const newtext = '9';
        cy.get('[data-testid="input"]').type(newtext)
        cy.get('[data-testid="add__button"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(1)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')

        cy.wait(100);

        cy.get('div[class*="circle_circle"]')
            .eq(1)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)')
            .should('have.text', '9')

        cy.get('div[class*="circle_tail"]')
            .eq(0)
            .contains('tail')
            .should('not.exist')

        cy.get('div[class*="circle_tail"]')
            .eq(1)
            .contains('tail')
    });

    it('element delete correctly' , function() {
        const text = '10';
        cy.get('[data-testid="input"]').type(text)
        cy.get('[data-testid="add__button"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')

        cy.wait(100);

        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)')
            .should('have.text', '10')

        cy.get('div[class*="circle_head"]')
            .eq(0)
            .contains('head')

        cy.get('div[class*="circle_tail"]')
            .eq(0)
            .contains('tail')

        const newtext = '9';
        cy.get('[data-testid="input"]').type(newtext)
        cy.get('[data-testid="add__button"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(1)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')

        cy.wait(100);

        cy.get('div[class*="circle_circle"]')
            .eq(1)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)')
            .should('have.text', '9')

        cy.get('div[class*="circle_tail"]')
            .eq(0)
            .contains('tail')
            .should('not.exist')

        cy.get('div[class*="circle_tail"]')
            .eq(1)
            .contains('tail')

        cy.get('[data-testid="delete__button"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')

        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('contain', '')

        
        cy.get('div[class*="circle_head"]')
            .eq(1)
            .contains('head')
    });

    it('cleaning delete correctly' , function() {
        const text = '10';
        cy.get('[data-testid="input"]').type(text)
        cy.get('[data-testid="add__button"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')

        cy.wait(100);

        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)')
            .should('have.text', '10')

        cy.get('div[class*="circle_head"]')
            .eq(0)
            .contains('head')

        cy.get('div[class*="circle_tail"]')
            .eq(0)
            .contains('tail')

        const newtext = '9';
        cy.get('[data-testid="input"]').type(newtext)
        cy.get('[data-testid="add__button"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(1)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')

        cy.wait(100);

        cy.get('div[class*="circle_circle"]')
            .eq(1)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)')
            .should('have.text', '9')

        cy.get('div[class*="circle_tail"]')
            .eq(0)
            .contains('tail')
            .should('not.exist')

        cy.get('div[class*="circle_tail"]')
            .eq(1)
            .contains('tail')

        cy.get('[data-testid="delete__button"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')

        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('contain', '')

        
        cy.get('div[class*="circle_head"]')
            .eq(1)
            .contains('head')

        cy.get('[data-testid="clean__button"]').should('not.be.disabled').click()
        cy.get('div[class*="circle"]')
            .should('contain', '')

    });
})