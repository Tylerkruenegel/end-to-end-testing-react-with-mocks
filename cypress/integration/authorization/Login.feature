Feature: Login

   As a user I want to be able to login into my account

   Scenario: As a user, I can log into an existing account
    Given I am a guest user on the login page
    When I submit a valid username and password
    Then I am successfully logged in
    
  Scenario: As a user, I want to be told when I've entered the wrong email or password
    Given I am a guest user on the login page
    When I submit an incorrect email and password
    Then I am told the password or email is invalid