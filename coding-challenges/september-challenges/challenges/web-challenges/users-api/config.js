// Global vars
const environments = {};

// Staging env
environments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging',
    'hashingSecret': 'ths'
}

// Prod env
environments.prod = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'prod',
    'hashingSecret': 'ths'
}

// Decide which env to be exported
const currentEnv = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check if the current env is a valid one. If not, default it to 'staging'
const envToExport = typeof (environments[currentEnv]) === 'object' ? environments[currentEnv] : environments.staging;

// Export module object
module.exports = envToExport;