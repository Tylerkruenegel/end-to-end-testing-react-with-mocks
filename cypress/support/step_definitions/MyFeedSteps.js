/* global given, when, then, */

import { HOME_PAGE } from '../../constants/ApplicationRoutes';
import * as apiRoute from '../../constants/ServerRoutes';
import feedArticlesResponse from '../../fixtures/articles/FeedArticles.json';

given('I am an existing user entering the homepage', () => {
  cy.setAuthToken();
  cy.server();
  cy.route(apiRoute.FEED, 'fixture:articles/FeedArticles.json');
  cy.route(apiRoute.TAGS, 'fixture:Tags.json');
  cy.route(apiRoute.USER, 'fixture:LoginResponse.json');
  cy.visit(HOME_PAGE);
});

when('I select the global feed', () => {
  cy.route(apiRoute.TEN_ARTICLES_NO_FILTERS, 'fixture:articles/TenArticles.json');
  cy.get('[test-id="global-feed-nav-item"]').click();
});

then('I see a list of my feed articles', () => {
  cy.verifyArticles(feedArticlesResponse.articles);
});
