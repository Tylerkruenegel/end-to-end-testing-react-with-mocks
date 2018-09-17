/* global given, when, then, */

import { HOME_PAGE } from '../../constants/ApplicationRoutes';
import * as apiRoute from '../../constants/ServerRoutes';
import articlesResponse from '../../fixtures/articles/TenArticles.json';
import tagsResponse from '../../fixtures/Tags.json';

const firstArticle = 0;

given('I am a guest user entering the homepage', () => {
  cy.server();
  cy.route(apiRoute.TEN_ARTICLES_NO_FILTERS, 'fixture:articles/TenArticles.json');
  cy.route(apiRoute.TAGS, 'fixture:Tags.json');
  cy.visit(HOME_PAGE);
});

when('I select a popular tag', () => {
  cy.route(apiRoute.ARTICLES_TAG_FILTER, 'fixture:articles/TenArticles.json').as('articlesWithTagRequest');
  cy.get('[test-id="tag"]').eq(0).click();
});

when('I select an article', () => {
  cy.route(apiRoute.ARTICLE, 'fixture:articles/TestArticle.json').as('articleRequest');
  cy.get('[test-id="article-preview"]').eq(firstArticle).click();
});

then('I see a list of 10 articles with correct fields', () => {
  cy.verifyArticles(articlesResponse.articles);
});

then('I see a list of popular tags', () => {
  tagsResponse.tags.forEach((tag) => {
    cy.get('[test-id="tag"]').eq(tagsResponse.tags.indexOf(tag)).should('contain', tag);
  });
});

then('a request is made to the articles api with the correct filter', () => {
  cy.wait('@articlesWithTagRequest').its('url').should('include', 'tag=Test&limit=10&offset=0');
});

then('the feed toggle should have a tab for the tag active', () => {
  cy.get('[test-id="tag-nav-item"]').should('contain', tagsResponse.tags[0]);
});

then('I am taken to the article I selected', () => {
  const articleSlug = articlesResponse.articles[firstArticle].slug;
  cy.wait('@articleRequest').its('url').should('include', `api/articles/${articleSlug}`);
  cy.url().should('include', `/article/${articleSlug}`);
});
