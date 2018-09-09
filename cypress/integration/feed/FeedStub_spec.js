const articlesRespose = require('../../fixtures/articles/TenArticles.json').articles;

describe('does something', () => {
  it('shows the site title in the banner', () => {
    cy.server();
    cy.route('/api/articles?limit=10&offset=0', 'fixture:articles/TenArticles.json');
    cy.visit('http://localhost:4100/');
    cy.get('[test-id="site-title"').contains('conduit');
  });

  it('shows the article author', () => {
    cy.server();
    cy.route('/api/articles?limit=10&offset=0', 'fixture:articles/TenArticles.json');
    cy.visit('http://localhost:4100/');
    cy.get('[test-id="article-author"]').contains(articlesRespose[0].author.username);
  });

  it('shows the article date', () => {
    cy.server();
    cy.route('/api/articles?limit=10&offset=0', 'fixture:articles/TenArticles.json');
    cy.visit('http://localhost:4100/');
    cy.get('[test-id="article-post-date"]').contains('Sat Aug 18 2018');
  });

  it('shows ten articles', () => {
    cy.server();
    cy.route('/api/articles?limit=10&offset=0', 'fixture:articles/TenArticles.json');
    cy.visit('http://localhost:4100');
  });
});
