const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  projectId: '2smzvm',
  allowCypressEnv: false,
  e2e: {
    //baseUrl: 'https://www.saucedemo.com',
    experimentalStudio: true, // Tambahkan baris ini
    setupNodeEvents(on, config) {},
  },
});