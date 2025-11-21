describe('Navigation menu', () => {
    it('displays navigation menu and navigates to correct pages', () => {
        cy.visit('/')
        cy.get('.global-nav-menu').should('be.visible')
        cy.get('.global-nav-menu').within(() => {
            cy.contains('Home').should('be.visible').click()
        })


    })

})