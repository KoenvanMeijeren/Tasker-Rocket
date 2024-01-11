describe('Check /login page', () => {
    beforeEach(() => {
        cy.visit(`/login`);
    });

    // Check if the page contains a title
    it('should contain a title', () => {
        cy.get('[data-cy="heading"]').should('exist');
    });

    // Check if the page contains a login button
    it('should contain a login button', () => {
        cy.get('[data-cy="login-button"]').should('exist');
    });
});
