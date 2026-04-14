Feature: POST Request

  Background:
    * url baseUrl

  Scenario: Create new post
    Given path '/posts'
    And request { title: "Karate Test", body: "Test body", userId: 1 }
    When method POST
    Then status 201
    And match response.title == "Karate Test"
