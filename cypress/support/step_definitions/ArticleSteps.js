/* global given, when, then */
import { ARTICLE } from '../../constants/ApplicationRoutes';
import * as apiRoute from '../../constants/ServerRoutes';
import articleResponse from '../../fixtures/articles/TestArticle.json';
import commentsResponse from '../../fixtures/Comments.json';
import addCommentResponse from '../../fixtures/AddCommentResponse.json';

const commentText = 'Cypress testing';

given('I am a user viewing an article', () => {
  cy.setAuthToken();
  cy.server();
  cy.route(apiRoute.USER, 'fixture:LoginResponse.json');
  cy.route(apiRoute.ARTICLE, 'fixture:articles/TestArticle.json');
  cy.route(apiRoute.COMMENTS, 'fixture:Comments.json');
  cy.visit(ARTICLE);
});

when('I add a comment', () => {
  cy.fixture('AddCommentResponse.json').as('addCommentResponse');
  // cy.log(this.addCommentResponse);
  cy.route('POST', apiRoute.COMMENTS, '@addCommentResponse').as('addComment');
  cy.get('[test-id="add-comment-field"]').type(commentText);
  cy.get('[test-id="add-comment-button"]').click();
  cy.wait('@addComment').its('request').then((request) => {
    expect(request.headers.authorization).to.deep.equal('Token thisIsTheKey');
    expect(request.body.comment.body).to.deep.equal(commentText);
  });
});

when('I click on the profile image of a commentor', () => {
  cy.route(apiRoute.USERPROFILE, 'fixture:UserProfile.json').as('userProfile');
  cy.get('[test-id="comment-profile-image"]').click();
  cy.wait('@userProfile').its('request').then((request) => {
    console.log(request);
    expect(request.url).to.eq(`https://conduit.productionready.io/api/articles/${articleResponse.article.slug}/comments`);
  });
});

when('I delete one of my own comments', () => {
  cy.route('DELETE', apiRoute.DELETECOMMENT, 200).as('deleteComment');
  cy.get('[test-id="delete-button"]').click();
  cy.wait('@deleteComment').its('url').should('contain', '/comments/793');
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

  then('the new comment is added to the top of the comment list', () => {
    cy.get('[test-id="comment"]').last().within(() => {
      cy.get('[test-id="comment-author"]').should('contain', addCommentResponse.comment.author.username);
      cy.get('[test-id="comment-author-image"]').should('have.attr', 'src', addCommentResponse.comment.author.image);
      cy.get('[test-id="comment-body"]').should('contain', addCommentResponse.comment.body);
    });
  });

  then('I no longer see the comment I deleted', () => {
    cy.get('[test-id="comment"]').first().within(() => {
      cy.get('[test-id="comment-body"]').should('not.contain', commentsResponse.comments[0].body);
    });
  });

  then('I do not see the delete icon for other users comments', () => {
    cy.get('[test-id="comment"]').eq(1).within(() => {
      cy.get('[test-id="delete-button"]').should('not.exist');
    });
  });
});
