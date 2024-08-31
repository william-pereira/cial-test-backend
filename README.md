# Backend Automation Project with Cypress
This project uses Cypress with the cypress-plugin-api to automate backend API tests. The project structure is organized to keep the code clean, reusable, and easy to maintain.

## Requirements

- Node.js (version 20 or higher)
- NPM (version 10 or higher)
- Docker (version 24 or higher)

## Installation
Clone the repository:
~~~bash
git clone git@github.com:william-pereira/cial-test-backend.git
~~~
Navigate to the project directory:

~~~bash
cd cial-test-backend
~~~

Install the project dependencies:

~~~bash
npm install
~~~

## Folder Structure
#### Fixtures

- Query Params: All query parameters used in the requests are stored in fixtures/api/queryParams. Here, you will find JSON files that define different combinations of query parameters for the tests.
- Request Bodies: All request bodies are stored in fixtures/api/requestBodies. These JSON files contain the data sent for POST, PUT, PATCH, etc., requests.

#### DeviceService

- This folder contains tests organized by HTTP method. Each file is responsible for a type of operation (e.g., GET, POST, PATCH, PUT, DELETE) and validates the API responses as needed.
- Each test includes contract tests and business tests if necessary.

#### cypress.config.js

- This file sets the base URL of the API. It is also referenced in all test files by simply adding the endpoint according to the method type and developed test.

## Plugins

### Cypress Plugin API
- This plugin makes it easier to view request responses without the need to open inspect or check logs. With it, we can view an interface that displays responses, headers, queries, etc. It is very similar to the POSTMAN interface, for example.

#### Running the Tests

To run the API tests, use the command:

~~~bash
npx cypress open
~~~

Or to run in headless mode:

~~~bash
npx cypress run
~~~

The tests will be visible on the Cypress dashboard and can be run individually or together.

## Additional Notes

- Best Practices: Each test is independent and can be run in isolation. This facilitates the maintenance and scalability of the project.
- Structure Definition: There is also the possibility of using Cucumber, but this project was defined not to have complexity beyond the necessary. Therefore, Cucumber + BDD was not used here.
- By default, the IDs of the Restful API are reserved and cannot be altered with PATCH/PUT/DELETE methods. Therefore, to test these methods, it was necessary to create a new ID through POST and then use it for the other methods. PS: There are tests in this repository that validate the response of attempts to change reserved IDs, also ensuring alternative scenarios.

## Running Tests with Docker

#### Prerequisites Docker

- Make sure Docker is installed and running on your machine.

#### Step by Step

1. Clone the Project Repository

  ~~~bash
  git clone https://github.com/william-pereira/cial-test-backend.git
  ~~~

Access the Repository

 ~~~bash
 cd cial-test-backend
 ~~~

2. Build the Docker Image

  ~~~bash
  docker build -t cial-test:1.0.0 .
  ~~~

3. Run the Tests in the Container

Depending on your operating system, use the appropriate command to mount the current directory as a volume in the container:

- For Linux 

~~~bash
docker run -i -v "$PWD:/cial-test-backend" -t cial-test-backend:1.0.0 --spec "/cial-test/cypress/e2e/DeviceService/*.js"
~~~

- For Windows

~~~bash
docker run -i -v "${PWD}:/cial-test-backend" -t cial-test:1.0.0 --spec "cypress/e2e/DeviceService/*.js"
~~~

- For Mac

~~~bash
docker run -i -v `$(PWD)`:/cial-test-backend -t cial-test:1.0.0 --spec 'cypress/e2e/DeviceService/*.js'
~~~
