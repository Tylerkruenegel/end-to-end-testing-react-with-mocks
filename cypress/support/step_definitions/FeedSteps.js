/* global given, when, then, */

import * as appRoute from '../../constants/ApplicationRoutes';
import * as apiRoute from '../../constants/ServerRoutes';
import articlesResponse from '../../fixtures/articles/TenArticles.json';
import tags from '../../fixtures/Tags.json';

given('I am a guest user entering the homepage', () => {
  cy.server();
  cy.route(apiRoute.TEN_ARTICLES_NO_FILTERS, 'fixture:articles/TenArticles.json');
  cy.route(apiRoute.TAGS, 'fixture:Tags.json');
  cy.visit(appRoute.HOME_PAGE);
});

when('I select a popular tag', () => {
  cy.route(apiRoute.ARTICLES_TAG_FILTER, 'fixture:articles/TenArticles.json').as('articlesWithTagRequest');
  cy.get('[test-id="tag"]').eq(0).click();
});

when('I select an article', () => {
  cy.route(apiRoute.ARTICLE, 'fixture:articles/TestArticle.json').as('articleRequest');
  cy.get('[test-id="article-preview"]').eq(0).click();
});

then('I see a list of 10 articles with correct fields', () => {
  const articles = articlesResponse.articles;
  articles.forEach((article) => {
    cy.get('[test-id="article-preview"]').eq(articles.indexOf(article)).within(() => {
      cy.get('[test-id="article-author"]').should('contain', article.author.username);
      cy.get('[test-id="article-title"]').should('contain', article.title);
      cy.get('[test-id="article-description"]').should('contain', article.description);
    });
  });
});

then('I see a list of popular tags', () => {
  const tagsList = tags.tags;
  tagsList.forEach((tag) => {
    cy.get('[test-id="tag"]').eq(tagsList.indexOf(tag)).should('contain', tag);
  });
});

then('a request is made to the articles api with the correct filter', () => {
  cy.wait('@articlesWithTagRequest').its('url').should('include', 'tag=Test&limit=10&offset=0');
});

then('the feed toggle should have a tab for the tag active', () => {
  cy.get('[test-id="tag-nav-item"]').should('contain', tags.tags[0]);
});

then('I am taken to the article I selected', () => {
  cy.wait('@articleRequest').its('url').should('include', 'api/articles/test');
  cy.url().should('include', '/article/test');
});
