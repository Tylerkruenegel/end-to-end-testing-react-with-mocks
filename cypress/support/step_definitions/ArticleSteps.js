/* global given, when, then */
import { ARTICLE } from '../../constants/ApplicationRoutes';
import * as apiRoute from '../../constants/ServerRoutes';
import articleResponse from '../../fixtures/articles/TestArticle.json';
import commentsResponse from '../../fixtures/Comments.json';

given('I am a user viewing an article', () => {
  cy.setAuthToken();
  cy.server();
  cy.route(apiRoute.USER, 'fixture:LoginResponse.json');
  cy.route(apiRoute.ARTICLE, 'fixture:articles/TestArticle.json');
  cy.route(apiRoute.COMMENTS, 'fixture:Comments.json');
  cy.visit(ARTICLE);
});

then('I see the article', () => {
  cy.log(articleResponse);
  cy.get('[test-id="article-body"]').should('contain', articleResponse.article.body);
  cy.get('[test-id="tag-list"]').within(() => {
    cy.get('[test-id="tag"]').each((tag, index) => {
      cy.wrap(tag).should('contain', articleResponse.article.tagList[index]);
    });
  });
});

then('I see a list of comments', () => {
  const comments = commentsResponse.comments;
  cy.get('[test-id="comment-list"]').within(() => {
    cy.get('[test-id="comment"]').each((comment, index) => {
      cy.wrap(comment).within(() => {
        cy.get('[test-id="comment-author"]').should('contain', comments[index].author.username);
        cy.get('[test-id="comment-author-image"]').should('have.attr', 'src', comments[index].author.image);
        cy.get('[test-id="comment-body"]').should('contain', comments[index].body);
      });
    });
  });
});
