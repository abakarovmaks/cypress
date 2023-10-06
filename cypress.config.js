const { defineConfig } = require('cypress');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const {
  preprocessor,
} = require('@badeball/cypress-cucumber-preprocessor/browserify');

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);
  on('file:preprocessor', preprocessor(config));
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
