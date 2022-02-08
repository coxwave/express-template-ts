const loadEnvConfig = require('dotenv').config;

module.exports = async () => {
  // Test Environment
  loadEnvConfig(process.cwd());
};
