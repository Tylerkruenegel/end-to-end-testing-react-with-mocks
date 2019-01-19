/* global given, when, then, */

import { PROFILE_PAGE } from '../../constants/ApplicationRoutes';
import * as apiRoute from '../../constants/ServerRoutes';
import myArticle from '../../fixtures/articles/ArticleAuthorResponse.json';

given('I am an existing user entering my profile', () => {
  cy.setAuthToken();
  cy.wait(2000);
  cy.server();
  cy.route(apiRoute.PROFILE, 'fx:ProfileResponse.json');
  cy.route(apiRoute.ARTICLES_AUTHOR_FILTER, 'fx:articles/ArticleAuthorResponse.json');
  cy.visit(PROFILE_PAGE);
});

then('I see articles I have written', () => {
  cy.verifyArticles(myArticle.articles);
});
