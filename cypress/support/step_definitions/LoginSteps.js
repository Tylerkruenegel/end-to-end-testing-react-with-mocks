/* global given, when, then, */

import * as appRoute from '../../constants/ApplicationRoutes';
import * as apiRoute from '../../constants/ServerRoutes';

given('I am a guest user on the login page', () => {
  cy.server();
  cy.visit(appRoute.LOGIN_PAGE);
});

const completeForm = (email, password) => {
  cy.get('[test-id="login-form"]').within(() => {
    cy.get('[test-id="email"]').type(email);
    cy.get('[test-id="password"]').type(password);
    cy.get('[test-id="submit-button"]').click();
  });
};

when('I submit a valid username and password', () => {
  const validEmail = 'test@test.com';
  const password = 'Password';
  cy.route('POST', apiRoute.LOGIN, 'fixture:LoginResponse.json').as('loginRequest');
  completeForm(validEmail, password);
  cy.wait('@loginRequest').its('requestBody').then((requestBody) => {
    expect(requestBody.user.email).to.eq(validEmail);
    expect(requestBody.user.password).to.eq(password);
  });
});

when('I submit an incorrect email and password', () => {
  const invalidEmail = 'fake@test.com';
  const password = 'Password';
  cy.route({
    method: 'POST',
    url: apiRoute.LOGIN,
    response: 'fixture:InvalidEmailOrPassword.json',
    status: 422,
  });
  completeForm(invalidEmail, password);
});

when('I submit an invalid email', () => {
  const invalidEmail = 'wrong';
  completeForm(invalidEmail);
});

then('I am successfully logged in', () => {
  const username = 'Tkru';
  cy.url().should('be.eq', `${Cypress.config('baseUrl')}/`);
  cy.get('[test-id="profile-button"]').should('contain', username);
});

then('I am told the password or email is invalid', () => {
  const errorMessage = 'email or password is invalid';
  cy.get('[test-id="error-messages"]').should('contain', errorMessage);
});
