Feature: Data Driven Testing

  Background:
    * url 'https://jsonplaceholder.typicode.com'

  Scenario Outline: Create multiple users with different data
    Given path '/posts'
    # Ambil data dari tabel Examples di bawah
    And request { title: '<input_title>', body: '<input_body>', userId: <id_user> }
    When method POST
    Then status 201
    And match response.title == '<input_title>'

    # Di sini tempat naruh datanya
    Examples:
      | input_title | input_body      | id_user |
      | Belajar QA  | Karate itu seru | 1       |
      | Senior QA   | Main automation | 2       |
      | Jublia Test | Data driven OK  | 3       |

      


  Scenario Outline: Create user from external file
  Given path '/api/users'
  And request { name: '#(name)', job: '#(job)' }
  When method POST
  Then status 201

  # Baca file JSON eksternal
  Examples:
    | read('users_data.json') |