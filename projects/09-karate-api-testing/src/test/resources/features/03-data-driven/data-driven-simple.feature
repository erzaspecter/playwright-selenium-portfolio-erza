Feature: Data Driven Testing

  Background:
    * url 'https://reqres.in/api'

  Scenario Outline: Get multiple users
    Given path '/users/' + userId
    When method GET
    Then status 200
    And match response.data.id == userId

    Examples:
      | userId |
      | 1      |
      | 2      |
      | 3      |
