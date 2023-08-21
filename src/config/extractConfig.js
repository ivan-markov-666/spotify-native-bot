/**
 * @fileoverview            Extracts the config from the config.js file and writes it to a config.json file.
 */

// Imports the config from the config.js file.
const { config } = require('./config.js');
// Imports the fs and path modules.
const fs = require('fs');
// Imports the path module.
const path = require('path');
// Writes the config to a config.json file.
const outputPath = path.join(__dirname, 'config.json');
// Writes the config to a config.json file.
fs.writeFileSync(outputPath, JSON.stringify(config));
