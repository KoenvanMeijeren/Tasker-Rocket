describe('Check /login page', () => {
    const baseUrl = Cypress.config('baseUrl');

    beforeEach(() => {
        cy.visit(`${baseUrl}/login`);
    });

    // Check if the page contains a title
    it('should contain a title', () => {
        cy.get('.chakra-heading').should('exist');
    });

    // Check if the page contains a login button
    it('should contain a login button', () => {
        cy.get('.css-dvxtzn > .chakra-button').should('exist');
    });
});
