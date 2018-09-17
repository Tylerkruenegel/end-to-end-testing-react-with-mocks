Feature: User can view an article

   Users need to be able to view articles that they want to read

   Scenario: As a user, I want to be able to view an article
    Given I am a user viewing an article
    Then I see the article
    And I see a list of comments
