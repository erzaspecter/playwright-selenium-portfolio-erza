Feature: JSON Path and Validation

  Background:
    * url 'https://jsonplaceholder.typicode.com'

  Scenario: Extract and validate user data
    Given path '/users/2'
    When method GET
    Then status 200
    # JSONPlaceholder TIDAK pakai .data, jadi langsung panggil field-nya
    * def userId = response.id
    * def email = response.email
    
    # Validasi
    And match userId == 2
    # Di JSONPlaceholder, email user 2 adalah 'Shanna@melissa.tv'
    And match email contains 'melissa.tv'
    
    * print 'User ID:', userId
    * print 'Email:', email

  Scenario: Validate list of users
    Given path '/users'
    And param id = 7
    When method GET
    Then status 200
    # Karena ini filter, responnya adalah ARRAY. Ambil indeks [0]
    And match response[0].id == 7
    And match response[0].username == 'Elwyn.Skiles'