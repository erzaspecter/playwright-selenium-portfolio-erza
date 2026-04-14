Feature: JSON Path and Validation

  Background:
    * url 'https://reqres.in/api'

  Scenario: Extract and validate user data
    Given path '/users/2'
    When method GET
    Then status 200
    * def userId = response.data.id
    * def email = response.data.email
    And match userId == 2
    And match email contains 'reqres.in'
    * print 'User ID:', userId
    * print 'Email:', email

  Scenario: Validate list of users
    Given path '/users?page=2'
    When method GET
    Then status 200
    And match response.page == 2
    And match response.data[0].id == 7