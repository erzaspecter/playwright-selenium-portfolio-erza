Feature: Bearer Token Authentication

  Background:
    * url 'https://dummyjson.com'

  Scenario: Login and get profile
    Given path '/auth/login'
    And request { username: "kminchelle", password: "0lelplR" }
    When method POST
    Then status 200
    * def token = response.accessToken
    * configure headers = { Authorization: 'Bearer ' + token }

    Given path '/auth/me'
    When method GET
    Then status 200
    And match response.username == 'kminchelle'
