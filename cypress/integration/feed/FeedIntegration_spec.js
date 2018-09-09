describe('does something', () => {
  it('shows the site title in the banner', () => {
    cy.visit('http://localhost:4100/');
    cy.get('[test-id="site-title"').contains('conduit');
  });

  it('shows the article author', () => {
    cy.visit('http://localhost:4100/');

    // Explain why the contains assertion would be fragile
    cy.get('[test-id="article-author"]').contains('reyansh');
  });

  it('shows the article date', () => {
    cy.visit('http://localhost:4100/');
    // Same thing here.
    cy.get('[test-id="article-post-date"]').contains('Sat Aug 18 2018');
  });

  it('shows ten articles', () => {
    cy.visit('http://localhost:4100');
    // Figure out how to assert the number of article previews on the page.
  });
});
