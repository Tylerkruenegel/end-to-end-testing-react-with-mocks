Feature: Profile

   Returning users need to be able to view their profile and make changes.

  Scenario: As a user, I should be able to see a list of articles I have written on my profile
    Given I am an existing user entering my profile
    Then I see articles I have written