Feature: Personalized Feed

   Returning users want a feed of articles that they have saved

  Scenario: As a returning user, I want to see a feed or articles that I saved
    Given I am an existing user entering the homepage
    Then I see a list of my feed articles

  Scenario: As a returning user, I want to be able to view the global feed
    Given I am an existing user entering the homepage
    When I select the global feed
    Then I see a list of 10 articles with correct fields
