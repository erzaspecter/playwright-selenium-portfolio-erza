Feature: E2E User Flow

  Background:
    * url 'https://reqres.in/api'

  Scenario: Complete user lifecycle
    # Create
    Given path '/users'
    And request { name: "E2E User", job: "Tester" }
    When method POST
    Then status 201
    * def userId = response.id

    # Get
    Given path '/users/' + userId
    When method GET
    Then status 200

    # Update
    Given path '/users/' + userId
    And request { name: "Updated User", job: "Senior Tester" }
    When method PUT
    Then status 200

    # Delete
    Given path '/users/' + userId
    When method DELETE
    Then status 204
