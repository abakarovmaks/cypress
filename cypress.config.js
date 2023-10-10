const { defineConfig } = require('cypress');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const {
  preprocessor,
} = require('@badeball/cypress-cucumber-preprocessor/browserify');
const sqlServer = require('cypress-sql-server');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

async function setupNodeEvents(on, config) {
  config.db = {
    userName: '',
    password: '',
    server: '',
    options: {
      database: '',
      encrypt: true,
      rowCollectionOnRequestCompletion: true,
    },
  };

  // Cucumber
  await addCucumberPreprocessorPlugin(on, config);
  on('file:preprocessor', preprocessor(config));
  // SQL
  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);

  on('task', {
    excelToJsonConverter(filePath) {
      const result = excelToJson({
        source: fs.readFileSync(filePath),
      });
      return result;
    },
  });

  // Return config is NECCESARILY
  return config;
}

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  env: {
    url: 'https://rahulshettyacademy.com',
  },
  retries: {
    runMode: 1,
  },
  e2e: {
    setupNodeEvents,
    // specPattern: ['cypress/integration/**/*.{js,jsx,ts,tsx,feature}'],
    // specPattern: 'cypress/integration/examples/BDD/*.feature',
    specPattern: 'cypress/integration/examples/*.js',
  },
});
