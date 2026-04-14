Feature: Basic GET Request

  Background:
    * url baseUrl

  Scenario: Get all posts
    Given path '/posts'
    When method GET
    Then status 200
    # Hapus tanda kurung ()
    And assert response.length > 0

  Scenario: Get single post
    Given path '/posts/1'
    When method GET
    Then status 200
    And match response.id == 1
