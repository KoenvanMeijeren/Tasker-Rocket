describe('Check /login page redirection', () => {
    // Check if the page redirects to /login page after visiting a random url
    it('should redirect to /login page', () => {
        cy.visit('http://localhost:3000');
        cy.url().should('include', '/login');
        cy.visit('http://localhost:3000/randomUrl');
        cy.url().should('include', '/login');
    });
});
