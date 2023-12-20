describe('Check /login page redirection', () => {
    const baseUrl = Cypress.config('baseUrl');

    // Check if the page redirects to /login page after visiting a random url
    it('should redirect to /login page', () => {
        cy.visit(`${baseUrl}`);
        cy.url().should('include', '/login');
        cy.visit(`${baseUrl}/randomUrl`);
        cy.url().should('include', '/login');
    });
});
