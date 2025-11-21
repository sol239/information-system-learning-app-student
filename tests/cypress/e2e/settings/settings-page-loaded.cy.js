describe('Settings page loads correctly', () => {
    // TODO: more tests? maybe test language selection etc.
    it('loads the settings page and displays main elements', () => {
        cy.visit('/settings')
        cy.get('.settings-page-title').contains('Settings')
        cy.get('.settings-page-description').contains('Customize your application preferences and shortcuts')
    })
})