/* global given, when, then */
import { ARTICLE } from '../../constants/ApplicationRoutes';
import * as apiRoute from '../../constants/ServerRoutes';

given('I am a user viewing an article', () => {
  cy.setAuthToken();
  cy.server();
  cy.route(apiRoute.USER, 'fixture:LoginResponse.json');
  cy.route(apiRoute.ARTICLE, 'fixture:articles/TestArticle.json');
  cy.route(apiRoute.COMMENTS, 'fixture:Comments.json');
  cy.visit(ARTICLE);
});
