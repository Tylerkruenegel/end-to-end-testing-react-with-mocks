Feature: User can view an article

   Users need to be able to view articles that they want to read

   Scenario: As a user, I want to be able to view an article
    Given I am a user viewing an article
    Then I see the article
    And I see a list of comments

  Scenario: As a user, I want to be able to leave a comment on an article
    Given I am a user viewing an article
    When I add a comment
    Then the new comment is added to the top of the comment list

  Scenario: As a user, I want to be able to delete my own comment
    Given I am a user viewing an article
    When I delete one of my own comments
    Then I no longer see the comment I deleted

  Scenario: As a user, I should not be able to delete others comments
    Given I am a user viewing an article
    Then I do not see the delete icon for other users comments
