Cypress.Commands.add('verifyArticles', (articles) => {
  articles.forEach((article) => {
    cy.get('[test-id="article-preview"]').eq(articles.indexOf(article)).within(() => {
      cy.get('[test-id="article-author"]').should('contain', article.author.username);
      cy.get('[test-id="article-title"]').should('contain', article.title);
      cy.get('[test-id="article-description"]').should('contain', article.description);
    });
  });
});

Cypress.Commands.add('setAuthToken', () => {
  localStorage.setItem('jwt', 'thisIsTheKey');
});
