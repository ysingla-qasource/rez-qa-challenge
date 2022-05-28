## Pre-requitesites
1. Use Cypress.io at the latest version
2. Node.js 12 or 14 and above

## Run Cypress test from command line
This step is to verify you can run Cypress test from command line.

1. Open Terminal (or Command Prompt) window
2. To run all test cases in one go use below command
    - npx cypress run
3. To execute specific test case use the following commands
    - npx cypress run --spec "cypress/integration/challenge/savePropertyAsFavourite.spec.js"
    - npx cypress run --spec "cypress/integration/challenge/filterProperty.spec.js"

## Run Cypress test from browser
1. To run the test cases from browser use following command to open the Cypress
    - npx cypress open
    - You should see Cypress is launched, navigate to challenge folder and select desried test case to run
