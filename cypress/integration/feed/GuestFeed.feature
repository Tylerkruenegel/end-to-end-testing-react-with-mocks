Feature: Feature name

   Feature Description

   Scenario: As a guest user, I want to see a home page that looks amazing
    Given I am a guest user entering the homepage
    Then I see a list of 10 articles with correct fields
    And I see a list of popular tags

  Scenario: As a guest user, when I select a popular tag I expect to see articles for that tag
    Given I am a guest user entering the homepage
    When I select a popular tag
    Then a request is made to the articles api with the correct filter
    And the feed toggle should have a tab for the tag active


  